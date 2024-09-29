import { Routes, Route } from 'react-router-dom'
import Home from '../pages/HomePage.js'
import Login from '../pages/LoginPage.js';
import CadastroUsuarioPage from '../pages/CadastroUsuarioPage.js';

function RoutesApp () {
    return (
        <Routes>
            <Route path='/' element={ <Home/> } />
            <Route path='/login' element={ <Login/> }/>
            <Route path='/cadastro-usuario' element={ <CadastroUsuarioPage/> }/>
        </Routes>
    )
}

export default RoutesApp;