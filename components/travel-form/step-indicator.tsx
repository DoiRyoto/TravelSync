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
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        {/* Progress bar background */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 z-0" />
        
        {/* Active progress bar */}
        <div 
          className="absolute top-5 left-0 h-0.5 bg-slate-900 z-0 transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const IconComponent = step.icon

          return (
            <div key={stepNumber} className="flex flex-col items-center relative z-10">
              {/* Circle indicator */}
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${isCompleted 
                    ? 'bg-slate-900 border-transparent text-white' 
                    : isCurrent 
                      ? 'bg-white border-slate-900 text-slate-900 shadow-lg' 
                      : 'bg-slate-100 border-slate-300 text-slate-400'
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <IconComponent className="w-5 h-5" />
                )}
              </div>

              {/* Step info */}
              <div className="mt-3 text-center max-w-[120px]">
                <div 
                  className={`
                    text-sm font-medium transition-colors duration-300
                    ${isCurrent 
                      ? 'text-slate-900' 
                      : isCompleted 
                        ? 'text-slate-600' 
                        : 'text-slate-400'
                    }
                  `}
                >
                  {step.title}
                </div>
                <div 
                  className={`
                    text-xs mt-1 transition-colors duration-300
                    ${isCurrent 
                      ? 'text-slate-700' 
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
  )
}