
  let financial = JSON.parse(localStorage.getItem('financial')) || {
  total: 0,
  expenses: [],
  incomes: []
};

function getPayroll() {
  const employees = JSON.parse(localStorage.getItem('employees')) || [];
  return employees
    .filter(e => e.status === 'Ativo')
    .reduce((sum, e) => sum + Number(e.salary), 0);
}

function getAgendaIncome() {
  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
  return appointments.reduce((sum, a) => sum + Number(a.value), 0);
}

function addExpense() {
  const value = Number(document.getElementById('expenseValue').value);
  const reason = document.getElementById('expenseReason').value;

  if (!value || !reason) return alert('Preencha os campos');

  financial.expenses.push({ value, reason });
  financial.total -= value;

  save();
}

function addIncome() {
  const value = Number(document.getElementById('incomeValue').value);
  const reason = document.getElementById('incomeReason').value;

  if (!value || !reason) return alert('Preencha os campos');

  financial.incomes.push({ value, reason });
  financial.total += value;

  save();
}

function render() {
  const payroll = getPayroll();
  const agendaIncome = getAgendaIncome();

  document.getElementById('payrollValue').innerText = `R$ ${payroll.toFixed(2)}`;
  document.getElementById('agendaValue').innerText = `R$ ${agendaIncome.toFixed(2)}`;

  document.getElementById('expenseList').innerHTML =
    financial.expenses.map(e => `<li>- R$ ${e.value} | ${e.reason}</li>`).join('');

  document.getElementById('incomeList').innerHTML =
    financial.incomes.map(i => `<li>+ R$ ${i.value} | ${i.reason}</li>`).join('');

  document.getElementById('totalValue').innerText =
    `R$ ${financial.total.toFixed(2)}`;
}

function save() {
  localStorage.setItem('financial', JSON.stringify(financial));
  render();
}

render();

