// 가위바위보 게임 함수
function rpsGame(humanChoice) {
    let myChoice = number(humanChoice); // 인간의 선택을 숫자로 변환
    let comChoice = random(); // 컴퓨터의 선택을 랜덤으로 생성
    let final = result(myChoice, comChoice); // 결과를 계산
    // 결과 메시지를 화면에 출력
    document.getElementById("message").innerHTML = `Human choice is ${str(myChoice)} and Computer choice is ${str(comChoice)} <br> ${final}`;
}

// 랜덤으로 0, 1, 2 반환 (컴퓨터의 선택)
function random() {
    return Math.floor(Math.random() * 3);
}

// 문자열 입력을 숫자로 변환 (Rock: 0, Paper: 1, Scissors: 2)
function number(word) {
    if (word == "Rock") {
        return 0;
    } else if (word == "Paper") {
        return 1;
    } else if (word == "Scissors") {
        return 2;
    }
}

// 숫자를 문자열로 변환 (0: Rock, 1: Paper, 2: Scissors)
function str(number) {
    if (number == 0) {
        return "Rock";
    } else if (number == 1) {
        return "Paper";
    } else if (number == 2) {
        return "Scissors";
    }
}

// 게임 결과를 계산 (비김, 인간 승리, 컴퓨터 승리)
function result(myChoice, comChoice) {
    if (myChoice == comChoice) {
        return "Tied"; // 비긴 경우
    } else {
        // 인간이 이긴 경우
        if ((myChoice == 0 && comChoice == 2) || (myChoice == 1 && comChoice == 0) || (myChoice == 2 && comChoice == 1)) {
            return "You won";
        } else {
            return "Computer won"; // 컴퓨터가 이긴 경우
        }
    }
}