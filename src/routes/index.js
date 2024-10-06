import { Routes, Route } from 'react-router-dom'
import CadastroUsuarioPage from '../pages/CadastroUsuarioPage/index.js';
import CadastroDenunciaPage from '../pages/CadastroDenunciaPage.js';
import DetalhesDenunciaPage from '../pages/DetalhesDenunciaPage.js';
import AtualizarDenunciaPage from '../pages/AtualizarDenunciaPage.js';
import CadastrarAtualizarUsuarioPage from '../pages/CadastrarAtualizarUsuarioPage.js';
import Login from '../pages/LoginPage/index.js';
import Home from '../pages/HomePage/index.js';
import SucessoPage from '../pages/SucessoPage/index.js';
import MapaDenunciaPage from '../pages/MapaDenunciaPage.js';
import UsuariosTabelaPage from '../pages/UsuariosTabelaPage.js';

function RoutesApp () {
    return (
        <Routes>
            <Route path='/' element={ <Home/> } />
            <Route path='/login' element={ <Login/> }/>
            <Route path='/cadastro-usuario' element={ <CadastroUsuarioPage/> }/>
            <Route path='/cadastro-denuncia' element={ <CadastroDenunciaPage/> }/>
            <Route path='/sucesso' element={ <SucessoPage/> }/>
            <Route path='/detalhes-denuncia' element={ <DetalhesDenunciaPage/> }/>
            <Route path='/atualizar-denuncia' element={ <AtualizarDenunciaPage/> }/>
            <Route path='/cadastrar-atualizar-usuario' element={ <CadastrarAtualizarUsuarioPage/> }/>
            <Route path='/mapa-denuncia' element={ <MapaDenunciaPage/> }/>
            <Route path='/usuarios-tabela' element={ <UsuariosTabelaPage/> }/>
        </Routes>
    )
}

export default RoutesApp;