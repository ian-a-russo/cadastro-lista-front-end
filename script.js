import {
  deleteUser,
  addUser,
  getAllUsers,
  editUser,
  editInput,
  clearInput,
} from "./clientHttp.mjs";

document.addEventListener("DOMContentLoaded", async function () {
  const buttonCadastro = document.getElementById("botaoCadastro");
  buttonCadastro.addEventListener("click", function () {
    const dialogCadastrar = document.getElementById("dialogCadastrar");
    dialogCadastrar.show();
    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";
  });

  const buttonConfirmar = document.getElementById("botaoConfirmar");
  buttonConfirmar.addEventListener("click", async function () {
    const dialogCadastrar = document.getElementById("dialogCadastrar");
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    if (nome && email && telefone) {
      dialogCadastrar.close();
      let ballon = document.getElementById("ballon");
      let textBallon = document.getElementById("textBallon");
      await addUser(nome, email, telefone);
      ballon.show();
      setTimeout(() => {
        textBallon.textContent = "Usuário Cadastrado com Sucesso!";
      }, 2000);
      setTimeout(() => {
        ballon.close();
      }, 2000);
      textBallon.textContent = "";
      return;
    }
    return alert("Erro ao cadastrar o usuário!");
  });

  const tabelaElementos = document.getElementById("tabelaElementos");
  tabelaElementos.addEventListener("click", async function (evento) {
    if (evento.target && evento.target.classList.contains("edit")) {
      const dialogEditar = document.getElementById("dialogEditar");
      const linhaTabela = evento.target.closest("tr");
      const id = linhaTabela.getAttribute("data-id");
      dialogEditar.show();

      const buttonAlterar = document.getElementById("botaoAlterar");
      const cloneButtonAlterar = buttonAlterar.cloneNode(true);
      buttonAlterar.parentNode.replaceChild(cloneButtonAlterar, buttonAlterar);

      cloneButtonAlterar.addEventListener("click", async () => {
        const dialogEditar = document.getElementById("dialogEditar");
        const novoNome = document.getElementById("alterarNome").value;
        const novoEmail = document.getElementById("alterarEmail").value;
        const novoTelefone = document.getElementById("alterarTelefone").value;
        if (novoNome && novoEmail && novoTelefone) {
          dialogEditar.close();
          let ballon = document.getElementById("ballon");
          let textBallon = document.getElementById("textBallon");
          ballon.show();
          setTimeout(() => {
            textBallon.textContent = "Usuário Alterado com Sucesso!";
          }, 2000);
          setTimeout(() => {
            ballon.close();
          }, 2000);
          textBallon.textContent = "";
          await editUser(novoNome, novoEmail, novoTelefone, id);
          await getAllUsers();
          clearInput();
          return;
        }
        return alert("Erro ao alterar o usuário!");
      });
      await editInput(id);
    }
  });

  await getAllUsers();
});
