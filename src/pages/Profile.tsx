import React, { useEffect, useState } from 'react'
import { User, Save } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface UserData {
    name: string
    lastname: string
    username: string
    dni: string
    email: string
    phone: string
    cvu: string
    alias: string
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null)
    const [alias, setAlias] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [errors, setErrors] = useState<string[]>([])
    const [success, setSuccess] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const getUserData = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/user/details`, { credentials: 'include' })
                const data = await res.json()

                if (!res.ok) {
                    const message = data.details
                    setErrors(Object.values(message))
                    setLoading(false)
                    return
                }

                setUser(data)
                setAlias(data.alias)
            } catch (err: any) {
                setErrors([err.message || 'Error al obtener datos del usuario'])
            } finally {
                setLoading(false)
            }
        }

        getUserData()
    }, [])

    const handleSave = async () => {
        setErrors([])
        setSuccess(null)
        if (!alias || alias.trim() === '') {
            setErrors(['El alias no puede estar vacío'])
            return
        }
        if (alias === user?.alias) {
            setErrors(['El alias es el mismo que ya tenes'])
            return
        }

        setSaving(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/user/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    newAlias: alias.trim()
                }),
            })

            
            const data = await res.json()

            if (!res.ok) {
                const message = data.details
                setErrors(Object.values(message))
                setSaving(false)
                return
            }

            setSuccess('Alias actualizado con éxito')
        } catch (err: any) {
            setErrors([err?.message || 'Error al actualizar alias'])
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">Cargando...</div>

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
            <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-gray-200 w-full max-w-2xl">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-[#39AAAA]/10 p-3 rounded-full">
                        <User size={28} className="text-[#39AAAA]" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Mi perfil</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600">Nombre</div>
                        <div className="font-medium text-gray-800">{user?.name} {user?.lastname}</div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600">Usuario</div>
                        <div className="font-medium text-gray-800">{user?.username}</div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600">DNI</div>
                        <div className="font-medium text-gray-800">{user?.dni}</div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="text-sm text-gray-600">Teléfono</div>
                        <div className="font-medium text-gray-800">{user?.phone}</div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 md:col-span-2">
                        <div className="text-sm text-gray-600">Email</div>
                        <div className="font-medium text-gray-800">{user?.email}</div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 md:col-span-2">
                        <div className="text-sm text-gray-600">CVU</div>
                        <div className="font-medium text-gray-800 truncate">{user?.cvu}</div>
                    </div>
                </div>

                <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Alias</label>
                    <div className="flex items-center gap-3">
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={alias}
                                    onChange={(e) => setAlias(e.target.value)}
                                    className="border border-gray-300 bg-white/90 p-3 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#39AAAA] transition"
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className={`p-3 rounded-lg ${saving ? 'bg-neutral-400' : 'bg-[#39AAAA]'} text-white font-semibold hover:bg-[#2d8c8c] transition`}
                            title="Guardar alias"
                        >
                            <Save size={18} />
                        </button>
                    </div>
                </div>

                {errors.length > 0 && (
                    <div className="mt-4 flex flex-col gap-2">
                        {errors.map((err, i) => (
                            <div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-md">
                                <span className="text-sm">{err}</span>
                            </div>
                        ))}
                    </div>
                )}

                {success && (
                    <div className="mt-4 text-green-600 font-medium">{success}</div>
                )}

                <div className="mt-6 flex justify-end">
                    <button onClick={() => navigate('/dashboard')} className="text-sm text-gray-600 hover:underline">Volver</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
