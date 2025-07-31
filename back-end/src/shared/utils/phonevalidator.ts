
export const PhoneValidator = (phone: string): boolean => {
    // Verifica se contém apenas números
    let isValid = /^\d+$/.test(phone)
    console.log(phone, isValid)
    if (!isValid)
        return isValid
    const regex = /^(55)?([1-9]{2})(9?[0-9]{8})$/;
    return regex.test(phone)

};