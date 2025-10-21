import React, { useState } from "react";
import { Eye, EyeOff, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { Link } from "react-router";

interface Props {
  firstName: string;
  balance: number;
}

const AccountData: React.FC<Props> = ({ firstName, balance }) => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 border border-gray-200 transition-all hover:shadow-[#39AAAA]/30 hover:shadow-2xl">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
        Hola, <span className="text-[#39AAAA]">{firstName}</span> 👋
      </h1>

      <div className="relative w-full text-center mb-10">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-3xl font-semibold text-gray-700">
            {showBalance ? `$${balance.toLocaleString()}` : "••••••"}
          </h2>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="p-1 hover:bg-gray-100 rounded-full transition-all"
          >
            {showBalance ? (
              <EyeOff size={22} className="text-gray-500" />
            ) : (
              <Eye size={22} className="text-gray-500" />
            )}
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-1">Saldo disponible</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <Link
          to='/ingresar'
          type="button"
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#39AAAA] text-white font-semibold hover:bg-[#2d8c8c] transition-transform duration-150 hover:scale-105 shadow-md"
        >
          <ArrowDownCircle size={22} />
          Ingresar dinero
        </Link>

        <button
          type="button"
          className="flex items-center justify-center gap-2 p-3 rounded-xl bg-[#39AAAA] text-white font-semibold hover:bg-[#2d8c8c] transition-transform duration-150 hover:scale-105 shadow-md"
        >
          <ArrowUpCircle size={22} />
          Transferir dinero
        </button>
      </div>
    </div>
  );
};

export default AccountData;
