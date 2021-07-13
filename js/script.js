let mines = [];
let attempts = [];
numberSection = document.getElementById("number-section");
numberField = document.getElementById("number");
message = document.getElementById("message");
submitButton = document.getElementById("submit");
resetButton = document.getElementById("reset");

while (mines.length < 16) {
    const number = randomNumber();
    if (!mines.includes(number)) {
        mines.push(number);
    }
}
console.table(mines);

submitButton.addEventListener("click", function () {
    const userNumber = parseInt(numberField.value);
    if (isValid(userNumber)) {
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
            }
        }
    }
    console.table(attempts);
})
resetButton.addEventListener("click", function () {
    mines = [];
    attempts = [];
    while (mines.length < 16) {
        const number = randomNumber();
        if (!mines.includes(number)) {
            mines.push(number);
        }
    }
    message.innerHTML = "";
    numberField.value = ""
    numberSection.classList.remove("d-none");
    submitButton.classList.remove("d-none");
    resetButton.classList.add("d-none");
    console.table(mines);
})

function isValid(num) {
    if (num <= 0 || num > 100) {
        alert("Inserire un numero compreso tra 1 e 100");
        return false;
    }
    return true;
}
function randomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}