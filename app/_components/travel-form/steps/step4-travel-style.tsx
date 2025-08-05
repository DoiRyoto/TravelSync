import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, Target, DollarSign, BookOpen, Plus, X,
  Camera, Palette, Waves, Mountain, ChefHat, ShoppingBag, Briefcase,
  ScrollText, Leaf, UtensilsCrossed, Paintbrush, Building, Church, PartyPopper, ShoppingCart,
  Coins, CreditCard, Gem, Library
} from "lucide-react"
import { TRAVEL_PURPOSES, INTERESTS, BUDGET_LEVELS, CULTURAL_LEVELS, type TravelPurpose, type Interest } from "@/lib/travel-options"

const purposeIconMap = {
  Camera, Palette, Waves, Mountain, ChefHat, ShoppingBag, Briefcase
} as const

const interestIconMap = {
  ScrollText, Leaf, UtensilsCrossed, Paintbrush, Building, Church, PartyPopper, ShoppingCart
} as const

const budgetIconMap = {
  Coins, CreditCard, Gem
} as const

const culturalIconMap = {
  BookOpen, Book: BookOpen, Library
} as const

interface Step4TravelStyleProps {
  purposes: string[]
  interests: string[]
  budgetLevel: string
  culturalLevel: string
  specialRequests: string
  onPurposeToggle: (purpose: TravelPurpose) => void
  onInterestToggle: (interest: Interest) => void
  onBudgetLevelChange: (level: string) => void
  onCulturalLevelChange: (level: string) => void
  onSpecialRequestsChange: (requests: string) => void
  purposesError?: string
  interestsError?: string
  budgetLevelError?: string
}

