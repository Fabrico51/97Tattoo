let currentDate = new Date();
let selectedDate = null;
let editingTime = null;

const HOURS = [];
for (let h = 10; h <= 20; h++) HOURS.push(`${h}:00`);

let schedules = JSON.parse(localStorage.getItem('schedules')) || {};

const calendarDays = document.getElementById('calendarDays');
const monthYear = document.getElementById('monthYear');
const dayPanel = document.getElementById('dayPanel');
const dayTitle = document.getElementById('dayTitle');
const scheduleList = document.getElementById('scheduleList');
const modal = document.getElementById('modal');
const timeSelect = document.getElementById('time');

function renderCalendar() {
  calendarDays.innerHTML = '';
  const y = currentDate.getFullYear();
  const m = currentDate.getMonth();

  monthYear.innerText = currentDate.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric'
  });

  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarDays.appendChild(document.createElement('div'));
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const key = `${d} / ${m + 1} / ${y}`;
    const div = document.createElement('div');
    div.innerText = d;

    if (schedules[key]) div.classList.add('has-event');

    div.onclick = () => openDay(key);
    calendarDays.appendChild(div);
  }
}

function openDay(dateKey) {
  selectedDate = dateKey;
  dayTitle.innerText = `Data selecionada: ${dateKey}`;
  scheduleList.innerHTML = '';
  dayPanel.style.display = 'block';

  const daySchedules = schedules[dateKey] || {};

  Object.keys(daySchedules).sort().forEach(time => {
    const li = document.createElement('li');
    const s = daySchedules[time];
    li.innerText = `${time} - ${s.name} (R$ ${s.price || 0})`;
    li.onclick = () => editSchedule(time, s);
    scheduleList.appendChild(li);
  });
}

function newSchedule() {
  editingTime = null;
  clearModal();
  openModal();
}

function editSchedule(time, data) {
  editingTime = time;
  document.getElementById('clientName').value = data.name;
  document.getElementById('size').value = data.size;
  document.getElementById('price').value = data.price;
  openModal(time);
}

function openModal(time = null) {
  document.getElementById('modalTitle').innerText =
    time ? 'Editar agendamento' : 'Novo agendamento';

  loadTimes(time);
  modal.style.display = 'flex';
}

function loadTimes(current = null) {
  timeSelect.innerHTML = '';
  const daySchedules = schedules[selectedDate] || {};

  HOURS.forEach(h => {
    const opt = document.createElement('option');
    opt.value = h;
    opt.text = h;

    if (daySchedules[h] && h !== current) {
      opt.disabled = true;
      opt.text += ' (ocupado)';
    }

    if (h === current) opt.selected = true;

    timeSelect.appendChild(opt);
  });
}

function addAgendaIncomeToFinance(price, clientName, date, time) {
  if (!price || Number(price) <= 0) return;

  let financial = JSON.parse(localStorage.getItem('financial')) || {
    total: 0,
    expenses: [],
    incomes: []
  };

  const value = Number(price);

  financial.incomes.push({
    value,
    reason: `Agendamento: ${clientName} (${date} - ${time})`
  });

  financial.total += value;

  localStorage.setItem('financial', JSON.stringify(financial));

  // 🔔 AVISA O FINANCEIRO QUE MUDOU
  window.dispatchEvent(new Event("financeUpdated"));
}



function saveSchedule() {
  const name = document.getElementById('clientName').value;
  const sizeValue = document.getElementById('size').value;
  const priceValue = document.getElementById('price').value;
  const time = timeSelect.value;

  if (!name || !time) {
    alert('Preencha nome e horário');
    return;
  }

  schedules[selectedDate] = schedules[selectedDate] || {};

  if (editingTime && editingTime !== time) {
    delete schedules[selectedDate][editingTime];
  }

  schedules[selectedDate][time] = {
  name,
  size: sizeValue,
  price: priceValue
};

localStorage.setItem('schedules', JSON.stringify(schedules));

// 💰 ADICIONA COMO LUCRO AUTOMÁTICO
addAgendaIncomeToFinance(priceValue, name, selectedDate, time);

  closeModal();
  renderCalendar();
  openDay(selectedDate);
}

function deleteSchedule() {
  if (!editingTime) return;

  delete schedules[selectedDate][editingTime];

  if (Object.keys(schedules[selectedDate]).length === 0) {
    delete schedules[selectedDate];
  }

  localStorage.setItem('schedules', JSON.stringify(schedules));

  closeModal();
  renderCalendar();
  openDay(selectedDate);
}

function closeModal() {
  modal.style.display = 'none';
  clearModal();
}

function clearModal() {
  document.getElementById('clientName').value = '';
  document.getElementById('size').value = '';
  document.getElementById('price').value = '';
}

function changeMonth(step) {
  currentDate.setMonth(currentDate.getMonth() + step);
  renderCalendar();
}

renderCalendar();
