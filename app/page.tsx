"use client"

import { useState } from "react"
import { QrScanner } from "@/components/qr-scanner"
import { ParticipantCard } from "@/components/participant-card"
import { StatusFeedback } from "@/components/status-feedback"
import { Package, Scan } from "lucide-react"

type Participant = {
  id: string
  nome_completo: string
  tamanho_camisa: string
  cidade: string
  nome_equipe: string
  entregue: boolean
}

type ScanResult = {
  participant: Participant
  wasDelivered: boolean
}

// Mock data - estruturado para futura conexão com Supabase
const mockParticipants: Participant[] = [
  {
    id: "1",
    nome_completo: "MARLON ANTONIO COSTA DE SOUZA",
    tamanho_camisa: "P",
    cidade: "Natal",
    nome_equipe: "MARLON ANTONIO COSTA DE SOUZA",
    entregue: false,
  },
  {
    id: "2",
    nome_completo: "JOÃO SILVA SANTOS",
    tamanho_camisa: "M",
    cidade: "Fortaleza",
    nome_equipe: "EQUIPE NORDESTE",
    entregue: true,
  },
  {
    id: "3",
    nome_completo: "MARIA OLIVEIRA COSTA",
    tamanho_camisa: "G",
    cidade: "Recife",
    nome_equipe: "RUNNERS PE",
    entregue: false,
  },
]

export default function Home() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleScan = async (data: string) => {
    try {
      setError(null)

      // Parse QR code JSON
      const qrData = JSON.parse(data)

      // Buscar participante no "banco de dados" (mock)
      // Futura implementação: const { data: participant } = await supabase.from('participantes').select('*').eq('nome_completo', qrData.nome).single()
      const participant = mockParticipants.find((p) => p.nome_completo === qrData.nome)

      if (!participant) {
        setError("Participante não encontrado no sistema")
        return
      }

      const wasDelivered = participant.entregue

      if (!wasDelivered) {
        // Atualizar status de entrega
        // Futura implementação: await supabase.from('participantes').update({ entregue: true }).eq('id', participant.id)
        participant.entregue = true
      }

      setScanResult({ participant, wasDelivered })
      setIsScanning(false)
    } catch (err) {
      setError("QR Code inválido. Tente novamente.")
      console.error("[v0] Error parsing QR code:", err)
    }
  }

  const handleReset = () => {
    setScanResult(null)
    setError(null)
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-md px-4 py-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-2xl bg-neutral-900 p-5 shadow-sm">
              <Package className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="mb-3 text-balance text-4xl font-bold tracking-tight text-neutral-900">Entrega de Kits</h1>
          <p className="text-pretty text-lg text-neutral-600">Escaneie o QR Code para registrar a entrega</p>
        </div>

        {/* Scanner or Result */}
        {!scanResult && !error && (
          <div className="space-y-6">
            {isScanning ? (
              <QrScanner onScan={handleScan} onClose={() => setIsScanning(false)} />
            ) : (
              <button
                onClick={() => setIsScanning(true)}
                className="group relative w-full overflow-hidden rounded-2xl bg-neutral-900 p-10 shadow-sm transition-all hover:shadow-md active:scale-[0.99]"
              >
                <div className="flex flex-col items-center gap-6">
                  <div className="rounded-full bg-white/10 p-5">
                    <Scan className="h-14 w-14 text-white" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-white">Escanear QR Code</div>
                    <div className="mt-2 text-base text-neutral-300">Toque para abrir a câmera</div>
                  </div>
                </div>
              </button>
            )}

            {/* Mock Data Info */}
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <p className="text-center text-sm font-medium text-neutral-900">Modo de teste: Dados mockados</p>
              <p className="mt-1 text-center text-sm text-neutral-600">Estrutura pronta para conexão com Supabase</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && <StatusFeedback type="error" message={error} onReset={handleReset} />}

        {/* Success/Already Delivered State */}
        {scanResult && (
          <div className="space-y-6">
            <StatusFeedback
              type={scanResult.wasDelivered ? "warning" : "success"}
              message={scanResult.wasDelivered ? "Kit já foi entregue anteriormente" : "Kit entregue com sucesso!"}
              onReset={handleReset}
            />
            <ParticipantCard participant={scanResult.participant} />
          </div>
        )}
      </div>
    </main>
  )
}
