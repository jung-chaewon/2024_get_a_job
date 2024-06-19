window.onload = function () {
    addColor(); // 페이지 로딩 완료 시 색상 추가 함수 실행 (Call addColor function on page load)
  };
  
  for (let i = 1; i <= 9; i++) {
    const box = document.createElement('div');
    box.classList.add('box'); // 클래스 'box' 추가 (Add class 'box')
    document.querySelector('.container').appendChild(box); // 컨테이너 요소에 박스 추가 (Append box to container element)
    box.style.cursor = 'pointer'; // 커서 모양을 포인터로 설정 (Set cursor style to pointer)
  
    box.addEventListener('click', () => {
      console.log(box.innerHTML); // 박스 내용 로그 출력 (Log box content)
      navigator.clipboard.writeText(box.innerHTML); // 클립보드에 박스 내용 복사 (Copy box content to clipboard)
      console.log("copied"); // "copied" 메시지 로그 출력 (Log "copied" message)
      toastr.success('이제 사용할 수 있습니다!', '클립보드에 복사됨', { timeOut: 3000 }); // toastr 라이브러리 사용하여 성공 메시지 표시 (Use toastr library to display success message)
    });
  }
  
  const btn = document.querySelector('.btn'); // 버튼 요소 찾기 (Find button element)
  const randomColorBlock = document.querySelectorAll('.box'); // 모든 .box 클래스 요소 찾기 (Find all elements with class .box)
  
  function RandomHexColorCode () {
    var chars = '0123456789abcdef';
    var colorLength = 6;
    var color = '';
  
    for (var i = 0; i < colorLength; i++) {
      var randomColor = Math.floor(Math.random() * chars.length);
      color += chars.substring(randomColor, randomColor + 1);
    }
    return '#' + color;
  }
  
  function addColor () {
    randomColorBlock.forEach(e => {
      var newColor = RandomHexColorCode();
      e.style.backgroundColor = newColor; // 배경 색상 설정 (Set background color)
      e.innerHTML = newColor; // 박스 내용 설정 (Set box content)
    });
  }
  