import { useState } from "react"

const Login: React.FC = ()=> {
    const [formData, setFormData] = useState(
        {
            username: ''
        }
    )

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event)=> {
        event.preventDefault();
        const {name, value} = event.target;
        setFormData((prev => ({
			...prev,
			[name]: value,
			})
		))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(formData)        
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username" className='text-neutral-700'>
                Nombre de usuario
            </label>
            <input 
                type="text" 
                id='username'
                name='username'
                value={formData.username}
                onChange={handleChange}
                placeholder='Ingrese su nombre de usuario' 
                className='border border-neutral-400 bg-white p-2 text-sm rounded-md shadow-sm focus:ring-2 focus:ring-current focus:outline-none'
            /> 
            <button
                className="border p-2"
                type="submit"
                >
                    Submit
            </button>   
        </form>
        </>
    )
}

export default Login