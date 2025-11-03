import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ReceiptCard from '../components/Receipt'
import type { Receipt as ReceiptType } from '../components/Receipt'

const TransactionDetails: React.FC = () => {
  const { transactionId } = useParams<{ transactionId: string }>()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [receipt, setReceipt] = useState<ReceiptType | null>(null)

  useEffect(() => {
    if (!transactionId) return
    const getDetails = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/payments/transactions/${transactionId}`, {
          credentials: 'include',
        })

        const text = await res.text()
        let data: any = null
        if (text) {
          try { data = JSON.parse(text) } catch { data = text }
        }

        if (!res.ok) {
          const message = data?.details?.error ?? data?.error ?? data?.message ?? String(data ?? res.statusText)
          setError(String(message))
          return
        }

        // Map backend response to ReceiptType (safe fallbacks)
        const backend = data ?? {}
        const built: ReceiptType = {
          operationNumber: backend.operationNumber ?? backend.transactionId ?? backend.operationId ?? transactionId,
          originCvu: backend.originCvu ?? backend.origin_cvu ?? '---',
          originName: backend.originName ?? backend.origin_name ?? '---',
          originLastname: backend.originLastname ?? backend.origin_lastname ?? '---',
          destinationCvu: backend.destinationCvu ?? backend.destination_cvu ?? '---',
          destinationName: backend.destinationName ?? backend.destination_name ?? '---',
          destinationLastname: backend.destinationLastname ?? backend.destination_lastname ?? '---',
          amount: Number(backend.amount ?? 0),
          date: backend.date ?? new Date().toISOString(),
          description: backend.description ?? ''
        }

        setReceipt(built)
      } catch (err: any) {
        setError(err?.message ?? 'Error al obtener detalle de la transacción')
      } finally {
        setLoading(false)
      }
    }

    getDetails()
  }, [transactionId])

  if (loading) return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">Cargando...</div>
  if (error) return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center text-red-600">{error}</div>

  return (
    <>
      {receipt && (
        <div className={"min-h-[calc(100vh-64px)] flex items-center justify-center p-4"}>
            <ReceiptCard receipt={receipt} onClose={() => navigate('/movimientos')} inline />
        </div>
      )}
    </>
  )
}

export default TransactionDetails
