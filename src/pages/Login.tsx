import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";

const Login: React.FC = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formData.username === "" || formData.password === "") {
      setError("Por favor complete todos los campos");
      return;
    }
    setError("");
    console.log(formData);
    setFormData({ username: "", password: "" });
  };

  return (
    <>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#f5f5f5]">
        <div className="bg-white p-8 rounded-lg shadow-md lg:min-w-1/3 md:min-w-1/2 min-w-8/12">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Iniciar Sesión
          </h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="text-neutral-700 font-bold">
              Nombre de usuario
            </label>
            <br></br>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Ingrese su nombre de usuario"
              className="border border-neutral-400 bg-white p-2 text-sm rounded-md shadow-sm focus:ring-2 focus:ring-current focus:outline-none mt-3 w-full"
            />
            <br></br>
            <br></br>
            <div className = "flex justify-between">
              <label htmlFor="password" className="text-neutral-700 font-bold pr-10">
                Contraseña
              </label>
              <Link to=""
                className="text-sm text-black hover:underline float-right"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingrese su contraseña"
                className="border border-neutral-400 bg-white p-2 text-sm rounded-md shadow-sm focus:ring-2 focus:ring-current focus:outline-none mt-3 mb-4 w-full"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-center mt-2">
              <Link
                to="/register"
                className="text-sm text-black hover:underline"
              >
                ¿No tenès una cuenta? Registrate
              </Link>
            </div>
            <br></br>
            <div className="flex justify-center">
              <button
                className="w-full border p-2 rounded-lg bg-black text-white hover:bg-black/80 transition-colors duration-150 hover:scale-105 animated-shadow-md"
                type="submit"
              >
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
