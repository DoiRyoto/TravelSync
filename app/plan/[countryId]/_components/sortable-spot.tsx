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
  onSpotClick: (dayIndex: number) => void
}

export function SortableSpot({ spot, dayIndex, onSpotClick }: SortableSpotProps) {
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
    <div ref={setNodeRef} style={style} className="mb-4">
      <Card className="border-2 hover:border-primary/30 transition-all duration-200">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div {...attributes} {...listeners} className="cursor-move text-gray-400 hover:text-gray-600">
              <GripVertical className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-primary" />
                <CardTitle className="text-lg">{spot.name}</CardTitle>
              </div>
              <CardDescription className="text-sm font-medium text-primary/70">
                {spot.nameLocal}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {spot.duration}分
            </div>
            <Button variant="outline" size="sm" onClick={() => onSpotClick(dayIndex)}>
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