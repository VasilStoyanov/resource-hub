class Auth {
    /* eslint-disable */
    static authenticateUser({ token, user }) {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    }

    static getAuthenticatedUser() {
        const userJson = localStorage.getItem('user');

        return userJson ? JSON.parse(userJson) : {};
    }

    static isUserAuthenticated() {
        return !!localStorage.getItem('token');
    }

    static deauthenticateUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    static getToken() {
        return localStorage.getItem('token');
    }
}

export default Auth;