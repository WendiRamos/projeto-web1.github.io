function enviarContato() {
  const nome = $("#nome").val().trim();
  const email = $("#email").val().trim();
  const mensagem = $("#mensagem").val().trim();

  function isNomeValido(nome) {
    return nome.length >= 2 && nome.length <= 150;
  }

  function isEmailValido(email) {
    const re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
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
