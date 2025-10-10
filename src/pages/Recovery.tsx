import React, { useState } from "react";
import {ArrowRight, Mail } from "lucide-react";
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
    <>
      <div
        id="fondo"
        className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#f5f5f5] flex-col"
      >
        <div
          id="contenedor"
          className="bg-white p-8 rounded-lg shadow-md  w-11/12 sm:w-8/12 md:w-6/12 lg:w-3/12"
        >
          <div className="space-y-6">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-md bg-[#E0F7F7]">
                  <Mail className="text-[#39AAAA]" size={32} />
                </div>
                <h2 className="font-bold text-2xl">Recuperar Contraseña</h2>
                <p className="text-gray-600 mt-2">
                  Ingresa tu correo electrónico y te enviaremos un código de
                  verificación
                </p>
              </div>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="text-neutral-700 font-bold">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={emailSent}
                    onChange={(e) => setEmailSent(e.target.value)}
                    placeholder="Ingrese su correo electrónico"
                    className="border border-neutral-400 bg-white p-2 text-sm rounded-md shadow-sm focus:ring-2 focus:ring-current focus:outline-none mt-3 w-full"
                    disabled={loading}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#39AAAA] text-white py-3 rounded-lg font-semibold hover:bg-[#2d8c8c] transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? "Enviando..." : "Enviar Código"}
                  <ArrowRight size={20} />
                </button>
                {message && <p className="text-green-500 text-center mt-4">{message}</p>}
              </form>
            </div>
            <div className="text-center mt-6">
              <a href="/login" className="text-sm text-black hover:underline">
                Volver al inicio de sesión
              </a>
            </div>
        </div>
      </div>
    </>
  );
};

export default Recovery;
