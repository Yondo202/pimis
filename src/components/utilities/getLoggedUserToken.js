export default function getLoggedUserToken() {
    return `Bearer ${localStorage.getItem('edp_loggedUser')}` || null
}