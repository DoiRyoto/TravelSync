import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  MapPin, 
  Clock, 
  GripVertical,
  Edit
} from "lucide-react"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { type TouristSpot } from './types'

interface SortableSpotProps {
  spot: TouristSpot
  dayIndex: number
  spotIndex: number
  onSpotClick: (dayIndex: number, spotIndex: number) => void
}

export function SortableSpot({ spot, dayIndex, spotIndex, onSpotClick }: SortableSpotProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: spot.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="relative pl-6 sm:pl-16 pb-6 group">
      {/* Timeline vertical line */}
      <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-border group-last:hidden" />
      
      {/* Timeline circle marker */}
      <div className="absolute left-2.5 sm:left-6.5 top-6 w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full border-2 sm:border-4 border-background shadow-sm" />
      
      <Card className="border-2 hover:border-primary/30 transition-all duration-200 ml-2 sm:ml-4">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div {...attributes} {...listeners} className="cursor-move text-gray-400 hover:text-gray-600">
              <GripVertical className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                <time className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full w-fit">
                  {spot.duration}分
                </time>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <CardTitle className="text-lg">{spot.name}</CardTitle>
                </div>
              </div>
              <CardDescription className="text-sm font-medium text-primary/70">
                {spot.nameLocal}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => onSpotClick(dayIndex, spotIndex)}>
              <Edit className="h-4 w-4 mr-1" />
              変更
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {spot.culturalSignificance}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}