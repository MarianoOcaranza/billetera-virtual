import React, { useState } from 'react'

export interface Receipt {
  operationNumber: string | number
  originCvu: string
  originName: string
  originLastname: string
  destinationCvu: string
  destinationName: string
  destinationLastname: string
  amount: number
  date: string
  description?: string
}

const prettyDate = (iso?: string) => {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleString('es-AR')
  } catch {
    return iso
  }
}

// Modal-style centered receipt. No download functionality (removed per request).
const ReceiptCard: React.FC<{ receipt: Receipt; onClose?: () => void }> = ({ receipt, onClose }) => {
  const [generating, setGenerating] = useState(false)

  const handlePdfDownload = async () => {
    try {
      setGenerating(true)
      // dynamic import so build won't fail if package isn't installed yet
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ unit: 'pt', format: 'a4' })

      const left = 40
      let y = 60

      doc.setFontSize(18)
      doc.text('Comprobante de pago', left, y)
      y += 28

      doc.setFontSize(11)

      const line = (label: string, value: string) => {
        doc.setFont('bold')
        doc.text(label, left, y)
        doc.setFont('normal')
        doc.text(value, left + 160, y)
        y += 18
      }

      line('Operación:', String(receipt.operationNumber))
      line('Fecha:', prettyDate(receipt.date))
      y += 6
      line('Origen:', `${receipt.originName} ${receipt.originLastname}`)
      line('CVU origen:', receipt.originCvu)
      y += 6
      line('Destino:', `${receipt.destinationName} ${receipt.destinationLastname}`)
      line('CVU destino:', receipt.destinationCvu)
      y += 6
      line('Monto:', new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 }).format(receipt.amount))
      y += 6

      doc.setFont('bold')
      doc.text('Descripción:', left, y)
      doc.setFont('normal')
      const descriptionLines = doc.splitTextToSize(receipt.description ?? '-', 500)
      doc.text(descriptionLines, left + 160, y)

      const filename = `comprobante_${receipt.operationNumber}.pdf`
      doc.save(filename)
    } catch (err) {
      // If jspdf not installed or error, fallback to JSON download via alert and console
      console.error('Error generando PDF', err)
      alert('No se pudo generar el PDF. Por favor instala la dependencia "jspdf" o revisa la consola.')
    } finally {
      setGenerating(false)
    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">Comprobante de pago</h3>
              <p className="text-sm text-gray-500 mt-1">Detalle de la operación</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePdfDownload}
                disabled={generating}
                className={`px-3 py-1 rounded-md text-sm ${generating ? 'bg-neutral-200 text-gray-500 cursor-not-allowed' : 'bg-[#39AAAA] text-white'}`}
              >
                {generating ? 'Generando PDF...' : 'Descargar PDF'}
              </button>
              {onClose && (
                <button onClick={onClose} className="px-3 py-1 bg-white border border-gray-200 rounded-md text-sm">Cerrar</button>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <div className="text-xs text-gray-500">Operación</div>
              <div className="font-medium">{receipt.operationNumber}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Fecha</div>
              <div className="font-medium">{prettyDate(receipt.date)}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Origen</div>
              <div className="font-medium">{receipt.originName} {receipt.originLastname}</div>
              <div className="text-xs text-gray-400">{receipt.originCvu}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Destino</div>
              <div className="font-medium">{receipt.destinationName} {receipt.destinationLastname}</div>
              <div className="text-xs text-gray-400">{receipt.destinationCvu}</div>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <div className="text-xs text-gray-500">Descripción</div>
              <div className="font-medium">{receipt.description ?? '-'}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Monto</div>
              <div className="font-medium text-xl">{new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 }).format(receipt.amount)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReceiptCard
