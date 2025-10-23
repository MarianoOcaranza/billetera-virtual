import { LogOut, Menu, X, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const Header: React.FC = () => {
	const [isMobile, setIsMobile] = useState(true);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const {isLogged, logout, username} = useAuthStore();
	const navigate = useNavigate();

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleLogout = () => {
		logout();
		navigate("/login");
	}

	return (
		<header className="z-50 sticky top-0 w-full bg-[#39AAAA] shadow-lg">
			<div className="flex items-center justify-between px-6 py-3 md:px-12">
				<Link
					to="/"
					className="text-2xl font-extrabold text-white hover:text-gray-100 transition-colors"
				>
					Che<span className="font-light">Wallet</span>
				</Link>

				{/* Botón menú móvil */}
				{isMobile ? (
					<>
						{isMenuOpen ? (
							<X
								size={30}
								onClick={() => setIsMenuOpen(false)}
								className="text-white cursor-pointer hover:scale-110 transition-transform"
							/>
						) : (
							<Menu
								size={30}
								onClick={() => setIsMenuOpen(true)}
								className="text-white cursor-pointer hover:scale-110 transition-transform"
							/>
						)}
					</>
				) : (
					<nav>
						<ul className="flex items-center gap-10 font-medium text-white">
							{!isLogged && (
							<>
							<Link
								to="/login"
								className="hover:underline underline-offset-4 hover:text-gray-100 transition-all duration-200"
							>
								Login
							</Link><Link
								to="/register"
								className="hover:underline underline-offset-4 hover:text-gray-100 transition-all duration-200"
							>
									Registrar
								</Link>
							</>
							)}
							{isLogged && (
								<div className="flex justify-center items-center gap-3">
									<span className='flex justify-center items-center'>
										<User size={18}/>
										<p>{username}</p>
									</span>
									<button 
										onClick={handleLogout}
										className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium px-2 py-1 rounded-md shadow-sm transition-all active:scale-95"
										>
											<LogOut size={18} />
											<span>
												Cerrar sesión
											</span>
									</button>
								</div>
							)}
						</ul>
					</nav>
				)}
			</div>

			{/* Menú móvil */}
			{isMobile && isMenuOpen && (
				<nav className="absolute top-[64px] left-0 w-full bg-[#39AAAA] shadow-md animate-slideDown">
					<ul className="flex flex-col items-center py-6 gap-6 text-white font-medium">
						{!isLogged && (
						<>
							<Link
								to="/login"
								onClick={() => setIsMenuOpen(false)}
								className="hover:underline underline-offset-4 hover:text-gray-100 transition-all duration-200"
							>
								Login
							</Link><Link
								to="/register"
								onClick={() => setIsMenuOpen(false)}
								className={`hover:underline underline-offset-4 hover:text-gray-100 transition-all duration-200`}
							>
									Registrar
								</Link>
						</>
						)}
						{isLogged && (
							<div className="flex flex-col justify-center items-center gap-3">
								<span className='flex justify-center items-center'>
									<User size={18}/>
									<p>{username}</p>
								</span>
								<button 
									onClick={handleLogout}
									className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium px-2 py-1 rounded-md shadow-sm transition-all active:scale-95"
									>
										<LogOut size={18} />
										<span>
											Cerrar sesión
										</span>
								</button>
							</div>
						)}
					</ul>
				</nav>
			)}
		</header>
	);
};

export default Header;
