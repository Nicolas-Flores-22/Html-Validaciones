export function valida(input){
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]) validadores[tipoInput](input);

    if(input.validity.valid) {
        input.parentElement.classList.remove('input-container--invalid')
        input.parentElement.querySelector('.input-message-error').innerHTML = '';

    } else {
        input.parentElement.classList.add('input-container--invalid')
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoInput, input);
    }
}

const tipodeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'customError',
]

const mensajesDeError = {
    nombre: {
        valueMissing: 'El campo nombre no puede estar vacío.',
    },
    
    email: {
        valueMissing: 'El campo correo no puede estar vacío.',
        typeMismatch: 'Este campo debe ser un email válido.',
    },

    password: {
        valueMissing: 'El campo contraseña no puede estar vacío.',
        patternMismatch: 'Al menos 6 caracteres, máximo 12. Debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.',
    },

    nacimiento: {
        valueMissing: 'Este campo no puede estar vacío.',
        customError: 'Debes tener al menos 18 años de edad',
    },

    numero: {
        valueMissing: 'Este campo no puede estar vacío.',
        patternMismatch: 'El formato requerido es xxxxxxxxx (9 números).',

    },

    direccion:{
        valueMissing: 'Este campo no puede estar vacío.',
        patternMismatch: 'La dirección debe contener entre 10 y 40 caracteres.',
    },

    departamento:{
        valueMissing: 'Este campo no puede estar vacío.',
        patternMismatch: 'El departamento debe contener entre 3 y 40 caracteres.',
    },

    provincia:{
        valueMissing: 'Este campo no puede estar vacío.',
        patternMismatch: 'La provincia debe contener entre 3 y 40 caracteres.',
    },

    distrito:{
        valueMissing: 'Este campo no puede estar vacío.',
        patternMismatch: 'El distrito debe contener entre 3 y 40 caracteres.',
    },
}

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoInput, input){
    let mensaje = "";

    tipodeErrores.forEach(error => {
        if(input.validity[error]){
            mensaje = mensajesDeError[tipoInput][error];
        }
    });

    return mensaje;
}

function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';

    if (!mayorDeEdad(fechaCliente)) mensaje = 'Debes tener al menos 18 años de edad';

    input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );

    return diferenciaFechas <= fechaActual;
};