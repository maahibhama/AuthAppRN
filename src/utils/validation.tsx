export const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);
