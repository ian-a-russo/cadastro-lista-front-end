const SERVER_URL = "http://localhost:5500";

const deleteUser = async (id) => {
  try {
    const response = await fetch(`${SERVER_URL}/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Erro na requisição");
    }
    const result = await response.json();
    await getAllUsers();
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
  }
};

const getAllUsers = async () => {
  try {
    const response = await fetch("http://localhost:5500/users");

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const users = await response.json();
    console.log(users);
    const tabela = document.getElementById("tabelaElementos");
    tabela.innerHTML = "";

    users.forEach((user) => {
      const novaLinha = document.createElement("tr");
      novaLinha.setAttribute("data-id", user.id);

      const celulaName = document.createElement("td");
      celulaName.textContent = user.nome;

      const celulaEmail = document.createElement("td");
      celulaEmail.textContent = user.email;

      const celulaTelefone = document.createElement("td");
      celulaTelefone.textContent = user.telefone;

      const celulaApagar = document.createElement("td");
      celulaApagar.textContent = "🗑️";
      celulaApagar.addEventListener("click", async () => {
        await deleteUser(user.id);
        ballon.show();
        setTimeout(() => {
          textBallon.textContent = "Usuário Deletado com Sucesso!";
        }, 2000);
        setTimeout(() => {
          ballon.close();
        }, 5000);
        textBallon.textContent = "";
      });

      const celulaEditar = document.createElement("td");
      celulaEditar.textContent = "✏️";
      celulaEditar.classList.add("edit");
      celulaEditar.addEventListener(
        "click",
        async () => await editInput(user.id)
      );

      novaLinha.appendChild(celulaName);
      novaLinha.appendChild(celulaEmail);
      novaLinha.appendChild(celulaTelefone);
      novaLinha.appendChild(celulaApagar);
      novaLinha.appendChild(celulaEditar);
      tabela.appendChild(novaLinha);
    });
  } catch (error) {
    console.error("Erro ao obter usuários:", error);
  }
};

const addUser = async (nome, email, telefone) => {
  try {
    const response = await fetch(`${SERVER_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, telefone }),
    });

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }
    const newUser = await response.json();
    await getAllUsers();
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
  }
};

const editUser = async (novoNome, novoEmail, novoTelefone, id) => {
  try {
    const alteracoes = {
      nome: novoNome,
      email: novoEmail,
      telefone: novoTelefone,
    };

    const response = await fetch(`${SERVER_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(alteracoes),
    });

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }

    const data = await response.json();
    await getAllUsers();
  } catch (error) {
    console.error("Erro ao alterar usuário:", error);
  }
};

const editInput = async (id) => {
  try {
    const response = await fetch(`http://localhost:5500/users`);

    if (!response.ok) {
      throw new Error("Erro na requisição");
    }
    const users = await response.json();
    const user = users.find((u) => u.id === id);
    if (user) {
      document.querySelector("#alterarNome").value = user.nome;
      document.querySelector("#alterarEmail").value = user.email;
      document.querySelector("#alterarTelefone").value = user.telefone;
    }
  } catch (error) {
    console.error("Erro ao obter dados do usuário:", error);
  }
};

const clearInput = () => {
  document.querySelector("#alterarNome").value = "";
  document.querySelector("#alterarEmail").value = "";
  document.querySelector("#alterarTelefone").value = "";
};

export { deleteUser, getAllUsers, addUser, editUser, clearInput, editInput };
