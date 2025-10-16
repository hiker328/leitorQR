"use client"

import { useEffect, useRef, useState } from "react"
import { Html5Qrcode } from "html5-qrcode"
import { X, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

type QrScannerProps = {
  onScan: (data: string) => void
  onClose: () => void
}

export function QrScanner({ onScan, onClose }: QrScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader")
    scannerRef.current = scanner

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
    }

    scanner
      .start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          scanner.stop()
          onScan(decodedText)
        },
        () => {
          // Ignore scan errors (happens frequently during scanning)
        },
      )
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("[v0] Camera error:", err)
        setError("Não foi possível acessar a câmera")
        setIsLoading(false)
      })

    return () => {
      if (scanner.isScanning) {
        scanner.stop().catch(console.error)
      }
    }
  }, [onScan])

  const handleClose = () => {
    if (scannerRef.current?.isScanning) {
      scannerRef.current.stop().catch(console.error)
    }
    onClose()
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gray-900 shadow-2xl">
      {/* Close Button */}
      <div className="absolute right-4 top-4 z-10">
        <Button
          onClick={handleClose}
          size="icon"
          variant="secondary"
          className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Scanner Container */}
      <div className="relative aspect-square w-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="text-center">
              <Camera className="mx-auto mb-4 h-12 w-12 animate-pulse text-white" />
              <p className="text-sm text-white">Iniciando câmera...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 p-6">
            <div className="text-center">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          </div>
        )}

        <div id="qr-reader" className="w-full" />
      </div>

      {/* Instructions */}
      <div className="bg-gray-800 p-4 text-center">
        <p className="text-sm text-gray-300">Posicione o QR Code dentro da área marcada</p>
      </div>
    </div>
  )
}
