
function extraiNumeros(texto) {
    const textoNaoEstruturado = texto;
    const regex = /\d+/g;
    return textoNaoEstruturado.match(regex).join('');
}

function insereMascaraCPF(texto){
    return texto.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,"$1.$2.$3-$4");
}

function validaCPF(texto) {

    cpf = extraiNumeros(texto);
    console.log(cpf.length);

    if (cpf.length != 11) {
        return false;
    } else {
        var numeros = cpf.substring(0, 9); // pega os 9 primeiros números
        var digitos = cpf.substring(9);    // remove os 9 primeiros números
        console.log('numeros: ' + numeros);
        console.log('digitos: ' + digitos);

        var soma = 0;
        for (var i = 10; i > 1; i--) {
            soma += numeros.charAt(10 -i) * i; // charAt(N) retorna o caractere na posição N da string
        }
        console.log(soma);

        var resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);  // igual ternária do php
        console.log('Resultado dígito 1: ' + resultado)

        // Validação do primeiro dígito
        if (resultado != digitos.charAt(0)) {
            return false;
        }
        
        soma = 0;
        numeros = cpf.substring(0, 10);

        for (var k = 11; k > 1; k--) {
            soma += numeros.charAt(11 - k) * k;
        }

        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        console.log('Resultado dígito 2: ' + resultado);

        // Validação do segundo dígito
        if (resultado != digitos.charAt(1)) {
            return false;
        }

        return true;
    }
}


function validacao() {
    console.log('Iniciando validação do cpf');
    var cpf = document.getElementById('cpf_digitado').value;
    document.getElementById('success').style.display = 'none';
    document.getElementById('error').style.display = 'none';
    var numerosCPF = extraiNumeros(cpf);
    var cpfComMascara = insereMascaraCPF(numerosCPF);

    var resultadoValidacao = validaCPF(cpf);
    if (resultadoValidacao) {
        document.getElementById('success').style.display = 'block';
        document.getElementById('cpfSuccess').innerText = cpfComMascara;
    } else {
        document.getElementById('error').style.display = 'block';
        document.getElementById('cpfError').innerText = cpfComMascara;
    }
}
