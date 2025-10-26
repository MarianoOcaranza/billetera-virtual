import React from "react";
import { User, AtSign, Hash, Copy, ArrowUpRight, ArrowDownRight, ArrowRightLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
	alias: string;
	cvu: string;
	name: string;
	lastName: string;
	recentTransactions: any[];
}

const UserData: React.FC<Props> = ({ alias, cvu, name, lastName, recentTransactions }) => {
	const handleCopy = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	
	return (
		<div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-gray-200 flex flex-col justify-center items-center w-full h-full hover:shadow-[#39AAAA]/30 hover:shadow-2xl transition-all">
			<div className="flex flex-col items-center gap-2 mb-6">
				<div className="bg-[#39AAAA]/10 p-3 rounded-full">
					<User className="text-[#39AAAA]" size={28} />
				</div>
				<h2 className="text-2xl font-semibold text-gray-800">
					{name} {lastName}
				</h2>
			</div>

			<div className="flex flex-col gap-4 w-full text-gray-700">
				<div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
					<div className="flex items-center gap-2">
						<AtSign size={18} className="text-[#39AAAA]" />
						<span className="font-medium">Alias:</span>
					</div>
					<span className="text-gray-600">{alias}</span>
					<Link to="/profile" className="text-[#39AAAA]">editar</Link>
				</div>

				<div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
					<div className="flex items-center gap-2">
						<Hash size={18} className="text-[#39AAAA]" />
						<span className="font-medium">CVU:</span>
					</div>
					<div className="flex items-center gap-2">
						<span className="text-gray-600 truncate max-w-[140px] md:max-w-[200px]">{cvu}</span>
						<button
							onClick={() => handleCopy(cvu)}
							className="p-1 hover:bg-[#39AAAA]/20 cursor-pointer rounded-full transition"
							title="Copiar CVU"
						>
							<Copy size={16} className="text-gray-500" />
						</button>
					</div>
				</div>

				<div className="mt-6 w-full">
					<h3 className="text-lg font-medium text-gray-800 mb-3">Últimos movimientos</h3>
					<div className="flex flex-col gap-3">

						{recentTransactions.map((tr, i) => {
							if (tr.type === "TRANSFER_SENT") {
								return (
									<div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
										<div className="flex items-center gap-3">
											<div className="bg-[#39AAAA]/10 p-2 rounded-full">
												<ArrowUpRight size={18} className="text-red-500" />
											</div>
											<div className="text-sm">
												<div className="font-medium">Enviado</div>
												<div className="text-gray-600">{tr.DestinationName} {tr.DestinationLastname}</div>
											</div>
										</div>
										<div className="text-red-500 font-semibold">- ${tr.amount}</div>
									</div>
								);
							}

							if (tr.type === "TRANSFER_RECEIVED") {
								return (
									<div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
										<div className="flex items-center gap-3">
											<div className="bg-[#39AAAA]/10 p-2 rounded-full">
												<ArrowDownRight size={18} className="text-green-500" />
											</div>
											<div className="text-sm">
												<div className="font-medium">Recibido</div>
												<div className="text-gray-600">{tr.OriginName} {tr.OriginLastname}</div>
											</div>
										</div>
										<div className="text-green-500 font-semibold">+ ${tr.amount}</div>
									</div>
								);
							}

							if(!tr.OriginLastname) {
								return (
									<div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
										<div className="flex items-center gap-3">
											<div className="bg-[#39AAAA]/10 p-2 rounded-full">
												<ArrowDownRight size={18} className="text-green-500" />
											</div>
											<div className="text-sm">
												<div className="font-medium">Recarga</div>
												<div className="text-gray-600">Mercado Pago</div>
											</div>
										</div>
										<div className="text-green-500 font-semibold">+ ${tr.amount}</div>
									</div>
								);
							}
							return null;
						})}
						<Link
							to='/movimientos'
							type="button"
							className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#39AAAA] text-white font-semibold hover:bg-[#2d8c8c] transition-transform duration-150 hover:scale-105 shadow-md"
						>
							<ArrowRightLeft size={22} />
							Ver todos mis movimientos
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserData;
