import React from "react";
import { User, AtSign, Hash, Copy } from "lucide-react";

interface Props {
  alias: string;
  cvu: string;
  firstName: string;
  lastName: string;
}

const UserData: React.FC<Props> = ({ alias, cvu, firstName, lastName }) => {
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
          {firstName} {lastName}
        </h2>
      </div>

      <div className="flex flex-col gap-4 w-full text-gray-700">
        <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
          <div className="flex items-center gap-2">
            <AtSign size={18} className="text-[#39AAAA]" />
            <span className="font-medium">Alias:</span>
          </div>
          <span className="text-gray-600">{alias}</span>
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
              className="p-1 hover:bg-gray-100 rounded-full transition"
              title="Copiar CVU"
            >
              <Copy size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;
