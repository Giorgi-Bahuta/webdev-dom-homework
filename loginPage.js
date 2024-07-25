import { login, setName, setToken } from "./api.js";
import { fetchAndRenderComments } from "./main.js";

export const loginPage = () => {
  const loginForm = `<div id="commentDiv" class="add-form">
        <div class="">Форма входа</div>
        <input
          id="name-input"
          type="text"
          class="authorization-login"
          placeholder="Введите логин"
        />
        <input
          id="name-input"
          type="text"
          class="authorization-password"
          placeholder="Введите пароль"
        />
        <div class="authorization-row">
          <button id="button" class="authorization-button">Войти</button>
        </div>

      </div>`;

  const conteinerText = document.getElementById("app");
  conteinerText.innerHTML = loginForm;

  const authButtonElement = document.querySelector(".authorization-button");
  const loginInputElement = document.querySelector(".authorization-login");
  const passwordInputElement = document.querySelector(
    ".authorization-password"
  );

  authButtonElement.addEventListener("click", () => {
    const loginValue = loginInputElement.value;
    const passwordValue = passwordInputElement.value;

    loginInputElement.classList.remove("error");
    passwordInputElement.classList.remove("error");

    if (loginInputElement.value === "" && passwordInputElement.value === "") {
      loginInputElement.classList.add("error");
      passwordInputElement.classList.add("error");
      return;
    } else if (loginInputElement.value === "") {
      loginInputElement.classList.add("error");
      return;
    } else if (passwordInputElement.value === "") {
      passwordInputElement.classList.add("error");
      return;
    }

    if (loginValue.includes(" ") || passwordValue.includes(" ")) {
      alert("Логин не должен содержать пробелы");
      return;
    }

    login({
      login: loginValue,
      password: passwordValue,
    }).then((responseData) => {
      console.log(responseData);
      setToken(responseData.user.token);
      setName(responseData.user.name);
      fetchAndRenderComments();
    });
  });
};
