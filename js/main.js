var canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var stars = [], // Matriz que contém as estrelas
  FPS = 60, // Quadros por segundo
  x = 120, // Número de estrelas
  mouse = {
    x: 0,
    y: 0,
  }; // localização do mouse

// Empurre as estrelas para a matriz
for (var i = 0; i < x; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1 + 1,
    vx: Math.floor(Math.random() * 50) - 25,
    vy: Math.floor(Math.random() * 50) - 25,
  });
}

// Desenhe a estrelas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.globalCompositeOperation = "lighter";

  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];

    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.stroke();
  }

  ctx.beginPath();
  for (var i = 0, x = stars.length; i < x; i++) {
    var starI = stars[i];
    ctx.moveTo(starI.x, starI.y);
    if (distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
    for (var j = 0, x = stars.length; j < x; j++) {
      var starII = stars[j];
      if (distance(starI, starII) < 150) {
        //ctx.globalAlpha = (1 / 150 * distance(starI, starII).toFixed(1));
        ctx.lineTo(starII.x, starII.y);
      }
    }
  }
  ctx.lineWidth = 0.05;
  ctx.strokeStyle = "white";
  ctx.stroke();
}

function distance(point1, point2) {
  var xs = 0;
  var ys = 0;

  xs = point2.x - point1.x;
  xs = xs * xs;

  ys = point2.y - point1.y;
  ys = ys * ys;

  return Math.sqrt(xs + ys);
}

// Atualizar localização de estrelas
function update() {
  for (var i = 0, x = stars.length; i < x; i++) {
    var s = stars[i];

    s.x += s.vx / FPS;
    s.y += s.vy / FPS;

    if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
    if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
  }
}

// Atualizar e desenhar
function tick() {
  draw();
  update();
  requestAnimationFrame(tick);
}
tick();

function enviarContato() {
  const nome = $("#nome").val().trim();
  const email = $("#email").val().trim();
  const mensagem = $("#mensagem").val().trim();

  function isNomeValido(nome) {
    return nome.length >= 2 && nome.length <= 150;
  }

  function isEmailValido(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function isMsgValido(mensagem) {
    return mensagem.length >= 5 && mensagem.length <= 600;
  }

  if (!isNomeValido(nome)) {
    Swal.fire("Erro!", "Insira um nome válido.", "error");
    return false;
  }

  if (!isEmailValido(email)) {
    Swal.fire("Erro!", "Insira um e-mail válido.", "error");
    return false;
  }

  if (!isMsgValido(mensagem)) {
    Swal.fire("Erro!", "Insira uma mensagem válida.", "error");
    return false;
  }

  $.ajax({
    method: "POST",
    url: "https://formsubmit.co/ajax/wendiramos12@gmail.com",
    dataType: "json",
    accepts: "application/json",
    data: {
      nome: nome,
      email: email,
      mensagem: mensagem,
    },
    success: () => {
      $("#nome").val("");
      $("#email").val("");
      $("#mensagem").val("");
      Swal.fire(
        "Sua mensagem foi enviada!",
        "Obrigada pelo contato.",
        "success"
      );
    },
    error: () =>
      Swal.fire(
        "Sua mensagem não foi enviada!",
        "Ocorreu um erro. Tente novamente mais tarde.",
        "error"
      ),
  });
}
