// Função para formatar telefone no formato (xx)xxxxx-xxxx
function formatPhoneNumber(value) {
    value = value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length <= 10) {
        // Formato (xx)xxxx-xxxx
        return value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1)$2-$3');
    } else {
        // Formato (xx)xxxxx-xxxx
        return value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1)$2-$3');
    }
}

// Função para formatar valores como moeda BRL
function formatCurrency(value) {
    let number = parseFloat(value.replace(/\D/g, '')) / 100;
    if (isNaN(number)) return '';
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Função para formatar valores percentuais
function formatPercentage(value) {
    value = value.replace(/[^\d.]/g, '');
    let number = parseFloat(value);
    if (isNaN(number)) return '';
    number = Math.max(0, Math.min(100, number));
    return number.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 4 }) + '%';
}

// Função para formatar entradas
function updateInput(input) {
    const id = input.id;
    if (id === 'telefone') {
        input.value = formatPhoneNumber(input.value);
    } else if (id === 'Crédito' || id === 'saldoDevedor') {
        input.value = formatCurrency(input.value);
    } else if (id === 'porcentagem') {
        input.value = formatPercentage(input.value);
    }
}

// Função para validar a data
function validateDate(input) {
    const minDate = new Date('2023-01-01');
    input.addEventListener('change', () => {
        const selectedDate = new Date(input.value);
        if (selectedDate < minDate) {
            input.setCustomValidity('A data deve ser posterior a 01/01/2023.');
        } else {
            input.setCustomValidity('');
        }
    });
}

// Adiciona eventos aos campos de entrada quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('telefone');
    const currencyInputs = document.querySelectorAll('#Crédito, #saldoDevedor');
    const percentageInput = document.getElementById('porcentagem');
    const dateInput = document.getElementById('encerramento_do_grupo');

    phoneInput.addEventListener('input', () => updateInput(phoneInput));
    currencyInputs.forEach(input => input.addEventListener('input', () => updateInput(input)));
    percentageInput.addEventListener('input', () => updateInput(percentageInput));
    validateDate(dateInput);
});
