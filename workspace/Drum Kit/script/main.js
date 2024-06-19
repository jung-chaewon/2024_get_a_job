// 1. 모든 키 요소 가져오기 (Get all key elements)
const keys = Array.from(document.querySelectorAll('.key'));

// 2. 키 코드 사전 정의 (Define key code dictionary)
const keyCode = {
  A: 65,
  S: 83,
  D: 68,
  F: 70,
  G: 71,
  H: 72,
  J: 74,
  K: 75,
  L: 76,
};

// 3. 변형 애니메이션 종료 시 처리 함수 (Function to handle transition end)
function removeTransition(e) {
  if (e.propertyName !== 'transform') return; // 변형 애니메이션이 아니라면 리턴 (If not a transform animation, return)
  e.target.classList.remove('playing'); // 클래스 'playing' 제거 (Remove class 'playing')
}

// 4. 키 누르기 이벤트 처리 함수 (Function to handle keydown event)
function playSound(e) {
  // 키 코드 또는 키 글자에 해당하는 데이터 속성을 가진 오디오 요소 찾기
  // (Find audio element with data attribute matching key code or key content)
  const audio = document.querySelector(
    `audio[data-key="${e.keyCode || keyCode[e.target.innerHTML]}"]`
  );

  // 키 요소 (div) 찾기
  // (Find the key element (div))
  const key = document.querySelector(
    `div[data-key="${e.keyCode || keyCode[e.target.innerHTML]}"]`
  );

  if (!audio) return; // 오디오 요소가 없으면 리턴 (If no audio element found, return)

  key.classList.add('playing'); // 클래스 'playing' 추가 (Add class 'playing')
  audio.currentTime = 0; // 재생 시간 초기화 (Reset playback time)
  audio.play(); // 오디오 재생 (Play audio)
}

// 5. 모든 키 요소에 변형 애니메이션 종료 이벤트 리스너 등록
// (Add transitionend event listener to all key elements)
keys.forEach((key) => key.addEventListener('transitionend', removeTransition));

// 6. window 객체에 키 누름 이벤트 리스너 등록
// (Add keydown event listener to window object)
window.addEventListener('keydown', playSound);

// 7. 모든 키 요소에 클릭 이벤트 리스너 등록
// (Add click event listener to all key elements)
keys.forEach((key) =>
  key.addEventListener('click', (e) => {
    playSound(e);
  })
);