export function Step4TravelStyle({
  purposes,
  interests,
  budgetLevel,
  culturalLevel,
  specialRequests,
  onPurposeToggle,
  onInterestToggle,
  onBudgetLevelChange,
  onCulturalLevelChange,
  onSpecialRequestsChange,
  purposesError,
  interestsError,
  budgetLevelError
}: Step4TravelStyleProps) {
  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <Target className="h-5 w-5 text-slate-600" />
          旅行スタイル
        </CardTitle>
        <CardDescription className="text-slate-600">
          どのような旅行を楽しみたいですか？
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 旅行の目的 */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-slate-700">旅行の目的</Label>
            <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
              最大3つまで選択 ({purposes.length}/3)
            </Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {TRAVEL_PURPOSES.map((purpose) => {
              const isSelected = purposes.includes(purpose.value)
              const canSelect = purposes.length < 3 || isSelected
              const IconComponent = purposeIconMap[purpose.icon as keyof typeof purposeIconMap]
              
              return (
                <Button
                  key={purpose.value}
                  variant={isSelected ? "default" : "outline"}
                  disabled={!canSelect}
                  className={`h-auto p-4 flex flex-col items-center gap-2 text-center transition-all ${
                    isSelected
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : canSelect
                        ? "border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700"
                        : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => onPurposeToggle(purpose.value)}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5" />
                    {isSelected && <X className="h-3 w-3" />}
                    {!isSelected && canSelect && <Plus className="h-3 w-3" />}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{purpose.label}</div>
                    <div className="text-xs opacity-75 mt-1 line-clamp-2">{purpose.description}</div>
                  </div>
                </Button>
              )
            })}
          </div>
          {purposesError && (
            <p className="text-sm text-red-500">{purposesError}</p>
          )}
        </div>

        {/* 興味のあること */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-slate-700">興味のあること</Label>
            <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
              最大5つまで選択 ({interests.length}/5)
            </Badge>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {INTERESTS.map((interest) => {
              const isSelected = interests.includes(interest.value)
              const canSelect = interests.length < 5 || isSelected
              const IconComponent = interestIconMap[interest.icon as keyof typeof interestIconMap]
              
              return (
                <Button
                  key={interest.value}
                  variant={isSelected ? "default" : "outline"}
                  disabled={!canSelect}
                  className={`h-auto p-3 flex flex-col items-center gap-1 transition-all ${
                    isSelected
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : canSelect
                        ? "border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700"
                        : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => onInterestToggle(interest.value)}
                >
                  <div className="flex items-center gap-1">
                    <IconComponent className="h-4 w-4" />
                    {isSelected && <X className="h-3 w-3" />}
                  </div>
                  <span className="text-xs font-medium text-center">{interest.label}</span>
                </Button>
              )
            })}
          </div>
          {interestsError && (
            <p className="text-sm text-red-500">{interestsError}</p>
          )}
        </div>

        {/* 予算レベル */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700">予算レベル</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BUDGET_LEVELS.map((budget) => {
              const IconComponent = budgetIconMap[budget.icon as keyof typeof budgetIconMap]
              return (
                <Button
                  key={budget.value}
                  variant={budgetLevel === budget.value ? "default" : "outline"}
                  className={`h-auto p-4 flex flex-col items-center gap-2 text-center transition-all ${
                    budgetLevel === budget.value
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700"
                  }`}
                  onClick={() => onBudgetLevelChange(budget.value)}
                >
                  <IconComponent className="h-6 w-6" />
                  <div>
                    <div className="font-medium text-sm">{budget.label}</div>
                    <div className="text-xs opacity-75 mt-1">{budget.description}</div>
                    <div className="text-xs font-medium mt-1 text-slate-500">{budget.range}</div>
                  </div>
                </Button>
              )
            })}
          </div>
          {budgetLevelError && (
            <p className="text-sm text-red-500">{budgetLevelError}</p>
          )}
        </div>

        {/* 文化情報の詳しさ */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-slate-700">文化情報の詳しさ</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CULTURAL_LEVELS.map((level) => {
              const IconComponent = culturalIconMap[level.icon as keyof typeof culturalIconMap] || BookOpen
              return (
                <Button
                  key={level.value}
                  variant={culturalLevel === level.value ? "default" : "outline"}
                  className={`h-auto p-4 flex flex-col items-center gap-2 text-center transition-all ${
                    culturalLevel === level.value
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700"
                  }`}
                  onClick={() => onCulturalLevelChange(level.value)}
                >
                  <IconComponent className="h-5 w-5" />
                  <div>
                    <div className="font-medium text-sm">{level.label}</div>
                    <div className="text-xs opacity-75 mt-1">{level.description}</div>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>

        {/* 特別な要望 */}
        <div className="space-y-3">
          <Label htmlFor="special-requests" className="text-sm font-medium text-slate-700">
            特別な要望・注意事項（任意）
          </Label>
          <Textarea
            id="special-requests"
            placeholder="アレルギー、身体的制約、特別な希望などがあればお書きください..."
            value={specialRequests}
            onChange={(e) => onSpecialRequestsChange(e.target.value)}
            className="min-h-[80px] resize-none border-slate-200 focus:border-slate-400 text-sm"
          />
        </div>

        {/* 選択内容の表示 */}
        {(purposes.length > 0 || interests.length > 0 || budgetLevel) && (
          <div className="p-4 bg-orange-100 rounded-lg border border-orange-200">
            <h4 className="font-medium text-orange-900 mb-3">選択内容</h4>
            <div className="space-y-3 text-sm text-orange-800">
              {purposes.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4" />
                    <span className="font-medium">旅行の目的:</span>
                  </div>
                  <div className="flex flex-wrap gap-1 ml-6">
                    {purposes.map(purpose => {
                      const purposeData = TRAVEL_PURPOSES.find(p => p.value === purpose)
                      return (
                        <Badge key={purpose} variant="secondary" className="text-xs">
                          {purposeData?.icon} {purposeData?.label}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              )}
              
              {interests.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4" />
                    <span className="font-medium">興味のあること:</span>
                  </div>
                  <div className="flex flex-wrap gap-1 ml-6">
                    {interests.map(interest => {
                      const interestData = INTERESTS.find(i => i.value === interest)
                      return (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interestData?.icon} {interestData?.label}
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              )}
              
              {budgetLevel && (
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="font-medium">予算:</span>
                  <span>
                    {BUDGET_LEVELS.find(b => b.value === budgetLevel)?.label}
                    ({BUDGET_LEVELS.find(b => b.value === budgetLevel)?.range})
                  </span>
                </div>
              )}
              
              {culturalLevel && (
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span className="font-medium">文化情報:</span>
                  <span>
                    {CULTURAL_LEVELS.find(c => c.value === culturalLevel)?.label}
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