import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getLogin } from '../../services/LoginService';
import './login.css'
import TituloForm from '../../components/TituloForm';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigator = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (email === '' || senha === '') {
            alert('Preencha os campos.');
            return;
        }

        const querySnapshot = await getLogin({ email, senha })

        if (!querySnapshot.data.empty) {
            const userData = querySnapshot.data?.docs[0].data();
            const nome = userData?.nome;
            const tipo = userData?.tipo;

            const options = {
                email,
                nome,
                tipo
            }

            localStorage.setItem('userData', JSON.stringify(options));
            alert('Login efetuado.');
            navigator('/')
        } else {
            alert('E-mail ou senha inválidos');
        }
    }

    return (
        <section className="login">
            <form onSubmit={handleSubmit} className="login-content">
                <div>
                    <TituloForm descricao="E-mail" />

                    <input
                        className="input-login"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <TituloForm descricao="Senha" />
                    <input
                        className="input-login"
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>
                <button className="button-login" disabled={email === '' || senha === ''}>Login</button>
                <div className="other-links-login">
                    <a href="/cadastro-usuario"><u>Criar conta</u></a>
                    <a href='/login'><u>Esqueci minha senha</u></a>
                </div>
            </form>
        </section>
    )
}

export default Login