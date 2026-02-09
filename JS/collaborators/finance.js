
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
  return financial.incomes.reduce((sum, i) => sum + Number(i.value), 0);
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
  // 🔁 recalcula total do zero
  const totalIncomes = financial.incomes.reduce(
    (sum, i) => sum + Number(i.value), 0
  );

  const totalExpenses = financial.expenses.reduce(
    (sum, e) => sum + Number(e.value), 0
  );

  financial.total = totalIncomes - totalExpenses;

  document.getElementById('totalValue').innerText =
    `R$ ${financial.total.toFixed(2)}`;

  document.getElementById('incomeList').innerHTML =
    financial.incomes.map(i =>
      `<li>+ R$ ${i.value} | ${i.reason}</li>`
    ).join('');

  document.getElementById('expenseList').innerHTML =
    financial.expenses.map(e =>
      `<li>- R$ ${e.value} | ${e.reason}</li>`
    ).join('');
}


function save() {
  localStorage.setItem('financial', JSON.stringify(financial));
  render();
}

window.addEventListener("financeUpdated", () => {
  financial = JSON.parse(localStorage.getItem('financial'));
  render();
});

window.addEventListener("storage", (e) => {
  if (e.key === "financial") {
    financial = JSON.parse(localStorage.getItem("financial"));
    render();
  }
});


render();

