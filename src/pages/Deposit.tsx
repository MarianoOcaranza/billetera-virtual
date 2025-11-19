import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useState, type FormEvent } from "react";
initMercadoPago(import.meta.env.VITE_MERCADOPAGO_KEY);


const Deposit: React.FC = () => {
    const [cvu, setCvu] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setMessage("");
        setError("");
        setPreferenceId(null);

        try {
            
            const res = await fetch(`${import.meta.env.VITE_API_URL}/payments/checkout`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cvu, amount }),
                credentials: 'include'
            });

            console.log(JSON.stringify({ cvu, amount }));

            if (!res.ok) {
                const errText = await res.text();
                console.log(res.json);
                throw new Error(errText || "Error al crear la preferencia");
            }   

            const data = await res.json();
            setPreferenceId(data.preferenceId);
            setMessage("✅ Preferencia creada. Podés proceder al pago.");
        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : "Error desconocido al crear preferencia.";
            setError("❌ " + errorMsg);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#39AAAA]">
                Recarga tu CheWallet 💰
            </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label
                htmlFor="cvu"
                className="block text-sm font-medium text-gray-700"
                >
                    CVU
                </label>
                <input
                    id="cvu"
                    type="text"
                    required
                    value={cvu}
                    onChange={(e) => setCvu(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-[#39AAAA] focus:border-[#39AAAA]"
                />
                </div>

            <div>
                <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700"
                >
                    Monto
                </label>
                <input
                    id="amount"
                    type="number"
                    required
                    min="1"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-[#39AAAA] focus:border-[#39AAAA]"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-[#39AAAA] text-white font-semibold py-2 rounded-lg hover:bg-[#2f8d8d] transition"
            >
                Generar pago
            </button>
        </form>

        {preferenceId && (
        <div className="mt-6 flex justify-center">
            <Wallet
                initialization={{ preferenceId: preferenceId}}
            />
        </div>
        )}
        {error && (
            <p>{error}</p>
        )}
        {message && (
            <p>{message}</p>
        )} 
    </div>
    )
}

export default Deposit