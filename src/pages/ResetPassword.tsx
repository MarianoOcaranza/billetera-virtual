import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    if (!token) return setMessage('Token no proporcionado')
    if (!newPassword || newPassword.length < 6) return setMessage('La contraseña debe tener al menos 6 caracteres')
    if (newPassword !== confirm) return setMessage('Las contraseñas no coinciden')

    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      })

      const text = await res.text()
      let data: any = null
      if (text) {
        try { data = JSON.parse(text) } catch { data = text }
      }

      if (!res.ok) {
        setMessage(data?.message ?? String(data ?? res.statusText))
        return
      }

      setMessage('Contraseña restablecida correctamente. Redirigiendo al login...')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err: any) {
      setMessage(err?.message ?? 'Error al intentar restablecer la contraseña')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#f5f5f5]">
      <div className="bg-white/80 backdrop-blur-md shadow-2xl border border-gray-200 rounded-2xl p-8 w-11/12 sm:w-8/12 md:w-6/12 lg:w-1/3 transition-transform duration-300">
        <h2 className="font-bold text-2xl text-gray-800 mb-4">Restablecer contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Nueva contraseña</label>
            <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full p-3 border rounded-md mt-2" disabled={loading} />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Confirmar contraseña</label>
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} className="w-full p-3 border rounded-md mt-2" disabled={loading} />
          </div>

          {message && <div className="text-sm text-center text-gray-700">{message}</div>}

          <div>
            <button type="submit" disabled={loading} className="w-full p-3 bg-[#39AAAA] text-white rounded-lg font-semibold flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="animate-spin" size={18} /> Procesando...</> : 'Restablecer contraseña'}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default ResetPassword
