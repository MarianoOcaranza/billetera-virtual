import React, { useState } from 'react'
import { ArrowUpRight, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ReceiptCard from '../components/Receipt'
import type { Receipt as ReceiptType } from '../components/Receipt'
import { useUserStore } from '../stores/userStore'

const formatCurrency = (value: number) => {
    if (isNaN(value) || value === 0) return '$0,00'
    return `$${value.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

const Transfer: React.FC = () => {
    const [alias, setAlias] = useState('')
    const [amount, setAmount] = useState<number>(0)
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState<string[]>([])
    const [success, setSuccess] = useState<string | null>(null)
    const [receipt, setReceipt] = useState<ReceiptType | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const user = useUserStore(state => state.user)

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value
        const cleaned = val.replace(/[^0-9.]/g, '')
        const num = parseFloat(cleaned)
        setAmount(isNaN(num) ? 0 : num)
    }

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        setErrors([])
        setSuccess(null)

        const errs: string[] = []
        if (!alias.trim()) errs.push('Por favor ingrese el alias o el CVU de la cuenta destino')
        if (!amount || amount <= 0) errs.push('Ingrese un monto mayor a 0')

        if (errs.length) {
            setErrors(errs)
            return
        }

        setLoading(true)
        try {
            const payload = { 
                accountDestination: alias.trim(), 
                amount: Number(amount), 
                description: description 
            }
            const res = await fetch(`${import.meta.env.VITE_API_URL}/payments/transfer`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload),
            })

            const data = await res.json()

            if (!res.ok) {
                let message = 'Error en la transferencia'
               
                message = data?.details?.error ?? data?.details?.message ?? data?.error ?? data?.message ?? JSON.stringify(data)
                  
                setErrors([String(message)])
                setLoading(false)
                return
            }

            // Try to build a receipt from backend response. If backend doesn't return the fields yet,
            // use sensible fallbacks (current user and submitted payload).
            const backend = data ?? {}

            const builtReceipt: ReceiptType = {
                operationNumber: backend.operationNumber ?? backend.operationId ?? `TX-${Date.now()}`,
                originCvu: backend.originCvu ?? user?.cvu ?? '---',
                originName: backend.originName ?? user?.name ?? '---',
                originLastname: backend.originLastname ?? user?.lastname ?? '---',
                destinationCvu: backend.destinationCvu ?? backend.accountDestination ?? alias.trim(),
                destinationName: backend.destinationName ?? backend.destinationFirstName ?? '---',
                destinationLastname: backend.destinationLastname ?? backend.destinationLastName ?? '---',
                amount: Number(backend.amount ?? amount),
                date: backend.date ?? new Date().toISOString(),
                description: backend.description ?? description ?? '',
            }

            setReceipt(builtReceipt)
            setSuccess(`Transferencia realizada a ${alias} por ${formatCurrency(amount)}`)
            setAlias('')
            setAmount(0)
            setDescription('')
        } catch (err: any) {
            setErrors([err?.message ?? 'Error inesperado al realizar la transferencia'])
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
            <div className="relative bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-10 w-full max-w-2xl hover:shadow-[#39AAAA]/30 hover:shadow-2xl transition-all">

                    {loading && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/30 rounded-2xl" />
                            <div className="relative z-30 flex flex-col items-center gap-4 bg-white/90 border border-gray-200 p-6 rounded-lg">
                                <div className="border-4 border-gray-200 border-t-[#39AAAA] rounded-full w-12 h-12 animate-spin" />
                                <div className="text-sm font-medium text-gray-700">Procesando transferencia...</div>
                            </div>
                        </div>
                    )}

                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-[#39AAAA]/10 p-3 rounded-full">
                        <ArrowUpRight size={24} className="text-[#39AAAA]" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Transferir dinero</h2>
                        <p className="text-sm text-gray-500">Envía dinero a otra cuenta por alias o por CVU</p>
                    </div>
                </div>

                <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-6">
                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Alias o CVU de cuenta destino</label>
                        <input
                            type="text"
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            disabled={loading}
                            placeholder="alias.ejemplo"
                            className="border border-gray-300 bg-white/90 p-3 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#39AAAA] transition"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Monto</label>
                        <div className="relative">
                            <input
                                inputMode="decimal"
                                type="text"
                                value={amount === 0 ? '$0' : `$${amount}`}
                                onChange={handleAmountChange}
                                disabled={loading}
                                placeholder="0"
                                className="appearance-none w-full text-6xl font-extrabold text-gray-800 text-center p-6 rounded-lg border border-gray-200 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#39AAAA] transition"
                            />
                            <div className="absolute right-4 bottom-4 text-gray-500 text-sm">{formatCurrency(amount)}</div>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">Ingresá el monto a transferir</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Descripción (opcional)</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Concepto, mensaje..."
                            disabled={loading}
                            className="border border-gray-300 bg-white/90 p-3 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#39AAAA] transition h-24"
                        />
                    </div>

                    {errors.length > 0 && (
                        <div className="flex flex-col gap-2">
                            {errors.map((err, i) => (
                                <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-md">
                                    <span className="text-sm">{err}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {success && (
                        <div className="text-green-600 text-center font-medium">{success}</div>
                    )}

                    {receipt && (
                        <ReceiptCard receipt={receipt} onClose={() => { setReceipt(null); navigate('/dashboard') }} />
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                            className={`w-full p-3 rounded-xl bg-white text-gray-700 border border-gray-200 transition ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:shadow-md'}`}
                            disabled={loading}
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            onClick={() => handleSubmit()}
                            className={`w-full flex items-center justify-center gap-2 p-3 rounded-xl text-white font-semibold shadow-md transition-transform duration-150 ${loading ? 'bg-neutral-400 opacity-80 cursor-not-allowed' : 'bg-[#39AAAA] hover:bg-[#2d8c8c] hover:scale-105'}`}
                            disabled={loading}
                        >   
                            <Send size={18} />
                            {loading ? 'Procesando...' : 'Enviar transferencia'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Transfer
