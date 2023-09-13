const signUpButton = document.getElementById("signUp");
const signInpButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () =>
  container.classList.add("right-panel-active")
);

signInpButton.addEventListener("click", () =>
  container.classList.remove("right-panel-active")
);
