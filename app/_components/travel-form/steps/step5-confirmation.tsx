import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  CheckCircle, MapPin, Calendar, Clock, Users, Star, TrendingUp, Target, Heart, DollarSign, BookOpen, Sparkles, Loader2,
  User, UserPlus, Briefcase, GraduationCap, Zap, Trophy, Crown, Sprout, TreePine, Trees,
  Camera, Palette, Waves, Mountain, ChefHat, ShoppingBag,
  ScrollText, Leaf, UtensilsCrossed, Paintbrush, Building, Church, PartyPopper, ShoppingCart,
  Coins, CreditCard, Gem, Library, Flower, Sun, Snowflake, CalendarDays
} from "lucide-react"
import { allCountries } from "@/lib/countries"
import { SEASONS, DURATION_OPTIONS, TRAVELER_TYPES, AGE_GROUPS, EXPERIENCE_LEVELS, TRAVEL_PURPOSES, INTERESTS, BUDGET_LEVELS, CULTURAL_LEVELS } from "@/lib/travel-options"

const iconMap = {
  User, Heart, Users, UserPlus, Briefcase,
  GraduationCap, Star, Zap, Trophy, Crown,
  Sprout, TreePine, Trees,
  Camera, Palette, Waves, Mountain, ChefHat, ShoppingBag,
  ScrollText, Leaf, UtensilsCrossed, Paintbrush, Building, Church, PartyPopper, ShoppingCart,
  Coins, CreditCard, Gem, BookOpen, Library,
  Flower, Sun, Snowflake, CalendarDays
} as const

interface FormData {
  destination: string
  duration: number
  season: string
  travelerCount: number
  travelerType: string
  ageGroup: string
  experienceLevel: string
  purposes: string[]
  interests: string[]
  budgetLevel: string
  culturalLevel: string
  specialRequests?: string
}

interface Step5ConfirmationProps {
  formData: FormData
  loading: boolean
  onSubmit: () => void
}

export function Step5Confirmation({
  formData,
  loading,
  onSubmit
}: Step5ConfirmationProps) {
  const destination = allCountries.find(c => c.id === formData.destination)
  const season = SEASONS.find(s => s.value === formData.season)
  const duration = DURATION_OPTIONS.find(d => d.value === formData.duration)
  const travelerType = TRAVELER_TYPES.find(t => t.value === formData.travelerType)
  const ageGroup = AGE_GROUPS.find(a => a.value === formData.ageGroup)
  const experienceLevel = EXPERIENCE_LEVELS.find(e => e.value === formData.experienceLevel)
  const budgetLevel = BUDGET_LEVELS.find(b => b.value === formData.budgetLevel)
  const culturalLevel = CULTURAL_LEVELS.find(c => c.value === formData.culturalLevel)

  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-900">
          <CheckCircle className="h-5 w-5 text-slate-600" />
          プラン内容の確認
        </CardTitle>
        <CardDescription className="text-slate-600">
          入力内容を確認して、あなた専用の旅行プランを生成しましょう！
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 基本情報 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-900 flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            基本情報
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm text-green-900">目的地</span>
              </div>
              <div className="text-lg font-semibold">{destination?.name}</div>
              <div className="text-sm text-muted-foreground">{destination?.continent}</div>
            </div>
            
            <div className="p-3 bg-white rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm text-green-900">旅行時期</span>
              </div>
              <div className="text-lg font-semibold flex items-center gap-2">
                <span>{season?.icon}</span>
                <span>{season?.label}</span>
              </div>
            </div>
            
            <div className="p-3 bg-white rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm text-green-900">旅行期間</span>
              </div>
              <div className="text-lg font-semibold">{duration?.label}</div>
            </div>
            
            <div className="p-3 bg-white rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <Users className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm text-green-900">旅行タイプ</span>
              </div>
              <div className="text-lg font-semibold flex items-center gap-2">
                <span>{travelerType?.icon}</span>
                <span>{travelerType?.label}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 旅行者情報 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-900 flex items-center gap-2">
            <Users className="h-5 w-5" />
            旅行者情報
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm text-green-900">年齢層</span>
              </div>
              <div className="text-lg font-semibold flex items-center gap-2">
                <span>{ageGroup?.icon}</span>
                <span>{ageGroup?.label}</span>
              </div>
            </div>
            
            <div className="p-3 bg-white rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm text-green-900">旅行経験</span>
              </div>
              <div className="text-lg font-semibold flex items-center gap-2">
                <span>{experienceLevel?.icon}</span>
                <span>{experienceLevel?.label}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 旅行スタイル */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-green-900 flex items-center gap-2">
            <Target className="h-5 w-5" />
            旅行スタイル
          </h3>
          
          <div className="space-y-3">
            <div className="p-3 bg-white rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm text-green-900">旅行の目的</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.purposes.map(purpose => {
                  const purposeData = TRAVEL_PURPOSES.find(p => p.value === purpose)
                  return (
                    <Badge key={purpose} className="bg-green-100 text-green-800 hover:bg-green-200">
                      <span className="mr-1">{purposeData?.icon}</span>
                      {purposeData?.label}
                    </Badge>
                  )
                })}
              </div>
            </div>
            
            <div className="p-3 bg-white rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-green-600" />
                <span className="font-medium text-sm text-green-900">興味のあること</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.interests.map(interest => {
                  const interestData = INTERESTS.find(i => i.value === interest)
                  return (
                    <Badge key={interest} variant="secondary">
                      <span className="mr-1">{interestData?.icon}</span>
                      {interestData?.label}
                    </Badge>
                  )
                })}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-sm text-green-900">予算レベル</span>
                </div>
                <div className="text-lg font-semibold flex items-center gap-2">
                  <span>{budgetLevel?.icon}</span>
                  <span>{budgetLevel?.label}</span>
                </div>
                <div className="text-sm text-muted-foreground">{budgetLevel?.range}</div>
              </div>
              
              <div className="p-3 bg-white rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-sm text-green-900">文化情報</span>
                </div>
                <div className="text-lg font-semibold flex items-center gap-2">
                  <span>{culturalLevel?.icon}</span>
                  <span>{culturalLevel?.label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 特別な要望 */}
        {formData.specialRequests && (
          <>
            <Separator />
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-green-900">特別な要望・注意事項</h3>
              <div className="p-3 bg-white rounded-lg border border-green-200">
                <p className="text-sm">{formData.specialRequests}</p>
              </div>
            </div>
          </>
        )}

        <Separator />

        {/* 生成ボタン */}
          <Button
            onClick={onSubmit}
            disabled={loading}
            size="lg"
            className="w-full md:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 px-8 text-lg font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                プラン生成中...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                旅行プランを生成する
              </>
            )}
          </Button>
      </CardContent>
    </Card>
  )
}