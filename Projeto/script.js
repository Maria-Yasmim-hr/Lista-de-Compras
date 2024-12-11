const input = document.getElementById("itemInput");
const form = document.querySelector("form");
const list = document.getElementById("list");

input.addEventListener("input", () => {
  const onlyLettersRegex = /[0-9]+/g;
  input.value = input.value.replace(onlyLettersRegex, "");
});

form.onsubmit = (event) => {
  event.preventDefault();
};

document.addEventListener("DOMContentLoaded", () => {
  const backButton = document.querySelector(".button-back");

  if (backButton) {
    backButton.addEventListener("click", function () {
      window.location.href = "start.html";
    });
  }
});

document.getElementById("addItemButton").addEventListener("click", function () {
  const inputValue = input.value.trim();

  if (inputValue !== "") {
    const newItem = document.createElement("li");
    newItem.classList.add("list");

    const checkboxImg = document.createElement("img");
    checkboxImg.src = "assets/buttonUnchecked.svg";
    checkboxImg.classList.add("custom-checkbox");

    checkboxImg.addEventListener("click", function () {
      checkboxImg.src = checkboxImg.src.includes("buttonUnchecked.svg") 
        ? "assets/buttonChecked.svg" 
        : "assets/buttonUnchecked.svg";
    });

    const buttonRemove = document.createElement("button");
    buttonRemove.classList.add("remove-btn");

    const imgRemove = document.createElement("img");
    imgRemove.src = "assets/remove.svg";
    buttonRemove.appendChild(imgRemove);

    newItem.appendChild(checkboxImg);
    newItem.appendChild(document.createTextNode(inputValue));
    newItem.appendChild(buttonRemove);

    list.appendChild(newItem);

    input.value = "";

    buttonRemove.addEventListener("click", function () {
      newItem.remove();

      let messageContainer = document.getElementById("messageContainer");

      if (!messageContainer) {
        messageContainer = document.createElement("div");
        messageContainer.id = "messageContainer";
        document.querySelector("main").appendChild(messageContainer);
      }

      messageContainer.innerHTML = "";

      const imgAlert = document.createElement("img");
      imgAlert.src = "assets/alert.svg";

      const closeButton = document.createElement("button");
      closeButton.innerHTML = `<img src="assets/delete-small.png" alt="Fechar" class="close-btn" />`;

      closeButton.addEventListener("click", function () {
        messageContainer.style.display = "none";
      });

      messageContainer.appendChild(imgAlert);
      messageContainer.appendChild(document.createTextNode("O item foi removido da lista"));
      messageContainer.appendChild(closeButton);

      messageContainer.style.display = "flex";
      messageContainer.style.visibility = "visible";

      setTimeout(() => {
        messageContainer.style.display = "none";
      }, 3000);
    });
  } else {
    alert("Por favor, insira um item válido na lista de compras.");
  }
});
