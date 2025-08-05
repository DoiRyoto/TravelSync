import { Check } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: Array<{
    title: string
    description: string
    icon: React.ComponentType<{ className?: string }>
  }>
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="w-full py-8 px-4">
      {/* モバイル向けシンプル表示 */}
      <div className="block md:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">ステップ {currentStep} / {totalSteps}</span>
          <span className="text-sm font-medium text-primary">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="mt-3 text-center">
          <h3 className="font-semibold text-lg">{steps[currentStep - 1]?.title}</h3>
          <p className="text-sm text-muted-foreground">{steps[currentStep - 1]?.description}</p>
        </div>
      </div>

      {/* デスクトップ向け詳細表示 */}
      <div className="hidden md:block">
        <div className="flex items-start justify-between relative px-6">
          {/* Progress bar background */}
          <div className="absolute top-6 left-12 right-12 h-1 bg-slate-200 rounded-full z-0" />
          
          {/* Active progress bar */}
          <div 
            className="absolute top-6 left-12 h-1 bg-primary rounded-full z-0 transition-all duration-700 ease-out"
            style={{ 
              width: `calc(${((currentStep - 1) / (totalSteps - 1)) * 100}% - 0px)`,
              maxWidth: 'calc(100% - 6rem)'
            }}
          />

          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep
            const IconComponent = step.icon

            return (
              <div key={stepNumber} className="flex flex-col items-center relative z-10 min-w-0 flex-1">
                {/* Circle indicator */}
                <div 
                  className={`
                    w-12 h-12 rounded-full flex items-center justify-center border-3 transition-all duration-500 shadow-md
                    ${isCompleted 
                      ? 'bg-primary border-primary text-primary-foreground scale-105' 
                      : isCurrent 
                        ? 'bg-white border-primary text-primary shadow-lg scale-110 ring-4 ring-primary/20' 
                        : 'bg-slate-50 border-slate-300 text-slate-400 hover:border-slate-400'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 animate-in zoom-in duration-300" />
                  ) : (
                    <IconComponent className="w-6 h-6" />
                  )}
                </div>

                {/* Step info */}
                <div className="mt-4 text-center max-w-[140px] px-2">
                  <div 
                    className={`
                      text-sm font-semibold transition-all duration-300 mb-1
                      ${isCurrent 
                        ? 'text-primary scale-105' 
                        : isCompleted 
                          ? 'text-slate-700' 
                          : 'text-slate-500'
                      }
                    `}
                  >
                    {step.title}
                  </div>
                  <div 
                    className={`
                      text-xs leading-relaxed transition-all duration-300
                      ${isCurrent 
                        ? 'text-slate-600 font-medium' 
                        : isCompleted 
                          ? 'text-slate-500' 
                          : 'text-slate-400'
                      }
                    `}
                  >
                    {step.description}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}