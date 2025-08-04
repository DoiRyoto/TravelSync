import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { 
  ChevronDown,
  ChevronUp
} from "lucide-react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { type DayPlan as DayPlanType } from './types'
import { SortableSpot } from './sortable-spot'
import { TransportationCard } from './transportation-card'

interface DayPlanProps {
  day: DayPlanType
  dayIndex: number
  transportationOpenStates: {[key: string]: boolean}
  onToggleDay: (dayIndex: number) => void
  onDragEnd: (event: DragEndEvent, dayIndex: number) => void
  onToggleTransportation: (transportId: string) => void
  onSpotClick: (dayIndex: number) => void
}

export function DayPlan({ 
  day, 
  dayIndex, 
  transportationOpenStates, 
  onToggleDay, 
  onDragEnd, 
  onToggleTransportation,
  onSpotClick 
}: DayPlanProps) {
  // ドラッグアンドドロップ用のセンサー
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <Card className="mb-6">
      <Collapsible open={day.isOpen} onOpenChange={() => onToggleDay(dayIndex)}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gray-50/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">
                  {day.date}
                </CardTitle>
              </div>
              {day.isOpen ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => onDragEnd(event, dayIndex)}
            >
              <SortableContext items={day.spots.map(spot => spot.id)} strategy={verticalListSortingStrategy}>
                {day.spots.map((spot, spotIndex) => (
                  <div key={spot.id}>
                    <SortableSpot spot={spot} dayIndex={spotIndex} onSpotClick={onSpotClick} />
                    {spotIndex < day.spots.length - 1 && day.transportations[spotIndex] && (
                      <TransportationCard 
                        transport={day.transportations[spotIndex]} 
                        isOpen={transportationOpenStates[day.transportations[spotIndex].id] || false}
                        onToggle={onToggleTransportation}
                      />
                    )}
                  </div>
                ))}
              </SortableContext>
            </DndContext>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}