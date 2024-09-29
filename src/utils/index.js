export function logout() {
    localStorage.removeItem('userData');
    window.location.href = '/login';
}

export function getUserData() {
    return JSON.parse(localStorage.getItem('userData'));
}

export function gerarProtocolo() {
    const numero = Math.floor(Math.random() * 1000000);
    
    const numeroComZeros = numero.toString().padStart(6, '0');
    
    return numeroComZeros;
}