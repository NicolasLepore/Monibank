import cpfValidate from "./cpfValidate.js";
import legalAge from "./ageValidate.js";

const requiredFields = document.querySelectorAll('[required]');

requiredFields.forEach((field) => {
    field.addEventListener('blur', () => fieldCheck(field));
    field.addEventListener('invalid', event => event.preventDefault());
})

const errorsType = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const messages = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function fieldCheck(field) {
    let msg = '';
    field.setCustomValidity('');

    if(field.name == 'cpf' && field.value.length >= 11) {
        cpfValidate(field);
    }
    
    if(field.name == 'aniversario' && field.value != '') {
        legalAge(field);
    }

    errorsType.forEach(error => {
        if(field.validity[error]) {
            msg = messages[field.name][error];
        }
    })

    const errorElement = field.parentNode.querySelector('.mensagem-erro');
    const inputValidity = field.checkValidity();

    !inputValidity ? errorElement.innerText = msg : errorElement.innerText = '';

}

const form = document.querySelector('[data-formulario]');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const userData = {
        name: e.target.elements.nome.value,
        email: e.target.elements.email.value,
        rg: e.target.elements.rg.value,
        cpf: e.target.elements.cpf.value.replace(/[^a-zA-Z0-9]/g, ''),
        aniversario: e.target.elements.aniversario.value
    };

    localStorage.setItem('User-Acc', JSON.stringify(userData));

    window.location.href = './abrir-conta-form-2.html';
}); 