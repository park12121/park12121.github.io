document.getElementById('participant-count').addEventListener('change', function () {
  const count = parseInt(this.value);
  const container = document.getElementById('participants-container');
  container.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const block = document.createElement('div');
    block.className = 'participant-block';
    block.innerHTML = `
      <label>참여자 ${i} 이름:<br>
        <input type="text" name="name${i}" required>
      </label>
      <label>참여자 ${i} 나이:<br>
        <input type="number" name="age${i}" min="6" required>
      </label>
    `;
    container.appendChild(block);
  }
});

document.getElementById('reservation-form').addEventListener('submit', function (e) {
  const count = parseInt(document.getElementById('participant-count').value);
  let valid = true;
  for (let i = 1; i <= count; i++) {
    const ageInput = document.querySelector(`input[name='age${i}']`);
    const age = parseInt(ageInput.value);
    if (age < 6) {
      alert(`참여자 ${i}는 6세 미만으로 신청이 불가합니다.`);
      valid = false;
      break;
    }
  }
  if (!valid) e.preventDefault();
});
