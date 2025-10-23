import React, { useState } from "react";
import {
	Eye,
	EyeOff,
	User,
	Mail,
	Calendar,
	Phone,
	Hash,
	AlertCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

type RegisterForm = {
	username: string;
	dni: string;
	email: string;
	password: string;
	repeatPassword: string;
	name: string;
	lastname: string;
	birthdate: string;
	phone: string;
};

const initialState: RegisterForm = {
	username: "",
	dni: "",
	email: "",
	password: "",
	repeatPassword: "",
	name: "",
	lastname: "",
	birthdate: "",
	phone: "",
};

const inputClass = "w-full border border-gray-200 bg-white/90 p-3 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#39AAAA] transition";

const Register: React.FC = () => {
	const [formData, setFormData] = useState<RegisterForm>(initialState);
	const [error, setError] = useState<string[]>([]);
	const [showPassword, setShowPassword] = useState(false);
	const [showRepeatPassword, setShowRepeatPassword] = useState(false);
	const { register, loading } = useAuthStore();
	const navigate = useNavigate();

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const validate = (): string | null => {
		const { password, repeatPassword, dni, email } = formData;
		if (password.length < 8) return "La contraseña debe tener al menos 8 caracteres";
		if (password !== repeatPassword) return "Las contraseñas no coinciden";
		if (!/\S+@\S+\.\S+/.test(email)) return "El email no es válido";
		if (!/^\d+$/.test(dni)) return "El DNI solo debe contener números";
		return null;
	};

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		const validationError = validate();
		if (validationError) {
			setError([validationError]);
			return;
		}

		const result = await register(formData);

		if (!result.success) {
			setError(Object.values(result.error));
			return
		}

		setError([]);
		navigate('/');

	};

	return (
		<div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#f5f5f5] px-4 py-8">
			<div className="w-full max-w-3xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-8 hover:shadow-[#39AAAA]/30 transition">
				<header className="flex flex-col items-center mb-6">
					<div className="bg-[#39AAAA]/10 p-3 rounded-full mb-3">
						<User size={28} className="text-[#39AAAA]" />
					</div>
					<h1 className="text-2xl font-extrabold text-gray-800">Crear cuenta</h1>
					<p className="text-sm text-gray-500 mt-1 text-center">
						Completa tus datos para comenzar
					</p>
				</header>

				<form onSubmit={handleSubmit} className="grid gap-4">
					{error && error.length > 0 && (
						<>
							{error.map((err, i) => (
								<ul key={i} className="text-red-500 text-sm mt-2">
									<div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-md">
										<AlertCircle size={18} />
										<span className="text-sm">{err}</span>
									</div>
								</ul>
							))}
						</>
					)}

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
								<User size={16} className="text-[#39AAAA]" />
								Nombre
							</label>
							<input
								name="name"
								value={formData.name}
								onChange={handleChange}
								placeholder="Tu nombre"
								className={inputClass}
								required
							/>
						</div>

						<div>
							<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
								<User size={16} className="text-[#39AAAA]" />
								Apellido
							</label>
							<input
								name="lastname"
								value={formData.lastname}
								onChange={handleChange}
								placeholder="Tu apellido"
								className={inputClass}
								required
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
								<Hash size={16} className="text-[#39AAAA]" />
								Usuario
							</label>
							<input
								name="username"
								value={formData.username}
								onChange={handleChange}
								placeholder="Nombre de usuario"
								className={inputClass}
								required
							/>
						</div>

						<div>
							<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
								<Hash size={16} className="text-[#39AAAA]" />
								DNI
							</label>
							<input
								name="dni"
								value={formData.dni}
								onChange={handleChange}
								placeholder="Solo números"
								className={inputClass}
								inputMode="numeric"
								required
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
								<Mail size={16} className="text-[#39AAAA]" />
								Email
							</label>
							<input
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								placeholder="ejemplo@correo.com"
								className={inputClass}
								required
							/>
						</div>

						<div>
							<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
								<Calendar size={16} className="text-[#39AAAA]" />
								Fecha de nacimiento
							</label>
							<input
								name="birthdate"
								type="date"
								value={formData.birthdate}
								onChange={handleChange}
								className={inputClass}
								required
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="relative">
							<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
								<LockIconPlaceholder />
								Contraseña
							</label>
							<input
								name="password"
								type={showPassword ? "text" : "password"}
								value={formData.password}
								onChange={handleChange}
								placeholder="Mínimo 8 caracteres"
								className={inputClass}
								required
								aria-describedby="pwd-help"
							/>
							<button
								type="button"
								aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
								onClick={() => setShowPassword((s) => !s)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#39AAAA] transition"
							>
								{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>
							<p id="pwd-help" className="text-xs text-neutral-500 mt-1">
								La contraseña debe tener al menos 8 caracteres.
							</p>
						</div>

						<div className="relative">
							<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
								<LockIconPlaceholder />
								Repetir contraseña
							</label>
							<input
								name="repeatPassword"
								type={showRepeatPassword ? "text" : "password"}
								value={formData.repeatPassword}
								onChange={handleChange}
								placeholder="Repita la contraseña"
								className={inputClass}
								required
								aria-describedby="pwd-match"
							/>
							<button
								type="button"
								aria-label={showRepeatPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
								onClick={() => setShowRepeatPassword((s) => !s)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#39AAAA] transition"
							>
								{showRepeatPassword ? <EyeOff size={18} /> : <Eye size={18} />}
							</button>

							<div id="pwd-match" className="mt-1">
								{formData.repeatPassword ? (
									formData.password === formData.repeatPassword ? (
										<p className="text-green-600 text-xs">✔ Las contraseñas coinciden</p>
									) : (
										<p className="text-red-500 text-xs">✖ Las contraseñas no coinciden</p>
									)
								) : null}
							</div>
						</div>
					</div>

					<div>
						<label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
							<Phone size={16} className="text-[#39AAAA]" />
							Teléfono
						</label>
						<input
							name="phone"
							type="tel"
							value={formData.phone}
							onChange={handleChange}
							placeholder="+54 9 11 1234 5678"
							className={inputClass}
						/>
					</div>

					<div className="pt-2">
						<button
							type="submit"
							className="w-full p-3 rounded-xl bg-[#39AAAA] text-white font-semibold hover:bg-[#2d8c8c] transition-transform duration-150 hover:scale-105 shadow-md"
							disabled={loading}
						>
							{loading ? 'Cargando...' : 'Registrarse'}
						</button>

						<p className="text-sm text-gray-600 text-center mt-3">
							¿Ya tenés cuenta?{" "}
							<Link to='/login' className="text-[#39AAAA] font-medium">Iniciar sesión</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;

function LockIconPlaceholder() {
	return (
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#39AAAA]">
			<path d="M12 15v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<rect x="4" y="11" width="16" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
			<path d="M7 11V8a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}