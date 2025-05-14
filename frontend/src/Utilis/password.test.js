/**
 * This function checks if the password contains lower case
 * upper case,special char, number and a length of 8
 * using regex
 */

export const isPasswordStrong = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(password);
}