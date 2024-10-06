import { db } from '../firebaseConnection';
import { collection, addDoc } from 'firebase/firestore';

export const cadastroUsuario = async ({ formData }) => {

    try {
        await addDoc(collection(db, 'usuarios'), formData);
        return {
            status: "success"
        }

    } catch (error) {
        console.error("Erro ao cadastrar usuário: ", error);
        return {
            status: "error",
            message: error.message
        }
    }


}