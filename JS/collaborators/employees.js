let employees = JSON.parse(localStorage.getItem('employees')) || [];
let editingIndex = null;

const table = document.getElementById('employeeTable');
const totalEmployees = document.getElementById('totalEmployees');
const totalPayroll = document.getElementById('totalPayroll');
const modalEmploye = document.getElementById('modalEmploye');

function render() {
  table.innerHTML = '';
  let payroll = 0;

  employees.forEach((e, i) => {
    const tr = document.createElement('tr');

    if (e.status === 'Ativo') {
      payroll += Number(e.salary) || 0;
    }

    tr.innerHTML = `
      <td>${e.name}</td>
      <td>${e.sector}</td>
      <td>${e.role}</td>
      <td>R$ ${Number(e.salary).toFixed(2)}</td>
      <td>${e.status}</td>
      <td class="actions">
        <button onclick="editEmployee(${i})">✏️</button>
        <button onclick="removeEmployee(${i})">🗑️</button>
      </td>
    `;

    table.appendChild(tr);
  });

  totalEmployees.innerText = employees.length;
  totalPayroll.innerText = `R$ ${payroll.toFixed(2)}`;

  localStorage.setItem('employees', JSON.stringify(employees));
}


function openModalEmploye() {
  editingIndex = null;
  document.getElementById('modalEmployeTitle').innerText = 'Novo Funcionário';
  clearForm();
  modalEmploye.style.display = 'flex';
}

function closeModalEmploye() {
  modalEmploye.style.display = 'none';
}

function clearForm() {
  ['name', 'sector', 'role', 'salary'].forEach(id =>
    document.getElementById(id).value = ''
  );
  document.getElementById('status').value = 'Ativo';
}

function saveEmployee() {
  const nameInput = document.getElementById('name');
  const sectorInput = document.getElementById('sector');
  const roleInput = document.getElementById('role');
  const salaryInput = document.getElementById('salary');
  const statusInput = document.getElementById('status');

  const employee = {
    name: nameInput.value.trim(),
    sector: sectorInput.value.trim(),
    role: roleInput.value.trim(),
    salary: salaryInput.value.trim(),
    status: statusInput.value
  };

  if (employee.name === '' || employee.salary === '') {
    alert('Preencha nome e salário');
    return;
  }

  if (editingIndex === null) {
    employees.push(employee);
  } else {
    employees[editingIndex] = employee;
  }

  closeModalEmploye();
  render();
}

function editEmployee(index) {
  editingIndex = index;
  const e = employees[index];

  document.getElementById('name').value = e.name;
  document.getElementById('sector').value = e.sector;
  document.getElementById('role').value = e.role;
  document.getElementById('salary').value = e.salary;
  document.getElementById('status').value = e.status;

  document.getElementById('modalEmployeTitle').innerText = 'Editar Funcionário';
  modalEmploye.style.display = 'flex';
}


function removeEmployee(index) {
  if (confirm('Remover funcionário?')) {
    employees.splice(index, 1);
    render();
  }
}

function deleteEmployee() {
  if (editingIndex !== null) {
    removeEmployee(editingIndex);
    closeModalEmploye();
  }
}

render();
