"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Terminal, ArrowRight, ArrowLeft, Globe, Calendar, Users, Target, Sparkles } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Step1Destination } from "./_components/travel-form/steps/step1-destination"
import { Step2BasicInfo } from "./_components/travel-form/steps/step2-basic-info"
import { Step3TravelerInfo } from "./_components/travel-form/steps/step3-traveler-info"
import { Step4TravelStyle } from "./_components/travel-form/steps/step4-travel-style"
import { Step5Confirmation } from "@/app/_components/travel-form/steps/step5-confirmation"
import { useCountries } from "@/hooks/use-countries"
import { type TravelPurpose, type Interest } from "@/hooks/use-travel-options"
import { StepIndicator } from "@/components/travel-form/step-indicator"

const travelFormSchema = z.object({
  destination: z.string().min(1, "目的地を選択してください"),
  duration: z.number().min(1, "期間を選択してください"),
  season: z.string().min(1, "旅行時期を選択してください"),
  travelerCount: z.number().min(1, "旅行者数を入力してください"),
  travelerType: z.string().min(1, "旅行タイプを選択してください"),
  ageGroup: z.string().min(1, "年齢層を選択してください"),
  experienceLevel: z.string().min(1, "旅行経験を選択してください"),
  purposes: z.array(z.string()).min(1, "旅行の目的を選択してください（最低1つ）").max(3, "旅行の目的は最大3つまでです"),
  interests: z.array(z.string()).min(1, "興味のあることを選択してください（最低1つ）").max(5, "興味は最大5つまでです"),
  budgetLevel: z.string().min(1, "予算レベルを選択してください"),
  culturalLevel: z.string().min(1, "文化情報の詳しさを選択してください"),
  specialRequests: z.string().optional()
})

type TravelFormData = z.infer<typeof travelFormSchema>

const FORM_STEPS = [
  { title: "目的地", description: "どこに行く？", icon: Globe },
  { title: "基本情報", description: "いつ・どのくらい？", icon: Calendar },
  { title: "旅行者情報", description: "誰と行く？", icon: Users },
  { title: "旅行スタイル", description: "何をしたい？", icon: Target },
  { title: "確認", description: "プラン生成", icon: Sparkles }
]

