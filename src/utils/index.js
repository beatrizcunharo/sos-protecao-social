import { db } from '../firebaseConnection';
import { collection, query, where, getDocs } from 'firebase/firestore';

export function logout() {
    localStorage.removeItem('userData');
    window.location.href = '/login';
}

export function getUserData() {
    return JSON.parse(localStorage.getItem('userData')) || {};
}

export function gerarProtocolo() {
    const numero = Math.floor(Math.random() * 1000000);
    
    const numeroComZeros = numero.toString().padStart(6, '0');
    
    return numeroComZeros;
}

export const getDenunciasPorEmail = async () => {
    const {email} = getUserData();

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

export const getDenunciasPorEmailSync = async () => {
    const denuncias = await getDenunciasPorEmail()
    return denuncias
}

export const getDenunciasSync = async () => {
    const denuncias = await getDenuncias()
    return denuncias
}