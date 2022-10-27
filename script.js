let criptografiaSelect = document.querySelector('select[name="criptografia"]');

criptografiaSelect.addEventListener('change', function (evento) {

  let incrementoContainer = document.getElementById('incrementoContainer')

  if (evento.target.value == 'cifra') {

    incrementoContainer.style = 'display: block';
  } else {

    incrementoContainer.style = 'display: none';
  }
});

let acaoRadios = document.querySelectorAll('input[name="acao"]');

acaoRadios.forEach(radio => {
  radio.addEventListener('change', function (evento) {
    let buttonSubmit = document.querySelector('button[type="submit"]');

    if (evento.target.value == 'codificar') {
      buttonSubmit.innerHTML = 'Codificar Mensagem';
    } else {
      buttonSubmit.innerHTML = 'Decodificar Mensagem'
    }
  });
});

let formulario = document.forms.formCriptografia;

formulario.addEventListener('submit', function (evento) {

  evento.preventDefault();

  let mensagem = formulario.mensagem.value;
  let criptografia = formulario.criptografia.value;
  let incremento = formulario.incremento.value;
  let acao = formulario.acao.value;

  let resultado = '';

  if (criptografia == 'base64') {
    resultado = base64(acao, mensagem);
  } else {
    resultado = cesar(acao, mensagem, incremento);
  }

  let resultadoContainer = document.getElementById('resultado');
  resultadoContainer.innerHTML = `
    <h1>Resultado:</h1>
    ${resultado}
  `;

  formulario.reset();
});

function base64(acao, mensagem) {
  if (acao == 'codificar') {
    return btoa(mensagem);
  } else {
    return atob(mensagem);
  }
}

function cesar(acao, mensagem, incremento) {
  incremento = Number(incremento);

  let resultado = '';

  for (let i = 0; i < mensagem.length; i++) {
    let letra = mensagem[i];
    let code = letra.charCodeAt();

    if (acao == 'codificar') {
      code += incremento;
    } else {
      code -= incremento;
    }

    resultado += String.fromCharCode(code);
  }

  return resultado;
}
