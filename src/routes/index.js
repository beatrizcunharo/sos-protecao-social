import { Routes, Route } from 'react-router-dom'
import Home from '../pages/HomePage.js'
import Login from '../pages/LoginPage.js';
import CadastroUsuarioPage from '../pages/CadastroUsuarioPage.js';
import CadastroDenunciaPage from '../pages/CadastroDenunciaPage.js';
import PaginaSucesso from '../pages/PaginaSucesso.js';

function RoutesApp () {
    return (
        <Routes>
            <Route path='/' element={ <Home/> } />
            <Route path='/login' element={ <Login/> }/>
            <Route path='/cadastro-usuario' element={ <CadastroUsuarioPage/> }/>
            <Route path='/cadastro-denuncia' element={ <CadastroDenunciaPage/> }/>
            <Route path='/sucesso' element={ <PaginaSucesso/> }/>
        </Routes>
    )
}

export default RoutesApp;