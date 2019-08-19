export default function getLoggedInUser() {
    return typeof window !== `undefined` && window.netlifyIdentity ? window.netlifyIdentity.currentUser() : null;
}