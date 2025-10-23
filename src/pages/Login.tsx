import { useState } from "react";
import { AlertCircle, Eye, EyeOff, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";

const Login: React.FC = () => {
	const [formError, setFormError] = useState<string[]>([]);
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const { login, loading } = useAuthStore()
	const navigate = useNavigate()

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (formData.username === "" || formData.password === "") {
			setFormError(["Por favor complete todos los campos"]);
			return;
		}

		const result = await login(formData);

		if (!result.success) {
			setFormError(Object.values(result.error));
			return
		}

		setFormData({ username: "", password: "" });
		navigate("/dashboard")
	};

	return (
		<div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#f5f5f5] px-4">
			<div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-10 w-full max-w-md hover:shadow-[#39AAAA]/30 hover:shadow-2xl transition-all">

				<div className="flex flex-col items-center mb-8">
					<div className="bg-[#39AAAA]/10 p-3 rounded-full mb-3">
						<LogIn size={28} className="text-[#39AAAA]" />
					</div>
					<h1 className="text-3xl font-bold text-gray-800 text-center">
						Iniciar Sesión
					</h1>
					<p className="text-sm text-gray-500 mt-1 text-center">
						Bienvenido nuevamente 👋
					</p>
				</div>

				<form onSubmit={handleSubmit} className="flex flex-col gap-5">
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-semibold text-gray-700 mb-2"
						>
							Nombre de usuario
						</label>
						<input
							type="text"
							id="username"
							name="username"
							autoComplete="username"
							value={formData.username}
							onChange={handleChange}
							placeholder="Ingrese su nombre de usuario"
							className="border border-gray-300 bg-white/90 p-3 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#39AAAA] transition"
						/>
					</div>

					<div>
						<div className="flex justify-between items-center mb-2">
							<label
								htmlFor="password"
								className="text-sm font-semibold text-gray-700"
							>
								Contraseña
							</label>
							<Link
								to="/recovery"
								className="text-sm text-[#39AAAA] hover:underline transition"
							>
								¿Olvidaste tu contraseña?
							</Link>
						</div>

						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								name="password"
								autoComplete="off"
								value={formData.password}
								onChange={handleChange}
								placeholder="Ingrese su contraseña"
								className="border border-gray-300 bg-white/90 p-3 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#39AAAA] transition"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#39AAAA] transition"
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
					</div>

					{formError && formError.length > 0 && (
						<ul className="text-red-500 text-sm mt-2">
							{formError.map((err, i) => (
								<div key={i} className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-md">
									<AlertCircle size={18} />
									<span className="text-sm">{err}</span>
								</div>))}
						</ul>
					)}


					<button
						type="submit"
						className={`mt-2 w-full flex justify-center items-center gap-2 border border-transparent p-3 rounded-xl ${loading ? 'bg-neutral-400' : 'bg-[#39AAAA]'} text-white font-semibold hover:bg-[#2d8c8c] transition-transform duration-150 hover:scale-105 shadow-md`}
						disabled={loading}
					>
						<LogIn size={20} />
						{loading ? 'Cargando...' : 'Iniciar Sesion'}
					</button>

					<p className="text-sm text-gray-600 text-center mt-3">
						¿No tenés una cuenta?{" "}
						<Link
							to="/register"
							className="text-[#39AAAA] hover:underline font-medium transition"
						>
							Registrate
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;

