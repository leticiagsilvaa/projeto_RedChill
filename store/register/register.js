function validarCadastro() {
  const nome = document.getElementById("nome").value;
  const data = document.getElementById("data").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!nome || !data || !cpf || !email || !password) {
    alert("Por favor, preencha todos os campos.");
    return false;
  }

  if (!validarNome()) {
    return false;
  }

  if (!/\d{3}\.\d{3}\.\d{3}-\d{2}/.test(cpf)) {
    alert("Por favor, informe um CPF válido no formato 000.000.000-00.");
    return false;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert("Por favor, informe um e-mail válido.");
    return false;
  }

  if (password.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    return false;
  }

  if (password.length > 10) {
    alert("A senha deve ter menos que 10 caracteres.");
    return false;
  }

  return true;
}

function validarNome() {
  const nome = document.getElementById("nome");
  const nomeError = document.getElementById("nome-error");
  if (nome.value.length < 3) {
    nomeError.textContent = "Por favor, informe um nome válido";
    return false;
  } else {
    nomeError.textContent = "";
    return true;
  }
}

function cadastrar() {
  if (!validarCadastro()) {
    return;
  }

  const nome = document.getElementById("nome").value;
  const data = document.getElementById("data").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const storedUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


  const usuarioExistente = storedUsuarios.some((usuario) => usuario.email === email || usuario.cpf === cpf);

  if (usuarioExistente) {
    alert("Já existe um usuário com o mesmo e-mail ou CPF cadastrado.");
    return;
  }

  const usuario = {
    nome: nome,
    data: data,
    cpf: cpf,
    email: email,
    password: password,
  };


  storedUsuarios.push(usuario);

  localStorage.setItem("usuarios", JSON.stringify(storedUsuarios));

  alert("Cadastrado com sucesso! Você será redirecionado para o Login.");
  window.location.href = "../login/login.html";
}

const form = document.querySelector(".login__form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const storedUsuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


  const usuario = storedUsuarios.find((user) => user.email === email && user.password === password);

  if (usuario) {
    window.location.href = "../home/home.html";
  } else {
    alert("E-mail ou senha inválidos!");
  }
});
  

  






  