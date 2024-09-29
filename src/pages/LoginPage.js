import { useState } from 'react';
import { db } from '../firebaseConnection'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigator = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(email === '' || senha === '') {
            alert('Preencha os campos.');
            return;
        }

        const q = query(collection(db, 'usuarios'), where('email', '==', email), where('senha', '==', senha));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const nome = userData.nome;
            const tipo = userData.tipo;

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
                    <p className="text-input-login">E-mail</p>
                    <input
                        className="input-login"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <p className="text-input-login">Senha</p>
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
                    <a><u>Esqueci minha senha</u></a>
                </div>
            </form>
        </section>
    )
}

export default Login