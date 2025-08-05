"use client"

import { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, MapPin, Clock } from "lucide-react"
import { TouristSpot } from "./types"

interface SpotSearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  countryId: string
  currentSpot: TouristSpot
  onSpotSelect: (spot: TouristSpot) => void
}

// モック観光地データ（実際の実装では API から取得）
const getMockSpots = (countryId: string): TouristSpot[] => {
  console.log('getMockSpots called with countryId:', countryId)
  
  const spotsByCountry: { [key: string]: TouristSpot[] } = {
    jp: [
      {
        id: "jp-001",
        name: "清水寺",
        nameLocal: "Kiyomizu-dera",
        culturalSignificance: "京都の代表的な寺院で、木造の本堂からの眺めは絶景です。",
        duration: 90,
        position: { lat: 34.9949, lng: 135.7851 }
      },
      {
        id: "jp-002", 
        name: "金閣寺",
        nameLocal: "Kinkaku-ji",
        culturalSignificance: "金箔で覆われた美しい寺院で、池に映る姿が有名です。",
        duration: 60,
        position: { lat: 35.0394, lng: 135.7292 }
      },
      {
        id: "jp-003",
        name: "伏見稲荷大社", 
        nameLocal: "Fushimi Inari Taisha",
        culturalSignificance: "千本鳥居で有名な神社で、山全体が神域となっています。",
        duration: 120,
        position: { lat: 34.9671, lng: 135.7727 }
      },
      {
        id: "jp-004",
        name: "二条城",
        nameLocal: "Nijo Castle", 
        culturalSignificance: "徳川家康の京都の居住地として建てられた城で、庭園も美しいです。",
        duration: 90,
        position: { lat: 35.0142, lng: 135.7481 }
      },
      {
        id: "jp-005",
        name: "嵐山竹林",
        nameLocal: "Arashiyama Bamboo Grove",
        culturalSignificance: "美しい竹林の小径で、光が差し込む風景は幻想的です。",
        duration: 45,
        position: { lat: 35.0170, lng: 135.6718 }
      },
      {
        id: "jp-006",
        name: "東寺",
        nameLocal: "To-ji Temple",
        culturalSignificance: "平安京建都時に創建された寺院で、五重塔は京都のシンボルです。",
        duration: 75,
        position: { lat: 34.9804, lng: 135.7474 }
      }
    ],
    fr: [
      {
        id: "fr-001",
        name: "エッフェル塔",
        nameLocal: "Tour Eiffel", 
        culturalSignificance: "パリのシンボルで、展望台からの眺めは絶景です。",
        duration: 120,
        position: { lat: 48.8584, lng: 2.2945 }
      },
      {
        id: "fr-002",
        name: "ルーヴル美術館", 
        nameLocal: "Musée du Louvre",
        culturalSignificance: "世界最大級の美術館で、モナリザなど名作が展示されています。",
        duration: 180,
        position: { lat: 48.8606, lng: 2.3376 }
      },
      {
        id: "fr-003",
        name: "ノートルダム大聖堂",
        nameLocal: "Cathédrale Notre-Dame",
        culturalSignificance: "ゴシック建築の傑作で、パリの歴史を象徴する建造物です。",
        duration: 90,
        position: { lat: 48.8530, lng: 2.3499 }
      }
    ],
    us: [
      {
        id: "us-001",
        name: "自由の女神",
        nameLocal: "Statue of Liberty",
        culturalSignificance: "アメリカの自由と民主主義の象徴で、ニューヨークのランドマークです。",
        duration: 180,
        position: { lat: 40.6892, lng: -74.0445 }
      },
      {
        id: "us-002",
        name: "タイムズスクエア",
        nameLocal: "Times Square",
        culturalSignificance: "世界の交差点と呼ばれる、ニューヨークの中心地です。",
        duration: 120,
        position: { lat: 40.7580, lng: -73.9855 }
      },
      {
        id: "us-003",
        name: "セントラルパーク",
        nameLocal: "Central Park",
        culturalSignificance: "マンハッタンの緑のオアシスで、映画にも多く登場します。",
        duration: 150,
        position: { lat: 40.7829, lng: -73.9654 }
      }
    ]
  }
  
  const result = spotsByCountry[countryId] || []
  console.log('getMockSpots result:', result.length, 'spots found for', countryId)
  console.log('Available countries:', Object.keys(spotsByCountry))
  
  return result
}

