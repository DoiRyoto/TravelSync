// プラン関連の型定義
export interface TouristSpot {
  id: string
  name: string
  nameLocal: string
  culturalSignificance: string
  phrases?: any[]
  duration: number // 滞在時間（分）
  position: { lat: number, lng: number }
}

export interface Transportation {
  id: string
  from: string
  to: string
  method: 'walking' | 'taxi' | 'bus' | 'train' | 'car'
  duration: number // 移動時間（分）
  cost?: number
  details: string
}

export interface DayPlan {
  date: string
  spots: TouristSpot[]
  transportations: Transportation[]
  isOpen: boolean
}

export interface TravelPlan {
  destination: string
  days: DayPlan[]
}