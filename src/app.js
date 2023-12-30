
let botao = document.getElementById("botao");
let qr = new QRCode(document.getElementById("qr"));
let img = document.getElementById("img");
let header = document.getElementById("header");
const pheader = document.getElementById("textoheader");
let retirarPrint = document.getElementById("print");
const emais = document.getElementById(`emais`);
const dialog = document.getElementById("projeto");
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
    gerarQrCheck();
  } else if (pequeno.checked) {
    gerarQrCodePequeno();
  } else if (grande.checked) {
    gerarQrCodeGrande();
  } else if (medio.checked) {
    gerarQrCodeMedio();
  } else {
    gerarQrcodeNormal();

  }
}

const gerarQrCheck = () => {
  document.getElementById("print").style.width = "150px";
  qr = new QRCode(document.getElementById("qr"), {
    text: input,
    colorDark: `white`,
    colorLight: color2,
    width: 150,
    height: 150,
  });
};



const gerarQrcodeNormal = () => {
  qr = new QRCode(document.getElementById("qr"), {
    text: input,
    colorDark: color1,
    colorLight: color2,
    width: 250,
    height: 250,
  });
}


const gerarQrCodeMedio = () => {
  document.getElementById("print").style.width = "300px";
  qr = new QRCode(document.getElementById("qr"), {
    text: input,
    colorDark: color1,
    colorLight: color2,
    width: 300,
    height: 300,
  });
};

const gerarQrCodeGrande = () => {
  document.getElementById("print").style.width = "300px";
  qr = new QRCode(document.getElementById("qr"), {
    text: input,
    colorDark: color1,
    colorLight: color2,
    width: 350,
    height: 350,
  });
};


const gerarQrCodePequeno = () => {
  document.getElementById("print").style.width = "200px";
  qr = new QRCode(document.getElementById("qr"), {
    text: input,
    colorDark: color1,
    colorLight: color2,
    width: 200,
    height: 200,
  });
};


function mudarPlacelhoderParaEmail() {
  document.getElementById(`input`).placeholder = "Digite seu email";
}

function MostrarIconeEmail() {
  const email = (document.getElementById(`email`).style.display = `block`);
  return { email };
}

function ocultarEwifiEtexto() {
  document.getElementById("wifi").style.display = "none";
  document.getElementById("texto").style.display = "none";
}

function ocultarTextoEmail() {
  document.getElementById("texto").style.display = "none";
  document.getElementById("email").style.display = "none";
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
  const texto = (document.getElementById("texto").style.display = "block");
  return texto;
}

function mudarPlacelhoderParaTexto() {
  document.getElementById("input").placeholder = "Digite um texto abaixo.";
}


botaoTexto.addEventListener(`click`, function () {
  mostrarIconeTexto();
  mudarPlacelhoderParaTexto();
  ocultarWifiEmail();
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
    mostrarPdf();
  }
});


const sumirImg = () => img.style.display = "none";

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



const exibirPrint = () => (retirarPrint.style.display = "block");

retirarPrint.addEventListener("click", function () {
  capturar();
});


const mostrarPdf = () =>
  (document.getElementById("pdf").style.display = "block");


const abrirDiloag = () => (dialog.style.display = "block");


const fecharDialog = document.getElementById("fechardialog");
fecharDialog.addEventListener("click", function () {
  dialog.style.display = "none";
});


const gerarPdf = () => {
  let options = {
    margin: 10,
    filename: "qrCode.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: {
      unit: "px",
      format: [380, 380],
      orientation: "portrait",
    },
  };

  html2pdf()
    .from(document.getElementById("capture"))
    .set(options)
    .outputPdf(function (pdf) {})
    .save();
};




const botaoSumir = () => botao.remove();


document.getElementById(`pdf`).addEventListener(`click`, function() {
  gerarPdf()
})


addEventListener("keydown",function(a) {
  if (a.key === "a") {
   document.getElementById("check").click()
  }
})



addEventListener("keydown",function(b) {
  if (b.key === "b") {
    document.getElementById("pequeno").click()
  }
})



addEventListener("keydown",function(c) {
  if (c.key === "c") {
    document.getElementById("grande").click()
  }
})


addEventListener("keydown", function(d) {
  if (d.key === "d") {
    document.getElementById("medio").click()
  }
})



addEventListener("keydown", function(e) {
  if (e.key === "e") {
   document.getElementById("botaoWifi").click()
  }
})


addEventListener("keydown", function(f) {
  if (f.key === "f") {
    emais.click()
  }
})


addEventListener("keydown", function(g) {
  if (g.key === "g") {
    document.getElementById("botaoTexto").click()
  }
})


addEventListener("keydown", function(y) {
  if (y.key === "y") {
    botao.click()
  }
})



addEventListener("keydown", function (i) {
  if (i.key === "i") {
    capturar();
  }
});


addEventListener("keydown", function (j) {
  if (j.key === "j") {
    gerarPdf();
  }
});



const divHistorico = document.getElementById("historico");
let historicoDialog = document.getElementById("historicoDiloag");
divHistorico.addEventListener("click", function () {
  const abrirHistorico = () => {
    historicoDialog.style.display = "block";
  };
  
  abrirHistorico();
});


const fecharHistorico = document.getElementById("fecharHistorico");
fecharHistorico.addEventListener("click", function () {
  const fecharHistoricoDialog = () => {
    historicoDialog.style.display = "none";
  };
  fecharHistoricoDialog();
});