export function SpotSearchDialog({ 
  open, 
  onOpenChange, 
  countryId, 
  currentSpot,
  onSpotSelect 
}: SpotSearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  
  console.log('SpotSearchDialog currentSpot:', currentSpot)
  console.log('SpotSearchDialog countryId:', countryId)
  
  const allSpots = useMemo(() => {
    const spots = getMockSpots(countryId)
    console.log('SpotSearchDialog allSpots:', spots.length, 'spots for country:', countryId)
    return spots
  }, [countryId])
  
  // おすすめスポットを生成
  const recommendedSpots = useMemo(() => {
    // 現在のスポットを除外
    const otherSpots = allSpots.filter(spot => spot.id !== currentSpot.id)
    
    // 人気度でソート（滞在時間が長い = 人気とする）
    const popularSpots = [...otherSpots].sort((a, b) => b.duration - a.duration).slice(0, 3)
    
    return popularSpots
  }, [allSpots, currentSpot.id])
  

  const filteredSpots = useMemo(() => {
    if (!searchQuery.trim()) return allSpots
    
    const query = searchQuery.toLowerCase()
    return allSpots.filter(spot => 
      spot.name.toLowerCase().includes(query) ||
      spot.nameLocal.toLowerCase().includes(query) ||
      spot.culturalSignificance.toLowerCase().includes(query)
    )
  }, [allSpots, searchQuery])
  
  // 表示用のスポットリストを決定
  const displaySpots = useMemo(() => {
    if (searchQuery.trim()) {
      return filteredSpots
    }
    // 検索していない時は全スポットを表示（現在のスポットは最後に）
    const others = allSpots.filter(spot => spot.id !== currentSpot.id)
    const current = allSpots.find(spot => spot.id === currentSpot.id)
    return current ? [...others, current] : others
  }, [searchQuery, filteredSpots, allSpots, currentSpot.id])

  const handleSpotSelect = (spot: TouristSpot) => {
    onSpotSelect(spot)
    onOpenChange(false)
    setSearchQuery("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>観光地を変更</DialogTitle>
          <DialogDescription>
            現在選択中: {currentSpot.name} → 新しい観光地を選択してください
            <br />
            <span className="text-xs text-muted-foreground">
              デバッグ: 国ID={countryId}, 利用可能スポット数={allSpots.length}
            </span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="観光地名で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {/* おすすめスポット（検索していない時のみ表示） */}
              {!searchQuery.trim() && recommendedSpots.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-primary">
                    おすすめスポット
                  </div>
                  {recommendedSpots.map((spot) => (
                    <Card 
                      key={`rec-${spot.id}`}
                      className="cursor-pointer transition-all hover:shadow-md border-primary/20 bg-primary/5"
                      onClick={() => handleSpotSelect(spot)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <MapPin className="h-4 w-4 text-primary" />
                              <CardTitle className="text-lg">{spot.name}</CardTitle>
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                人気
                              </span>
                            </div>
                            <CardDescription className="text-sm font-medium text-primary/70">
                              {spot.nameLocal}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            {spot.duration}分
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {spot.culturalSignificance}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="border-t pt-3">
                    <div className="text-sm font-medium text-muted-foreground mb-3">
                      すべての観光地
                    </div>
                  </div>
                </div>
              )}

              {/* 検索結果または全スポット */}
              <div className="space-y-3">
                {searchQuery.trim() && (
                  <div className="text-sm font-medium text-primary">
                    検索結果 ({displaySpots.length}件)
                  </div>
                )}
                
                {allSpots.length === 0 && !searchQuery.trim() ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="text-muted-foreground">
                      この国（{countryId}）の観光地データがありません
                    </div>
                    <div className="text-xs text-muted-foreground">
                      利用可能な国: jp (日本), fr (フランス), us (アメリカ)
                    </div>
                  </div>
                ) : displaySpots.length === 0 && searchQuery.trim() ? (
                  <div className="text-center py-8 space-y-2">
                    <div className="text-muted-foreground">
                      検索結果が見つかりませんでした
                    </div>
                    <div className="text-xs text-muted-foreground">
                      別のキーワードで検索してみてください
                    </div>
                  </div>
                ) : (
                  displaySpots.map((spot) => (
                    <Card 
                      key={spot.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        spot.id === currentSpot.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleSpotSelect(spot)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
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
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {spot.culturalSignificance}
                        </p>
                        {spot.id === currentSpot.id && (
                          <div className="mt-2 text-xs text-primary font-medium">
                            現在選択中
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </ScrollArea>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              キャンセル
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}