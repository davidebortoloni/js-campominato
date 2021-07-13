numberSection = document.getElementById("number-section");
numberField = document.getElementById("number");
difficultySection = document.getElementById("difficulty-section");
difficultyButton = document.getElementById("start");
submitButton = document.getElementById("submit");
resetButton = document.getElementById("reset");
message = document.getElementById("message");
let total;
let mines = [];
let attempts = [];

difficultyButton.addEventListener("click", function () {
    switch (displayRadioValue("difficulty")) {
        case "easy":
            total = 100;
            break;
        case "medium":
            total = 80;
            break;
        case "hard":
            total = 50;
            break;
    }
    mines = [];
    attempts = [];

    fillMines(mines);

    difficultySection.classList.add("d-none");
    difficultyButton.classList.add("d-none");
    numberSection.classList.remove("d-none");
    submitButton.classList.remove("d-none");
    numberField.value = "1";
    numberField.max = total;
})
submitButton.addEventListener("click", function () {
    const userNumber = parseInt(numberField.value);
    if (isValid(userNumber, total)) {
        if (mines.includes(userNumber)) {
            message.innerHTML = "Hai perso! Punteggio: " + attempts.length * 10;
            numberSection.classList.add("d-none");
            submitButton.classList.add("d-none");
            resetButton.classList.remove("d-none");
        } else {
            if (attempts.includes(userNumber)) {
                message.innerHTML = "Numero già scelto";
            } else {
                message.innerHTML = "Mina schivata";
                attempts.push(userNumber);
                if (attempts.length === (total) - (mines.length)) {
                    message.innerHTML = "Grande, punteggio massimo! <br>" + attempts.length * 10 + " punti";
                    numberSection.classList.add("d-none");
                    submitButton.classList.add("d-none");
                    resetButton.classList.remove("d-none");
                }
            }
        }
    }
})
resetButton.addEventListener("click", function () {
    message.innerHTML = "";
    difficultySection.classList.remove("d-none");
    difficultyButton.classList.remove("d-none");
    resetButton.classList.add("d-none");
})


function displayRadioValue(name) {
    var ele = document.getElementsByName(name);
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            return ele[i].value;
        }
    }
}
function fillMines(mines) {
    while (mines.length < 16) {
        const number = randomNumber();
        if (!mines.includes(number)) {
            mines.push(number);
        }
    }
}
function randomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
function isValid(num, total) {
    if (num <= 0 || num > total) {
        alert("Inserire un numero compreso tra 1 e " + total);
        return false;
    }
    return true;
}