import { useEffect } from "react"
import { useNavigate } from "react-router"

const Landing: React.FC = () => {
    const navigate = useNavigate()

    useEffect(()=> {
        navigate('/login')
    }, [])

    return (
        <>
        </>
    )
}

export default Landing