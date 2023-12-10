//declara as variaveis
let botao = document.getElementById("botao");
let qr = new QRCode(document.getElementById("qr"));
let img = document.getElementById("img");
let header = document.getElementById("header");
const pheader = document.getElementById("textoheader");
let retirarPrint = document.getElementById("print");
const emais = document.getElementById(`emais`);
const dialog = document.querySelector("dialog");
let color1, color2, pequeno, grande, medio, check, input;
const botaoWifi = document.getElementById(`botaoWifi`);
const botaoTexto = document.getElementById("botaoTexto");





function gerarQrcode() {
  color1 = document.getElementById("color1").value;
  color2 = document.getElementById("color2").value;
  pequeno = document.getElementById(`pequeno`);
  grande = document.getElementById(`grande`);
  medio = document.getElementById(`medio`);
  check = document.getElementById("check");

  if (check.checked) {
    document.querySelector(`canvas`).style.overflow = `hidden`
    qr = new QRCode(document.getElementById("qr"), {
      text: input,
      colorDark: `white`,
      colorLight: color2,
      width: 150,
      height: 150,
    });

  } else if (pequeno.checked) { 
    qr = new QRCode(document.getElementById("qr"), {
      text: input,
      colorDark: color1,
      colorLight: color2,
      width: 200,
      height: 200,
    });
  } else if (grande.checked) {
 
  
    qr = new QRCode(document.getElementById("qr"), {
      text: input,
      colorDark: color1,
      colorLight: color2,
      width: 350,
      height: 350,
    });
  } else if (medio.checked) {
    
    qr = new QRCode(document.getElementById("qr"), {
      text: input,
      colorDark: color1,
      colorLight: color2,
      width: 300,
      height: 300,
    });
  } else {
   
    qr = new QRCode(document.getElementById("qr"), {
      text: input,
      colorDark: color1,
      colorLight: color2,
      width: 250,
      height: 250,
    });
  }
}



function mudarPlacelhoderParaEmail() {
  document.getElementById(`input`).placeholder = "Digite seu email";
}



function MostrarIconeEmail() {
  const email = (document.getElementById(`email`).style.display = `block`);
  return {email}
}

function ocultarEwifiEtexto() {
  document.getElementById("wifi").style.display = "none";
  document.getElementById("texto").style.display = "none";
}

function ocultarTextoEmail() {
  document.getElementById("texto").style.display = "none";
  document.getElementById("email").style.display = "none";;
}


function ocultarWifiEmail() {
  document.getElementById("wifi").style.display = "none";
  document.getElementById("email").style.display = "none";
}

function mostrarWifi() {
  const wifi = (document.getElementById(`wifi`).style.display = "block");
  return wifi;
}

function mudarPlacelhoderparaWifi() {
  document.getElementById("input").placeholder = "Digite sua senha do wifi";
}


botaoWifi.addEventListener("click", function () {
  mudarPlacelhoderparaWifi();
  ocultarEwifiEtexto();
  mostrarWifi();
});


function mostrarIconeTexto() {
  const texto = document.getElementById(`texto`).style.display = "block"
  return texto
}

function mudarPlacelhoderParaTexto() {
  document.getElementById(`input`).placeholder = "Digite um texto abaixo.";
}


botaoTexto.addEventListener(`click`, function () {
  mostrarIconeTexto();
  mudarPlacelhoderParaTexto();
  ocultarWifiEmail()
});


emais.addEventListener("click", function () {
  mudarPlacelhoderParaEmail();
  MostrarIconeEmail();
  ocultarEwifiEtexto();
});


botao.addEventListener("click", function () {
  input = document.getElementById("input").value;
  if (input === "") {
    mensagemDevazio();
  } else {
    gerarQrcode();
    exibirToastSucesso();
    sumirImg();
    botaoSumir();
    exibirPrint();
    abrirDiloag();
  }
});



function sumirImg() {
  img.style.display = "none";
}



function limpar() {
  document.getElementById("tela").innerHTML = "";
  img.style.display = "none";
}



function mensagemDevazio() {
  Swal.fire({
    title: "Campo vazio!",
    text: "Campo de entrada vazio, preencha com os dados!",
    icon: "error",
    confirmButtonText: "OK",
  });
}




//funcao para exibir a mensagem de sucesso.
function exibirToastSucesso() {
  Swal.fire({
    icon: "success",
    title: "Os dados irão aparecer logo abaixo😊.",
  });
}



function capturar() {
  html2canvas(document.getElementById("capture")).then(function (canvas) {
    let dataURL = canvas.toDataURL();
    let link = document.createElement(`a`);
    link.href = dataURL;
    link.download = "qrCode.png";
    link.click();
  });
}


function exibirPrint() {
  retirarPrint.style.display = "block";
}


retirarPrint.addEventListener("click", function () {
  capturar();
});



function abrirDiloag() {
  dialog.style.display = "block";
}


const fecharDialog = document.getElementById("fechardialog");
fecharDialog.addEventListener("click", function () {
  dialog.style.display = "none";
});

function botaoSumir() {
  botao.style.display = "none";
}
