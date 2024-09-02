export const saveUserToStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

export const getUserFromStorage = () => {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
};

export const clearUserFromStorage = () => {
    localStorage.setItem('user', null);
};