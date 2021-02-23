export default function getLoggedUserToken() {
    return `Bearer ${localStorage.getItem('accessToken') || ''}`
}
