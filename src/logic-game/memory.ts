// OBTENER un valor desde el localStorage:
export const getLocalStorage = (key: string): string | null => {
    const value = localStorage.getItem(key);
    return value !== null ? value : null;
};

// GUARDAR o ACTUALIZAR un valor en el localStorage:
export const setLocalStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
};