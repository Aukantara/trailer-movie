import { Link, NavLink, Route, Routes } from 'react-router-dom'
import IsiCoba from './IsiCoba'
import App from '../App'

const Coba = () => {
    const cumi = "apake"
    return (
        <>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/book' element={<IsiCoba nama={cumi}/>} />
            </Routes>
        </>
    )
}

export default Coba;
