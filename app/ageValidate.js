export default function legalAge(field) {
    const dateOfBirth = new Date(field.value);
    if(!ageValidate(dateOfBirth)) {
        field.setCustomValidity('O usuario não é maior de idade');
    }
}

function ageValidate(date) {
    const currentDate = new Date();
    const datePlus18 = new Date(date.getUTCFullYear() + 18, date.getUTCMonth(), date.getUTCDate());

    return currentDate >= datePlus18;
}