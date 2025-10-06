import type { ReactNode } from "react"
import Header from "../components/Header"

interface Props {
    children: ReactNode;
}


const MainLayout: React.FC<Props> = ({children})=> {
    return(
        <>
            <Header />
            {children}
        </>
    )
}


export default MainLayout
