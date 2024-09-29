export function logout() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    window.location.href = '/login';
}

export function getNameLogin() {
    return localStorage.getItem('userName');
}