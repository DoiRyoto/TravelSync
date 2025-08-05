import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { 
  Users, Star, TrendingUp, User, Heart, UserPlus, Briefcase,
  GraduationCap, Zap, Trophy, Crown, Sprout, TreePine, Trees
} from "lucide-react"
import { useTravelerTypes, useAgeGroups, useExperienceLevels } from "@/hooks/use-travel-options"

const iconMap = {
  User, Heart, Users, UserPlus, Briefcase,
  GraduationCap, Star, Zap, Trophy, Crown,
  Sprout, TreePine, Trees
} as const

interface Step3TravelerInfoProps {
  travelerType: string
  ageGroup: string
  experienceLevel: string
  onTravelerTypeChange: (type: string) => void
  onAgeGroupChange: (group: string) => void
  onExperienceLevelChange: (level: string) => void
  travelerTypeError?: string
  ageGroupError?: string
  experienceLevelError?: string
}

export function Step3TravelerInfo({
  travelerType,
  ageGroup,
  experienceLevel,
  onTravelerTypeChange,
  onAgeGroupChange,
  onExperienceLevelChange,
  travelerTypeError,
  ageGroupError,
  experienceLevelError
}: Step3TravelerInfoProps) {
  const { travelerTypes, loading: travelerTypesLoading, error: travelerTypesError } = useTravelerTypes()
  const { ageGroups, loading: ageGroupsLoading, error: ageGroupsError } = useAgeGroups()
  const { experienceLevels, loading: experienceLevelsLoading, error: experienceLevelsError } = useExperienceLevels()

  // Show loading state
  if (travelerTypesLoading || ageGroupsLoading || experienceLevelsLoading) {
    return (
      <Card className="border border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Users className="h-5 w-5 text-slate-600" />
            旅行者情報
          </CardTitle>
          <CardDescription className="text-slate-600">
            あなたの旅行スタイルについて教えてください
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-700">旅行タイプ</Label>
            <div className="animate-pulse grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-slate-200 rounded-md"></div>
              ))}
            </div>
          </div>
          <p className="text-sm text-slate-500">旅行者オプションを読み込み中...</p>
        </CardContent>
      </Card>
    )
  }

  // Show error state
  if (travelerTypesError || ageGroupsError || experienceLevelsError) {
    return (
      <Card className="border border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <Users className="h-5 w-5 text-slate-600" />
            旅行者情報
          </CardTitle>
          <CardDescription className="text-slate-600">
            あなたの旅行スタイルについて教えてください
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">
              旅行者オプションの読み込みに失敗しました。ページを再読み込みしてください。
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
          <Users className="h-5 w-5 text-slate-600" />
          旅行者情報
        </CardTitle>
        <CardDescription className="text-slate-600">
          どのような旅行スタイルですか？
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 旅行タイプ */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700">旅行タイプ</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {travelerTypes.map((type) => {
              const IconComponent = iconMap[type.icon as keyof typeof iconMap]
              return (
                <Button
                  key={type.value}
                  variant={travelerType === type.value ? "default" : "outline"}
                  className={`h-auto p-4 flex flex-col items-center gap-2 text-center transition-all ${
                    travelerType === type.value
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground border-primary"
                      : "border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700"
                  }`}
                  onClick={() => onTravelerTypeChange(type.value)}
                >
                  <IconComponent className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium text-sm">{type.label}</div>
                    <div className="text-xs opacity-75 mt-1">{type.description}</div>
                  </div>
                </Button>
              )
            })}
          </div>
          {travelerTypeError && (
            <p className="text-sm text-red-500">{travelerTypeError}</p>
          )}
        </div>

        {/* 年齢層 */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700">年齢層</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {ageGroups.map((age) => {
              const IconComponent = iconMap[age.icon as keyof typeof iconMap]
              return (
                <Button
                  key={age.value}
                  variant={ageGroup === age.value ? "default" : "outline"}
                  className={`h-auto p-3 flex flex-col items-center gap-1 transition-all ${
                    ageGroup === age.value
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700"
                  }`}
                  onClick={() => onAgeGroupChange(age.value)}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-xs font-medium">{age.label}</span>
                </Button>
              )
            })}
          </div>
          {ageGroupError && (
            <p className="text-sm text-red-500">{ageGroupError}</p>
          )}
        </div>

        {/* 旅行経験 */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700">海外旅行経験</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {experienceLevels.map((level) => {
              const IconComponent = iconMap[level.icon as keyof typeof iconMap]
              return (
                <Button
                  key={level.value}
                  variant={experienceLevel === level.value ? "default" : "outline"}
                  className={`h-auto p-4 flex flex-col items-center gap-2 text-center transition-all ${
                    experienceLevel === level.value
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700"
                  }`}
                  onClick={() => onExperienceLevelChange(level.value)}
                >
                  <IconComponent className="h-6 w-6" />
                  <div>
                    <div className="font-medium text-sm">{level.label}</div>
                    <div className="text-xs opacity-75 mt-1">{level.description}</div>
                  </div>
                </Button>
              )
            })}
          </div>
          {experienceLevelError && (
            <p className="text-sm text-red-500">{experienceLevelError}</p>
          )}
        </div>

        {/* 選択内容の表示 */}
        {(travelerType || ageGroup || experienceLevel) && (
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <h4 className="font-medium text-slate-900 mb-3 text-sm">選択内容</h4>
            <div className="space-y-2 text-sm text-slate-700">
              {travelerType && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-500" />
                  <span className="text-xs">
                    旅行タイプ: {travelerTypes.find(t => t.value === travelerType)?.label}
                  </span>
                </div>
              )}
              {ageGroup && (
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-slate-500" />
                  <span className="text-xs">
                    年齢層: {ageGroups.find(a => a.value === ageGroup)?.label}
                  </span>
                </div>
              )}
              {experienceLevel && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-slate-500" />
                  <span className="text-xs">
                    経験レベル: {experienceLevels.find(e => e.value === experienceLevel)?.label}
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