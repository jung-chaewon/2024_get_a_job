const words = ['seat', 'pen', 'broad', 'vapor', 'ocean',
	'red', 'plate', 'late', 'that', 'ring', 'swim', 'shown',
	'path', 'law', 'list', 'hard', 'plate', 'block', 'two',
	'pupil', 'were', 'lot', 'pay', 'would', 'tired', 'dull',
	'mud', 'sky', 'grew', 'hard', 'ill', 'frame',
	'sport', 'did', 'many', 'been', 'page', 'year', 'trail',
	'earth', 'are', 'while', 'off', 'town', 'doing', 'size',
	'steel', 'sale', 'swam', 'put', 'zero', 'week', 'mill',
	'past', 'aside', 'her', 'cent', 'box', 'fuel', 'block',
	'those', 'late', 'sun', 'map', 'silk', 'lady', 'meant',
	'still', 'shine', 'range', 'loud', 'fox', 'gate', 'slide',
	'each', 'nails', 'flag', 'exist', 'door', 'luck', 'down',
	'poem', 'depth', 'press', 'crowd', 'herd', 'drink', 'worry',
	'dried', 'dig', 'new', 'rest', 'play', 'win', 'strong'];

  function getPassword() {
  // 1. 비밀번호 길이 설정
  let length = document.getElementById('length').value;
  if (length === '') {
	length = 8;  // 기본 길이 8로 설정
  }

  // 2. 옵션 설정 (문자 포함 여부)
  const includeLowercase = document.getElementById('includeLowercase').checked;
  const includeUppercase = document.getElementById('includeUppercase').checked;
  const includeSymbols = document.getElementById('includeSymbols').checked;
  const includeNumbers = document.getElementById('includeNumbers').checked;

  // 3. 사용 가능한 문자열 생성
  let chars = '';
  if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeSymbols) chars += '!@#$%&';
  if (includeNumbers) chars += '0123456789';

  // 4. 비밀번호 생성
  let password = '';
  for (let i = 0; i < length; i++) {
	password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // 5. 생성된 비밀번호 표시
  document.getElementById('password').value = password;
}
