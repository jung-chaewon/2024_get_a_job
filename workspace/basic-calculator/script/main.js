const buttonsEl = document.querySelectorAll("button");
const inputFieldEl = document.getElementById("result");

for (let i = 0; 1 < buttonsEl.length; i++) {
    buttonsEl[i].addEventListener("click", () => {
        const buttonValue = buttonsEl[i].textContent;
        if (buttonValue === "C") {
            clearResult();
        } else if (buttonValue === "=") {
            calculateResult();
        } else {
            appendValue(buttonValue);
        }
    });
}
function clearResult() {
    inputFieldEl.value = "";
}
function calculateResult() {
    try {
        inputFieldEl.value = eval(inputFieldEl.value);
    } catch (error) {
        console.error("계산오류:", error)
        inputFieldEl.value = "오류";
    }
}
function appendValue(buttonValue) {
    inputFieldEl.value += buttonValue;
}