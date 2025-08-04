import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { 
  ChevronDown,
  ChevronUp,
  Navigation,
  Car,
  Train,
  Bus,
  Footprints
} from "lucide-react"
import { type Transportation } from './types'

interface TransportationCardProps {
  transport: Transportation
  isOpen: boolean
  onToggle: (transportId: string) => void
}

// 移動手段のアイコンを取得
const getTransportIcon = (method: Transportation['method']) => {
  switch (method) {
    case 'walking':
      return <Footprints className="h-4 w-4" />
    case 'taxi':
      return <Car className="h-4 w-4" />
    case 'bus':
      return <Bus className="h-4 w-4" />
    case 'train':
      return <Train className="h-4 w-4" />
    default:
      return <Navigation className="h-4 w-4" />
  }
}

export function TransportationCard({ transport, isOpen, onToggle }: TransportationCardProps) {
  return (
    <div className="my-3">
      <Collapsible open={isOpen} onOpenChange={() => onToggle(transport.id)}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-center w-full py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              {getTransportIcon(transport.method)}
              <span>{transport.duration}分</span>
              <span>•</span>
              <span>{transport.cost ? `¥${transport.cost}` : '無料'}</span>
              {isOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Card className="mt-2 border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">出発:</span>
                  <span>{transport.from}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">到着:</span>
                  <span>{transport.to}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">詳細:</span>
                  <span>{transport.details}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}