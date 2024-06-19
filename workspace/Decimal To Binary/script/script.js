function convert() {
    let to_convert = parseFloat(document.getElementById("to_convert").value);
    
    function decimalToBinary(number) {
        if (number === 0) {
            return "0";
        }
        let binary = "";
        while (number > 0) {
            binary = (Math.floor(number % 2)).toString() + binary;
            number = Math.floor(number / 2);
        }
        return binary;
    }
    
    let binaryResult = decimalToBinary(to_convert);

    document.getElementById("res").value = binaryResult;
}
