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
  e.preventDefault();

  const session = document.getElementById('session-select').value;
  const contact = document.getElementById('contact').value;
  const count = parseInt(document.getElementById('participant-count').value);

  const participants = [];
  let valid = true;

  for (let i = 1; i <= count; i++) {
    const name = document.querySelector(`input[name='name${i}']`).value;
    const age = parseInt(document.querySelector(`input[name='age${i}']`).value);
    if (age < 6) {
      alert(`참여자 ${i}는 6세 미만으로 신청이 불가합니다.`);
      valid = false;
      break;
    }
    participants.push({ name, age });
  }

  if (!valid) return;

  const scriptUrl = 'https://script.google.com/macros/s/AKfycbxcqXTvSaCEyU0N2GUdfDVdSHG6jQAxGyYAo5ys-7dB_FDe6krcUqfoJTwmd7p4Q9RxVw/exec';

  fetch(scriptUrl, {
    method: 'POST',
    body: JSON.stringify({
      session,
      contact,
      participants
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.text())
    .then(result => {
      alert('신청이 완료되었습니다!');
      document.getElementById('reservation-form').reset();
      document.getElementById('participants-container').innerHTML = '';
    })
    .catch(error => {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
      console.error('Error!', error.message);
    });
});
