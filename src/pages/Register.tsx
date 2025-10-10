import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Register: React.FC = () => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    dni: "",
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    birthday: "",
    phone: "",
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (formData.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }

    if (formData.password !== formData.repeatPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setError("");
    console.log(formData);
    setFormData({
      username: "",
      dni: "",
      email: "",
      password: "",
      repeatPassword: "",
      firstName: "",
      lastName: "",
      birthday: "",
      phone: "",
    });
  };

  return (
    <>
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#f5f5f5]">
        <div className="bg-white p-8 rounded-lg shadow-md lg:min-w-1/3 md:min-w-1/2 min-w-8/12">
          <h1 className="text-2xl font-bold mb-6 text-center">Registrarse</h1>

          <form onSubmit={handleSubmit}>
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-neutral-700 font-bold"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  autoComplete="name"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Ingrese su nombre"
                  className="w-full border border-neutral-400 bg-white p-2 text-sm rounded-md shadow-sm focus:ring-2 focus:ring-current focus:outline-none mt-2"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block text-neutral-700 font-bold"
                >
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Ingrese su apellido"
                  className="w-full border border-neutral-400 bg-white p-2 text-sm rounded-md shadow-sm focus:ring-2 focus:ring-current focus:outline-none mt-2"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <label
                  htmlFor="username"
                  className="block text-neutral-700 font-bold mt-2"
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
                  className="w-full border border-neutral-400 bg-white p-2 text-sm rounded-md shadow-sm focus:ring-2 focus:ring-current focus:outline-none mt-2"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="dni"
                  className="block text-neutral-700 font-bold mt-2"
                >
                  DNI
                </label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  autoComplete="off"
                  value={formData.dni}
                  onChange={handleChange}
                  placeholder="Ingrese su DNI"
                  className="w-full border border-neutral-400 bg-white p-2 text-sm rounded-md shadow-sm focus:ring-2 focus:ring-current focus:outline-none mt-2"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block text-neutral-700 font-bold mt-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ingrese su email"
                  className="w-full border border-neutral-400 bg-white p-2 text-sm rounded-md shadow-sm focus:ring-2 focus:ring-current focus:outline-none mt-2"
                  required
                />
              </div>
              <div className="flex-1">
                <div className="relative">
                  <label
                  htmlFor="birthday"
                  className="block text-neutral-700 font-bold mt-2"
                >
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  autoComplete="bday"
                  value={formData.birthday}
                  onChange={handleChange}
                  className="w-full border border-neutral-400 bg-white p-2 text-sm rounded-md shadow-sm focus:ring-2 focus:ring-current focus:outline-none mt-2"
                  required
                />
                </div>
              </div>
            </div>
            <div className="flex flex-row flex-space-between gap-4 mt-4">
              <div className="flex flex-col flex-1 w-50">
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-neutral-700 font-bold mt-2"
                  >
                    Contraseña
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    autoComplete="off"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ingrese su contraseña"
                    className="border border-neutral-400 bg-white p-2 text-sm rounded-md shadow-sm focus:ring-2 focus:ring-current focus:outline-none mt-2 w-full"
                    required
                  />
                  <button
                    type="button"
                    className= "text-gray-500 absolute right-2 top-15 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  <span className="info text-neutral-500 text-sm">
                  La contraseña debe tener al menos 8 caracteres
                </span>
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="phone"
                    className="block text-neutral-700 font-bold mt-2"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Ingrese su teléfono"
                    className="border border-neutral-400 bg-white p-2 text-sm rounded-md shadow-sm focus:ring-2 focus:ring-current focus:outline-none mt-2 w-full"
                    required
                  />
                </div>
              </div>
              <div className="flex-1 relative">
                <label
                    htmlFor="repeatPassword"
                    className="block text-neutral-700 font-bold mt-2"
                  >
                    Repetir Contraseña
                  </label>
                  <input
                    type={showRepeatPassword ? "text" : "password"}
                    id="repeatPassword"
                    name="repeatPassword"
                    autoComplete="off"
                    value={formData.repeatPassword}
                    onChange={handleChange}
                    placeholder="Repita su contraseña"
                    className="border border-neutral-400 bg-white p-2 text-sm rounded-md shadow-sm focus:ring-2 focus:ring-current focus:outline-none mt-2 w-full"
                    required
                  />
                  <button
                    type="button"
                    className="text-gray-500 absolute right-2 top-15 transform -translate-y-1/2"
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  >
                    {showRepeatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
              </div>
            </div>
            <div className="flex-1 mt-4">
              <button
                className=" w-full border mt-4 p-2 rounded-lg bg-[#39AAAA] text-white hover:bg-[#2d8c8c] transition-colors duration-150 hover:scale-105 animated-shadow-md"
                type="submit"
              >
                Registrarse
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Register;





