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

        const q = query(collection(db, 'usuarios'), where('email', '==', email), where('senha', '==', senha));
        const querySnapshot = await getDocs(q);

        console.log("teste",querySnapshot)

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            const nome = userData.nome;

            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', nome);
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
                <button className="button-login">Login</button>
                <div className="other-links-login">
                    <a href="/criar-conta"><u>Criar conta</u></a>
                    <a href="/esqueci-senha"><u>Esqueci minha senha</u></a>
                </div>
            </form>
        </section>
    )
}

export default Login