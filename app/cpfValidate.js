export default function cpfValidate(field) {
    //const cpf = field.value.replace(/\.|-/g, '');
    const cpf = field.value.replace(/[^a-zA-Z0-9]/g, '');
    if(validateRepeatedNumbers(cpf) || validateFirstDigit(cpf) || validateSecondDigit(cpf)) {
        field.setCustomValidity('Esse CPF não existe');
    } 

}

function validateRepeatedNumbers(cpf) {
   
    const repeatedNumbers = [];
    for(let i = 0; i <= cpf.length; i++) {
        i = i.toString();
        repeatedNumbers.push(i + i + i + i + i + i + i + i + i + i + i);
    }

    return repeatedNumbers.includes(cpf);

     /* const repeatedNumbers = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ] */

}

function validateFirstDigit(cpf) {
    let sum = 0;
    let multiplier = 10;

    for(let size = 0; size < 9; size++) {
        sum += cpf[size] * multiplier;
        multiplier--;
    }

    sum = (sum * 10) % 11;

    if(sum == 10 || sum == 11) {
        sum = 0;
    }

    // sum é o primeiro dígito verificador de um cpf

    return sum != cpf[9];
}

function validateSecondDigit(cpf) {
    let sum = 0;
    let multiplier = 11;

    for(let size = 0; size < 10; size++) {
        sum += cpf[size] * multiplier;
        multiplier--;
    }

    sum = (sum * 10) % 11;

    if(sum == 10 || sum == 11) {
        sum = 0;
    }

    // sum é o segundo dígito verificador de um cpf

    return sum != cpf[10];
}