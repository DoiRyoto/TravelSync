// Travel planning options and types

export interface TravelPlan {
  destination: string
  duration: number
  season: string
  travelers: TravelerInfo
  style: TravelStyle
  interests: Interest[]
  culturalLevel: CulturalLevel
  budget: BudgetLevel
}

export interface TravelerInfo {
  count: number
  type: TravelerType
  ageGroup: AgeGroup
  experience: ExperienceLevel
}

export interface TravelStyle {
  purpose: TravelPurpose[]
  accommodation: AccommodationType[]
  pace: TravelPace
}

// Enums and option definitions
export type TravelerType = "solo" | "couple" | "family" | "friends" | "business"
export type AgeGroup = "teens" | "20s" | "30s" | "40s" | "50plus"
export type ExperienceLevel = "beginner" | "intermediate" | "advanced"
export type TravelPurpose = "sightseeing" | "relaxation" | "adventure" | "culture" | "business" | "culinary" | "shopping"
export type AccommodationType = "hotel" | "ryokan" | "guesthouse" | "resort" | "apartment"
export type TravelPace = "slow" | "moderate" | "fast"
export type Interest = "history" | "nature" | "food" | "shopping" | "art" | "religion" | "architecture" | "festivals"
export type CulturalLevel = "basic" | "standard" | "detailed"
export type BudgetLevel = "economy" | "standard" | "premium"

// Option configurations
export const TRAVELER_TYPES = [
  { value: "solo", label: "一人旅", icon: "User", description: "自分のペースで自由に" },
  { value: "couple", label: "カップル", icon: "Heart", description: "二人だけの特別な時間" },
  { value: "family", label: "家族旅行", icon: "Users", description: "家族みんなで楽しく" },
  { value: "friends", label: "友人グループ", icon: "UserPlus", description: "仲間と一緒に冒険" },
  { value: "business", label: "出張・ビジネス", icon: "Briefcase", description: "効率的な移動と滞在" }
] as const

export const AGE_GROUPS = [
  { value: "teens", label: "10代", icon: "GraduationCap" },
  { value: "20s", label: "20代", icon: "Star" },
  { value: "30s", label: "30代", icon: "Zap" },
  { value: "40s", label: "40代", icon: "Trophy" },
  { value: "50plus", label: "50代以上", icon: "Crown" }
] as const

export const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "初心者", icon: "Sprout", description: "海外旅行は初めて・少ない" },
  { value: "intermediate", label: "中級者", icon: "TreePine", description: "数回の海外旅行経験あり" },
  { value: "advanced", label: "上級者", icon: "Trees", description: "豊富な海外旅行経験" }
] as const

export const TRAVEL_PURPOSES = [
  { value: "sightseeing", label: "観光・名所巡り", icon: "Camera", description: "有名な観光地を巡りたい" },
  { value: "culture", label: "文化体験", icon: "Palette", description: "現地の文化を深く知りたい" },
  { value: "relaxation", label: "リラックス", icon: "Waves", description: "のんびり癒されたい" },
  { value: "adventure", label: "アドベンチャー", icon: "Mountain", description: "刺激的な体験をしたい" },
  { value: "culinary", label: "グルメ・食べ歩き", icon: "ChefHat", description: "現地の美味しい料理を味わいたい" },
  { value: "shopping", label: "ショッピング", icon: "ShoppingBag", description: "お買い物を楽しみたい" },
  { value: "business", label: "ビジネス", icon: "Briefcase", description: "出張・商用での訪問" }
] as const

export const INTERESTS = [
  { value: "history", label: "歴史", icon: "ScrollText" },
  { value: "nature", label: "自然", icon: "Leaf" },
  { value: "food", label: "グルメ", icon: "UtensilsCrossed" },
  { value: "art", label: "芸術", icon: "Paintbrush" },
  { value: "architecture", label: "建築", icon: "Building" },
  { value: "religion", label: "宗教・精神", icon: "Church" },
  { value: "festivals", label: "祭り・イベント", icon: "PartyPopper" },
  { value: "shopping", label: "ショッピング", icon: "ShoppingCart" }
] as const

export const BUDGET_LEVELS = [
  { value: "economy", label: "エコノミー", icon: "Coins", description: "コストを抑えて賢く旅行", range: "〜10万円" },
  { value: "standard", label: "スタンダード", icon: "CreditCard", description: "バランスの取れた旅行", range: "10-30万円" },
  { value: "premium", label: "プレミアム", icon: "Gem", description: "贅沢で特別な体験", range: "30万円〜" }
] as const

export const CULTURAL_LEVELS = [
  { value: "basic", label: "基本", icon: "BookOpen", description: "基本的なマナーと注意事項" },
  { value: "standard", label: "標準", icon: "Book", description: "文化的背景と詳しい情報" },
  { value: "detailed", label: "詳細", icon: "Library", description: "深い文化理解と専門的知識" }
] as const

export const DURATION_OPTIONS = [
  { value: 1, label: "日帰り" },
  { value: 2, label: "1泊2日" },
  { value: 3, label: "2泊3日" },
  { value: 4, label: "3泊4日" },
  { value: 5, label: "4泊5日" },
  { value: 7, label: "1週間" },
  { value: 10, label: "10日間" },
  { value: 14, label: "2週間" },
  { value: 21, label: "3週間" },
  { value: 30, label: "1ヶ月" }
] as const

export const SEASONS = [
  { value: "spring", label: "春（3-5月）", icon: "Flower", description: "桜や新緑が美しい季節" },
  { value: "summer", label: "夏（6-8月）", icon: "Sun", description: "暑い季節、海やフェスティバル" },
  { value: "autumn", label: "秋（9-11月）", icon: "Leaf", description: "紅葉や収穫の季節" },
  { value: "winter", label: "冬（12-2月）", icon: "Snowflake", description: "寒い季節、雪や温泉" },
  { value: "flexible", label: "時期は柔軟", icon: "CalendarDays", description: "特に決まっていない" }
] as const