import { User, Shirt, MapPin, Users } from "lucide-react"

type Participant = {
  id: string
  nome_completo: string
  tamanho_camisa: string
  cidade: string
  nome_equipe: string
  entregue: boolean
}

type ParticipantCardProps = {
  participant: Participant
}

export function ParticipantCard({ participant }: ParticipantCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-neutral-900 p-8">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-white/10 p-3">
            <User className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-balance text-xl font-semibold text-white">{participant.nome_completo}</h3>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 p-6">
        <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
          <div className="rounded-lg bg-neutral-900 p-2.5">
            <Shirt className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Tamanho da Camisa</p>
            <p className="mt-1 text-base font-semibold text-neutral-900">{participant.tamanho_camisa}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
          <div className="rounded-lg bg-neutral-900 p-2.5">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Cidade</p>
            <p className="mt-1 text-base font-semibold text-neutral-900">{participant.cidade}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
          <div className="rounded-lg bg-neutral-900 p-2.5">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">Equipe</p>
            <p className="mt-1 text-pretty text-base font-semibold text-neutral-900">{participant.nome_equipe}</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="pt-3">
          <div
            className={`rounded-xl border px-5 py-4 text-center ${
              participant.entregue
                ? "border-amber-200 bg-amber-50 text-amber-900"
                : "border-emerald-200 bg-emerald-50 text-emerald-900"
            }`}
          >
            <p className="text-base font-semibold">{participant.entregue ? "Kit Entregue" : "Entrega Registrada"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
