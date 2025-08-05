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
  onSpotClick: (dayIndex: number, spotIndex: number) => void
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
          <CardHeader 
            className="cursor-pointer hover:bg-gray-50/50 focus:bg-gray-50/50 transition-colors min-h-[64px] focus:outline-none rounded-lg"
            role="button"
            tabIndex={0}
            aria-expanded={day.isOpen}
            aria-controls={`day-content-${dayIndex}`}
            aria-label={`${day.date}の予定を${day.isOpen ? '閉じる' : '開く'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" aria-hidden="true" />
                <CardTitle className="text-lg md:text-xl">
                  {day.date}
                </CardTitle>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {day.spots.length}箇所
                </span>
              </div>
              {day.isOpen ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent id={`day-content-${dayIndex}`}>
          <CardContent className="pt-0">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(event) => onDragEnd(event, dayIndex)}
            >
              <div className="relative">
                <SortableContext items={day.spots.map(spot => spot.id)} strategy={verticalListSortingStrategy}>
                  {day.spots.map((spot, spotIndex) => (
                    <div key={spot.id}>
                      <SortableSpot 
                        spot={spot} 
                        dayIndex={dayIndex} 
                        spotIndex={spotIndex} 
                        onSpotClick={onSpotClick} 
                      />
                      {spotIndex < day.spots.length - 1 && day.transportations[spotIndex] && (
                        <div className="relative pl-6 sm:pl-16 pb-4">
                          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-border" />
                          <div className="ml-2 sm:ml-4">
                            <TransportationCard 
                              transport={day.transportations[spotIndex]} 
                              isOpen={transportationOpenStates[day.transportations[spotIndex].id] || false}
                              onToggle={onToggleTransportation}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </SortableContext>
              </div>
            </DndContext>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}