class Auth {
    static authenticateUser({ token, user }) {
        window.localStorage.setItem('user', JSON.stringify(user));
        window.localStorage.setItem('token', token);
    }

    static getAuthenticatedUser() {
        const userJson = window.localStorage.getItem('user');

        return userJson ? JSON.parse(userJson) : {};
    }

    static isUserAuthenticated() {
        return !!window.localStorage.getItem('token');
    }

    static deauthenticateUser() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
    }

    static getToken() {
        return window.localStorage.getItem('token');
    }
}

export default Auth;
