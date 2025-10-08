import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const Header: React.FC = () => {
    const [isMobile, setIsMobile] = useState(true);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};
		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
    
    return (
        <header
			className="z-999 flex p-3 bg-[#39AAAA] max-h-[64px] text-white sticky top-0 md:justify-around justify-between"
		>
			<div className="flex justify-center items-center cursor-pointer">
				<Link to="/" className="text-xl font-extralight">
					Billetera Virtual
				</Link>
			</div>

			{isMobile ? (
				<>
					{isMenuOpen ? (
						<>
							<nav className="flex absolute bg-[#39AAAA] p-4 w-full top-0 right-0 shadow-md flex-col">
								<X
									onClick={() => setIsMenuOpen(false)}
									className="self-end cursor-pointer"
								/>
								<div className="flex items-center cursor-pointer mb-5">
									<Link
										to="/"
										onClick={() => setIsMenuOpen(false)}
										className="text-xl font-extralight"
									>
										Billetera Virtual
									</Link>
								</div>
								<ul className="flex flex-col p-2 font-light gap-10 items-center">
									<Link
										to="/login"
										onClick={() => setIsMenuOpen(false)}
										className="hover:underline hover:text-lg cursor-pointer transition-all duration-300"									>
										Login
									</Link>
									<li className="hover:underline hover:text-lg cursor-pointer transition-all duration-300">
										Contacto
									</li>
									<Link
										to="/register"
										onClick={() => setIsMenuOpen(false)}
										className="hover:underline hover:text-lg cursor-pointer transition-all duration-300"
									>
										Registrar
									</Link>
								</ul>
							</nav>
						</>
					) : (
						<Menu
							size={30}
							onClick={() => setIsMenuOpen(true)}
							className="cursor-pointer"
						/>
					)}
				</>
			) : (
				<>
					<nav>
						<ul className="flex p-2 font-light gap-10">
							<Link
								to="/login"
								className="hover:underline hover:text-lg cursor-pointer transition-all duration-300"							>
								Login
							</Link>
							<li className="hover:underline hover:text-lg cursor-pointer transition-all duration-300">
								Contacto
							</li>
							<Link 
								to="/register" 
								className="hover:underline hover:text-lg cursor-pointer transition-all duration-300">
								Registrar
							</Link>
						</ul>
					</nav>
				</>
			)}
		</header>
    )
}

export default Header