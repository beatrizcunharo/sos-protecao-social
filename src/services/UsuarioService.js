import { db } from '../firebaseConnection';
import { collection, query, getDocs, where, addDoc } from 'firebase/firestore';

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

export const getUsuariosByEmail = async ({email}) => {
    try {
        const usuarios = collection(db, "usuarios");

        const q = query(usuarios, where("email", "==", email));

        const querySnapshot = await getDocs(q);

        const usuariosEncontrados = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return {
            status: "success",
            data: usuariosEncontrados
        };
    } catch (error) {
        console.error("Erro ao buscar usuarios: ", error);

        return {
            status: "error",
            message: error.message
        };
    }
};