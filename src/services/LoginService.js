import { db } from '../firebaseConnection';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const getLogin = async ({email, senha}) => {
    if(!email || !senha) {
        throw new Error("Email ou senha não fornecido");
    }

    try {
        const loginRef = collection(db, "usuarios");

        const q = query(loginRef, where('email', '==', email), where('senha', '==', senha));

        const querySnapshot = await getDocs(q);

        return {
            status: "success",
            data: querySnapshot
        };
    } catch (error) {
        console.error("Erro ao fazer login: ", error);

        return {
            status: "error",
            message: error.message
        };
    }
}