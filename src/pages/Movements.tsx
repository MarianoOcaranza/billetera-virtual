import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Movement {
    DestinationName: string;
    DestinationLastname: string;
    OriginName: string;
    OriginLastname: string;
    date: string;
    type: string;
    amount: number;
}

interface PageMeta {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}

const Movements: React.FC = () => {
    const [movements, setMovements] = useState<Movement[]>([]);
    const [page, setPage] = useState(1); // UI is 1-based
    const [meta, setMeta] = useState<PageMeta | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const size = 10;

    useEffect(() => {
        const getTransactions = async () => {
            setLoading(true);
            setError(null);
            try {
                // backend expects 0-based page
                const res = await fetch(`${import.meta.env.VITE_API_URL}/payments/transactions?page=${page - 1}&size=${size}`, {
                    credentials: 'include'
                });

                const ct = res.headers.get('content-type') || '';
                const data = ct.includes('application/json') ? await res.json() : await res.text();

                if (!res.ok) {
                    const message = data?.details?.error ?? data?.error ?? data?.message ?? String(data);
                    setError(String(message));
                    setMovements([]);
                    setMeta(null);
                    setLoading(false);
                    return;
                }

                // data is PageDto<TransactionDto>
                setMovements(data.content ?? []);
                setMeta({
                    page: data.page ?? 0,
                    size: data.size ?? size,
                    totalElements: data.totalElements ?? 0,
                    totalPages: data.totalPages ?? 1,
                    first: data.first ?? false,
                    last: data.last ?? false,
                });
            } catch (err: any) {
                setError(err?.message ?? 'Error al obtener movimientos');
                setMovements([]);
                setMeta(null);
            } finally {
                setLoading(false);
            }
        }

        getTransactions();
    }, [page]);

    const prev = () => {
        if (!meta) return;
        if (page <= 1) return;
        setPage((p) => p - 1);
    };

    const next = () => {
        if (!meta) return;
        if (page >= meta.totalPages) return;
        setPage((p) => p + 1);
    };

    return (
        <div className="min-h-[calc(100vh-64px)] px-4 py-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Últimos movimientos</h1>

                <div className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl p-4 shadow-sm">
                    {loading ? (
                        <div className="py-12 text-center text-gray-600">Cargando movimientos...</div>
                    ) : error ? (
                        <div className="py-6 text-center text-red-600">{error}</div>
                    ) : movements.length === 0 ? (
                        <div className="py-6 text-center text-gray-600">No hay movimientos para mostrar</div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {movements.map((m, i) => {
                                const isSent = m.type?.toLowerCase().includes('sent') || m.type?.toLowerCase().includes('transfer_sent');
                                const title = isSent ? 'Pago a' : 'Transferencia de';
                                const name = isSent ? `${m.DestinationName} ${m.DestinationLastname}` : `${m.OriginName} ${m.OriginLastname}`;
                                return (
                                    <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${isSent ? 'bg-red-100' : 'bg-green-100'}`}>
                                                {isSent ? <ArrowUpRight size={18} className="text-red-500" /> : <ArrowDownRight size={18} className="text-green-500" />}
                                            </div>
                                            <div className="text-sm">
                                                <div className="font-medium">{title}</div>
                                                <div className="text-gray-600 truncate max-w-[300px]">{name}</div>
                                                <div className="text-xs text-gray-400 mt-1">{m.date}</div>
                                            </div>
                                        </div>
                                        <div className={`font-semibold ${isSent ? 'text-red-500' : 'text-green-500'}`}>{isSent ? '- ' : '+ '}${m.amount.toFixed(2)}</div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-600">Página {page}{meta ? ` de ${meta.totalPages}` : ''}</div>
                    <div className="flex items-center gap-2">
                        <button onClick={prev} disabled={!meta || page <= 1 || (meta && meta.first)} className={`px-3 py-2 rounded-md border ${(!meta || page <= 1 || (meta && meta.first)) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'} transition`}>
                            Anterior
                        </button>
                        <button onClick={next} disabled={!meta || (meta && meta.last) || (meta && page >= meta.totalPages)} className={`px-3 py-2 rounded-md border ${(!meta || (meta && meta.last) || (meta && page >= meta.totalPages)) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white hover:bg-gray-50'} transition`}>
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Movements