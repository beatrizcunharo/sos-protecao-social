import { db } from '../firebaseConnection';
import { collection, query, getDocs, where, addDoc, updateDoc } from 'firebase/firestore';
import { getUserData } from '../utils';

export const getDenunciasPorEmail = async () => {
    const { email } = getUserData();

    if (!email) {
        throw new Error("Email não fornecido");
    }

    try {
        const denunciasRef = collection(db, "denuncias");

        const q = query(denunciasRef, where("email", "==", email));

        const querySnapshot = await getDocs(q);

        const denunciasEncontradas = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return {
            status: "success",
            data: denunciasEncontradas
        };
    } catch (error) {
        console.error("Erro ao buscar denúncias: ", error);

        return {
            status: "error",
            message: error.message
        };
    }
};

export const getDenuncias = async () => {
    try {
        const denunciasRef = collection(db, "denuncias");

        const q = query(denunciasRef);

        const querySnapshot = await getDocs(q);

        const denunciasEncontradas = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return {
            status: "success",
            data: denunciasEncontradas
        };
    } catch (error) {
        console.error("Erro ao buscar denúncias: ", error);

        return {
            status: "error",
            message: error.message
        };
    }
};

export const getDenunciasPorProtocolo = async ({protocolo}) => {

    if(!protocolo) return ;

    try {
        const denunciasRef = collection(db, "denuncias");

        const q = query(denunciasRef, where("protocolo", "==", protocolo));

        const querySnapshot = await getDocs(q);

        const denunciasEncontradas = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return {
            status: "success",
            data: denunciasEncontradas
        };
    } catch (error) {
        console.error("Erro ao buscar denúncias: ", error);

        return {
            status: "error",
            message: error.message
        };
    }
};

export const getDenunciasPorEmailSync = async () => {
    const denuncias = await getDenunciasPorEmail()
    return denuncias
}

export const getDenunciasSync = async () => {
    const denuncias = await getDenuncias()
    return denuncias
}

export const getDenunciasPorProtocoloSync = async ({protocolo}) => {
    const denuncias = await getDenunciasPorProtocolo({protocolo})
    return denuncias
}

export const cadastroDenuncia = async ({ formData }) => {

    try {
        await addDoc(collection(db, 'denuncias'), formData);
        return {
            status: "success"
        }

    } catch (error) {
        console.error("Erro ao cadastrar denuncia: ", error);
        return {
            status: "error",
            message: error.message
        }
    }
}

export const atualizarDenuncia = async ({ protocolo, formData }) => {

    if(!protocolo || !formData) return ;

    try {
        const q = query(collection(db, "denuncias"), where("protocolo", "==", protocolo));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref;
            await updateDoc(docRef, formData);
        }

        return {
            status: "success"
        }

    } catch (error) {
        console.error("Erro ao atualizar denuncia: ", error);
        return {
            status: "error",
            message: error.message
        }
    }
}