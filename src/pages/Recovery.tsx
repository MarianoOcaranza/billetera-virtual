import React, { useState } from "react";
import { ArrowRight, Mail, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

const Recovery: React.FC = () => {
	const navigate = useNavigate();
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [emailSent, setEmailSent] = useState("");

	const handleEmailSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		setMessage("Se ha enviado un código de verificación a su correo " + emailSent);
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			navigate("/login");
		}, 3000);
	};

	return (
		<div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#f5f5f5]">
			<div className="bg-white/80 backdrop-blur-md shadow-2xl border border-gray-200 rounded-2xl p-8 w-11/12 sm:w-8/12 md:w-6/12 lg:w-1/3 transition-transform duration-300 hover:scale-[1.02]">

				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-5 shadow-md bg-[#E0F7F7]">
						<Mail className="text-[#39AAAA]" size={36} />
					</div>
					<h2 className="font-bold text-3xl text-gray-800">Recuperar Contraseña</h2>
					<p className="text-gray-600 mt-2">
						Ingresá tu correo electrónico y te enviaremos un código de verificación
					</p>
				</div>

				<form onSubmit={handleEmailSubmit} className="space-y-6">
					<div>
						<label htmlFor="email" className="text-gray-700 font-semibold">
							Correo Electrónico
						</label>
						<input
							type="email"
							id="email"
							name="email"
							autoComplete="email"
							value={emailSent}
							onChange={(e) => setEmailSent(e.target.value)}
							placeholder="ejemplo@correo.com"
							className="border border-neutral-300 bg-white p-3 text-sm rounded-lg shadow-sm focus:ring-2 focus:ring-[#39AAAA] focus:outline-none mt-2 w-full transition"
							disabled={loading}
							required
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2
                       bg-[#39AAAA] text-white hover:bg-[#2d8c8c] transition-all duration-200
                       hover:shadow-md hover:scale-[1.02] disabled:opacity-60"
					>
						{loading ? (
							<>
								<Loader2 className="animate-spin" size={20} />
								Enviando...
							</>
						) : (
							<>
								Enviar Código
								<ArrowRight size={20} />
							</>
						)}
					</button>

					{message && (
						<p className="text-green-600 text-center font-medium mt-3">{message}</p>
					)}
				</form>

				<div className="text-center mt-8">
					<a
						href="/login"
						className="text-sm text-gray-700 hover:text-[#2d8c8c] hover:underline transition"
					>
						Volver al inicio de sesión
					</a>
				</div>
			</div>
		</div>
	);
};

export default Recovery;
