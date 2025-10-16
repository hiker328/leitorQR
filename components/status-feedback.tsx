"use client"

import { CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

type StatusFeedbackProps = {
  type: "success" | "error" | "warning"
  message: string
  onReset: () => void
}

export function StatusFeedback({ type, message, onReset }: StatusFeedbackProps) {
  const config = {
    success: {
      icon: CheckCircle2,
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      iconColor: "text-emerald-600",
      textColor: "text-emerald-900",
      iconBg: "bg-emerald-100",
    },
    error: {
      icon: AlertCircle,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-600",
      textColor: "text-red-900",
      iconBg: "bg-red-100",
    },
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      iconColor: "text-amber-600",
      textColor: "text-amber-900",
      iconBg: "bg-amber-100",
    },
  }

  const { icon: Icon, bgColor, borderColor, iconColor, textColor, iconBg } = config[type]

  return (
    <div className="space-y-6">
      <div className={`overflow-hidden rounded-2xl border ${borderColor} ${bgColor} shadow-sm`}>
        <div className="p-8">
          <div className="flex items-start gap-5">
            <div className={`rounded-full ${iconBg} p-3`}>
              <Icon className={`h-7 w-7 ${iconColor}`} />
            </div>
            <div className="flex-1">
              <p className={`text-balance text-xl font-semibold ${textColor}`}>{message}</p>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={onReset}
        className="w-full rounded-xl bg-neutral-900 py-7 text-base font-semibold shadow-sm transition-all hover:bg-neutral-800 hover:shadow-md active:scale-[0.99]"
      >
        Escanear Novo QR Code
      </Button>
    </div>
  )
}
