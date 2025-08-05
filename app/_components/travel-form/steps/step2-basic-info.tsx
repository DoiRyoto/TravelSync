import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { 
  Calendar, Flower, Sun, Leaf, Snowflake, CalendarDays,
  Clock
} from "lucide-react"
import { useSeasons, useDurationOptions } from "@/hooks/use-travel-options"

const iconMap = {
  Flower, Sun, Leaf, Snowflake, CalendarDays
} as const

interface Step2BasicInfoProps {
  season: string
  duration: number
  onSeasonChange: (season: string) => void
  onDurationChange: (duration: number) => void
  seasonError?: string
  durationError?: string
}

export function Step2BasicInfo({
  season,
  duration,
  onSeasonChange,
  onDurationChange,
  seasonError,
  durationError
}: Step2BasicInfoProps) {
  const { seasons, loading: seasonsLoading, error: seasonsError } = useSeasons()
  const { durations, loading: durationsLoading, error: durationsError } = useDurationOptions()

  // Show loading state
  if (seasonsLoading || durationsLoading) {
    return (
      <Card className="border border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Calendar className="h-5 w-5 text-slate-600" />
            旅行の基本情報
          </CardTitle>
          <CardDescription className="text-slate-600">
            いつ、どのくらいの期間旅行されますか？
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-700">旅行時期</Label>
            <div className="animate-pulse">
              <div className="h-10 bg-slate-200 rounded-md"></div>
            </div>
          </div>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-700">旅行期間</Label>
            <div className="animate-pulse grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-12 bg-slate-200 rounded-md"></div>
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-500">旅行オプションを読み込み中...</p>
        </CardContent>
      </Card>
    )
  }

  // Show error state
  if (seasonsError || durationsError) {
    return (
      <Card className="border border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Calendar className="h-5 w-5 text-slate-600" />
            旅行の基本情報
          </CardTitle>
          <CardDescription className="text-slate-600">
            いつ、どのくらいの期間旅行されますか？
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">
              旅行オプションの読み込みに失敗しました。ページを再読み込みしてください。
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <Calendar className="h-5 w-5 text-slate-600" />
          旅行の基本情報
        </CardTitle>
        <CardDescription className="text-slate-600">
          いつ、どのくらいの期間旅行されますか？
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 旅行時期 */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700">旅行時期</Label>
          <Select value={season} onValueChange={onSeasonChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="旅行時期を選択してください" />
            </SelectTrigger>
            <SelectContent>
              {seasons.map((seasonOption) => {
                const IconComponent = iconMap[seasonOption.icon as keyof typeof iconMap]
                return (
                  <SelectItem key={seasonOption.value} value={seasonOption.value}>
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-slate-600" />
                      <div className="font-medium text-sm">{seasonOption.label}</div>
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          {seasonError && (
            <p className="text-sm text-red-500">{seasonError}</p>
          )}
        </div>

        {/* 旅行期間 */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700">旅行期間</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {durations.map((option) => (
              <Button
                key={option.value}
                variant={duration === option.value ? "default" : "outline"}
                className={`h-auto p-3 flex flex-col items-center gap-1 transition-all ${
                  duration === option.value 
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground" 
                    : "border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700"
                }`}
                onClick={() => onDurationChange(option.value)}
              >
                <span className="text-xs font-medium">{option.label}</span>
              </Button>
            ))}
          </div>
          {durationError && (
            <p className="text-sm text-red-500">{durationError}</p>
          )}
        </div>

        {/* 選択内容の表示 */}
        {(season || duration) && (
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-900 mb-3 text-sm">選択内容</h4>
            <div className="space-y-2 text-sm text-slate-700">
              {season && (
                <div className="flex items-center gap-2">
                  <span className="text-xs">
                    時期: {seasons.find(s => s.value === season)?.label}
                  </span>
                </div>
              )}
              {duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span className="text-xs">
                    期間: {durations.find(d => d.value === duration)?.label}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}