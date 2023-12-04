//declara as variaveis
let botao = document.getElementById("botao");
let qr = new QRCode(document.getElementById("qr"));
let img = document.getElementById("img");
let check = document.getElementById("check");
let header = document.getElementById("header");
const pheader = document.getElementById("textoheader");
const esconder = document.getElementById("esconder");
let retirarPrint = document.getElementById("print");

const dialog = document.querySelector("dialog"); // Note que as aspas estão corrigidas

//chama as funcoes pra quando clicar no botao
botao.addEventListener("click", function () {
  let input = document.getElementById("input").value;
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

function abrirDiloag() {
    dialog.style.display = `block`
}

const fecharDialog = document.getElementById("fechardialog");


fecharDialog.addEventListener("click", function () {
  dialog.style.display =`none`
});



function esconderTexto() {
  const textos = document.getElementById("textos");
  if (textos.style.display === "none") {
    textos.style.display = "block";
  } else {
    textos.style.display = "none";
  }
}

esconder.addEventListener("click", function () {
  esconderTexto();
});

//cria uma funcao no scroll para quando rolar ficar trasnaparente.

function media() {
  if (matchMedia("(max-width: 768px)").matches) {
    onscroll = function () {
      let menu = document.getElementById("label");
      if (
        document.body.scroll > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        header.style.backgroundColor = "transparent";
        menu.style.color = "black";
        pheader.style.display = "none";
      } else {
        header.style.backgroundColor = "white";
        menu.style.color = "black";
        pheader.style.display = "block";
      }
    };
  }
}

media();

addEventListener("resize", media());

//cria uma funcao para o botao sumir
function botaoSumir() {
  botao.style.display = "none";
}

//cria uma funcao que gera o qrcode
function gerarQrcode() {
  let input = document.getElementById(`input`).value;
  const color1 = document.getElementById("color1").value;
  const color2 = document.getElementById("color2").value;

  const pequeno = document.getElementById(`pequeno`);
  const grande = document.getElementById(`grande`);
  const medio = document.getElementById(`medio`);

  if (check.checked) {
    qr = new QRCode(document.getElementById("qr"), {
      text: input,
      colorDark: `white`,
      colorLight: color2,
    });
  } else if (pequeno.checked) {
    qr = new QRCode(document.getElementById("qr"), {
      text: input,
      colorDark: color1,
      colorLight: color2,
      width: 100,
      height: 100,
    });
  } else if (grande.checked) {
    qr = new QRCode(document.getElementById("qr"), {
      text: input,
      colorDark: color1,
      colorLight: color2,
      width: 400,
      height: 400,
    });
  } else if (medio.checked) {
    qr = new QRCode(document.getElementById("qr"), {
      text: input,
      colorDark: color1,
      colorLight: color2,
      width: 300,
      height: 300,
    });
  }
}

//cria uma funcao que some a imagem
function sumirImg() {
  img.style.display = "none";
}

//cria uma funcao que limpa
function limpar() {
  document.getElementById("tela").innerHTML = "";
  img.style.display = "none";
}

//funcao para aparecer a mensagem de vazio.
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
  html2canvas(document.getElementById("qr")).then(function(canvas) {
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

retirarPrint.addEventListener("click", function() {
  capturar();
});