export default function HomePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [destinationInput, setDestinationInput] = useState("")
  const { countries } = useCountries()

  const {
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid }
  } = useForm<TravelFormData>({
    resolver: zodResolver(travelFormSchema),
    defaultValues: {
      destination: "",
      duration: 3,
      season: "",
      travelerCount: 2,
      travelerType: "",
      ageGroup: "",
      experienceLevel: "",
      purposes: [],
      interests: [],
      budgetLevel: "",
      culturalLevel: "standard",
      specialRequests: ""
    },
    mode: "onChange"
  })

  const formData = watch()

  const updateFormData = (updates: Partial<TravelFormData>) => {
    Object.entries(updates).forEach(([key, value]) => {
      setValue(key as keyof TravelFormData, value as any, { shouldValidate: true })
    })
  }

  const toggleArrayValue = <T extends string>(array: T[], value: T, max?: number): T[] => {
    if (array.includes(value)) {
      return array.filter(item => item !== value)
    } else {
      if (max && array.length >= max) {
        return [...array.slice(1), value]
      }
      return [...array, value]
    }
  }

  const handlePurposeToggle = (purpose: TravelPurpose) => {
    updateFormData({ purposes: toggleArrayValue(formData.purposes, purpose, 3) })
  }

  const handleInterestToggle = (interest: Interest) => {
    updateFormData({ interests: toggleArrayValue(formData.interests, interest, 5) })
  }

  const getFieldsForStep = (step: number): (keyof TravelFormData)[] => {
    switch (step) {
      case 1: return ['destination']
      case 2: return ['season', 'duration']
      case 3: return ['travelerType', 'ageGroup', 'experienceLevel']
      case 4: return ['purposes', 'interests', 'budgetLevel']
      default: return []
    }
  }

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep)
    const isStepValidated = await trigger(fieldsToValidate)
    
    if (currentStep < FORM_STEPS.length && isStepValidated) {
      setCurrentStep(prev => prev + 1)
      // ページの先頭にスクロール
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // バリデーションエラーがある場合は、エラーメッセージが表示される
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
      // ページの先頭にスクロール
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const onSubmit = async (data: TravelFormData) => {
    setLoading(true)

    try {
      router.push(`/plan/${data.destination}?` + new URLSearchParams({
        duration: data.duration.toString(),
        season: data.season,
        travelerType: data.travelerType,
        purposes: data.purposes.join(','),
        interests: data.interests.join(','),
        budget: data.budgetLevel,
        cultural: data.culturalLevel
      }).toString())
    } catch (err) {
      console.error("Error creating plan:", err)
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Destination
            destination={formData.destination}
            destinationInput={destinationInput}
            setDestinationInput={setDestinationInput}
            onDestinationSelect={(countryId) => {
              updateFormData({ destination: countryId })
              const country = countries.find(c => c.id === countryId)
              if (country) {
                setDestinationInput(country.name)
              }
            }}
            onDestinationChange={(destination) => updateFormData({ destination })}
            error={errors.destination?.message}
          />
        )

      case 2:
        return (
          <Step2BasicInfo
            season={formData.season}
            duration={formData.duration}
            onSeasonChange={(season: string) => updateFormData({ season })}
            onDurationChange={(duration: number) => updateFormData({ duration })}
            seasonError={errors.season?.message}
            durationError={errors.duration?.message}
          />
        )

      case 3:
        return (
          <Step3TravelerInfo
            travelerType={formData.travelerType}
            ageGroup={formData.ageGroup}
            experienceLevel={formData.experienceLevel}
            onTravelerTypeChange={(travelerType: string) => updateFormData({ travelerType })}
            onAgeGroupChange={(ageGroup: string) => updateFormData({ ageGroup })}
            onExperienceLevelChange={(experienceLevel: string) => updateFormData({ experienceLevel })}
            travelerTypeError={errors.travelerType?.message}
            ageGroupError={errors.ageGroup?.message}
            experienceLevelError={errors.experienceLevel?.message}
          />
        )

      case 4:
        return (
          <Step4TravelStyle
            purposes={formData.purposes}
            interests={formData.interests}
            budgetLevel={formData.budgetLevel}
            culturalLevel={formData.culturalLevel}
            specialRequests={formData.specialRequests || ""}
            onPurposeToggle={handlePurposeToggle}
            onInterestToggle={handleInterestToggle}
            onBudgetLevelChange={(budgetLevel: string) => updateFormData({ budgetLevel })}
            onCulturalLevelChange={(culturalLevel: string) => updateFormData({ culturalLevel })}
            onSpecialRequestsChange={(specialRequests: string) => updateFormData({ specialRequests })}
            purposesError={errors.purposes?.message}
            interestsError={errors.interests?.message}
            budgetLevelError={errors.budgetLevel?.message}
          />
        )

      case 5:
        return (
          <Step5Confirmation
            formData={formData}
            loading={loading}
            onSubmit={handleSubmit(onSubmit)}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />

      <main className="flex-1 container py-8 px-4 md:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            あなただけの体験旅行プラン
          </h2>
          <p className="text-lg text-muted-foreground">
            柔軟な旅行プランをサポートします
          </p>
        </div>

        <StepIndicator
          currentStep={currentStep}
          totalSteps={FORM_STEPS.length}
          steps={FORM_STEPS}
        />

        <div className="space-y-6">
          {renderStep()}

          {Object.keys(errors).length > 0 && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>入力エラー</AlertTitle>
              <AlertDescription>
                {Object.values(errors).map((error, index) => (
                  <div key={index}>{error?.message}</div>
                ))}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between pt-4">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                onClick={prevStep}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                前に戻る
              </Button>
            ) : (
              <div />
            )}

            {currentStep < FORM_STEPS.length && (
              <Button
                onClick={nextStep}
                className="flex items-center gap-2"
              >
                次に進む
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}