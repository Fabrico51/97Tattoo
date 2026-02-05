<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <title>Funcionários</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../../css/collaborators/collaborators.css">
</head>

<body>

  <button class="menu-toggle" onclick="toggleMenu()">
    <i class="fas fa-bars"></i>
  </button>

  <div class="sidebar" id="sidebar">
    <div class="logo">97</div>

    <ul>
      <li onclick="showPage('home')">
        <i class="fas fa-home"></i>
        <span>Home</span>
      </li>

      <li onclick="showPage('financeiro')">
        <i class="fas fa-wallet"></i>
        <span>Financeiro</span>
      </li>

      <li onclick="showPage('agenda')">
        <i class="fas fa-calendar"></i>
        <span>Agendamento</span>
      </li>

      <li onclick="showPage('funcionarios')">
        <i class="fa-solid fa-address-book"></i>
        <span>Funcionários</span>
      </li>
    </ul>
  </div>

  <div class="content">
    <div id="home" class="page active">
      <h1>Home</h1>
      <p>Bem-vindo!</p>
    </div>

    <section id="financeiro" class="page">
      <div class="finance-container">

  <!-- TOPO -->
  <div class="total-box">
    <h2>Saldo Total</h2>
    <span id="totalValue">R$ 0,00</span>
  </div>

  <!-- CONTEÚDO -->
  <div class="finance-content">

    <!-- DESPESAS -->
    <div class="finance-card">
      <h3>Despesas</h3>

      <div class="fixed-item">
        <strong>Folha Salarial</strong>
        <span id="payrollValue">R$ 0,00</span>
      </div>

      <h4>Adicionar Despesa</h4>
      <input type="number" id="expenseValue" placeholder="Valor">
      <input type="text" id="expenseReason" placeholder="Justificativa">
      <button onclick="addExpense()">Adicionar</button>

      <ul id="expenseList"></ul>
    </div>

    <!-- RECEITAS -->
    <div class="finance-card">
      <h3>Rendimentos</h3>

      <div class="fixed-item">
        <strong>Agenda (Tatuagens)</strong>
        <span id="agendaValue">R$ 0,00</span>
      </div>

      <h4>Adicionar Ganho</h4>
      <input type="number" id="incomeValue" placeholder="Valor">
      <input type="text" id="incomeReason" placeholder="Justificativa">
      <button onclick="addIncome()">Adicionar</button>

      <ul id="incomeList"></ul>
    </div>

  </div>
</div>
    </section>



    <!-- CALENDÁRIO -->
    <section class="calendar-container page" id="agenda">
      <div class="calendar-header">
        <button onclick="changeMonth(-1)" class="arrow" style="background: #FFF3D0; border:none;">◀</button>
        <h2 id="monthYear" style="text-transform:upercase;"></h2>
        <button onclick="changeMonth(1)" class="arrow" style="background: #FFF3D0; border:none;">▶</button>
      </div>

      <div class="calendar-weekdays">
        <div>Dom</div>
        <div>Seg</div>
        <div>Ter</div>
        <div>Qua</div>
        <div>Qui</div>
        <div>Sex</div>
        <div>Sáb</div>
      </div>

      <div class="calendar-days" id="calendarDays"></div>
      <!-- LISTA DIÁRIA -->
      <div class="day-panel" id="dayPanel">
        <h3 id="dayTitle"></h3>
        <button onclick="newSchedule()" class="scheduling" style="color:#E999BF;">+ Novo agendamento</button>
        <ul id="scheduleList"></ul>
      </div>

      <!-- MODAL -->
      <div class="modal" id="modal">
        <div class="modal-content">
          <h3 id="modalTitle"></h3>

          <input type="text" id="clientName" placeholder="Nome do cliente">
          <input type="text" id="size" placeholder="Tamanho da tatuagem">
          <input type="number" id="price" placeholder="Valor (R$)">
          <select id="time"></select>

          <div class="modal-actions">
            <button onclick="saveSchedule()" class="save-agenda">Salvar</button>
            <button onclick="deleteSchedule()" class="danger-agenda">Excluir</button>
            <button onclick="closeModal()" class="cancel-agenda">Cancelar</button>
          </div>
        </div>
      </div>
    </section>



<!-- FUNCIONÁRIOS -->
    <section id="funcionarios" class="page">
      <div class="admin-container">

        <h1>Administrativo</h1>

        <!-- RESUMO -->
        <div class="summary">
          <div>
            <strong>Total de Funcionários</strong>
            <span id="totalEmployees">0</span>
          </div>
          <div>
            <strong>Folha Salarial (Ativos)</strong>
            <span id="totalPayroll">R$ 0,00</span>
          </div>
        </div>

        <button class="newEmploye" onclick="openModalEmploye()">+ Novo Funcionário</button>

        <!-- LISTA -->
        <table>
          <thead>
            <tr>
              <th style="
  border-top-left-radius: 100px;">Nome</th>
              <th>Setor</th>
              <th>Cargo</th>
              <th>Salário</th>
              <th>Status</th>
              <th style="
  border-top-right-radius: 100px;">Ações</th>
            </tr>
          </thead>
          <tbody id="employeeTable"></tbody>
        </table>
      </div>

      <!-- MODAL -->
      <div class="modalEmploye" id="modalEmploye">
        <div class="modalEmploye-content">
          <h3 id="modalEmployeTitle"></h3>

          <input type="text" id="name" placeholder="Nome">
          <input type="text" id="sector" placeholder="Setor">
          <input type="text" id="role" placeholder="Cargo">
          <input type="number" id="salary" placeholder="Salário">

          <select id="status">
            <option value="Ativo">Ativo</option>
            <option value="Férias">Férias</option>
            <option value="Afastado">Afastado</option>
            <option value="Demitido">Demitido</option>
          </select>

          <div class="modalEmploye-actions">
            <button onclick="saveEmployee()" class="save-employe">Salvar</button>
            <button onclick="deleteEmployee()" class="danger-employe">Excluir</button>
            <button onclick="closeModalEmploye()" class="cancel-employe">Cancelar</button>
          </div>
        </div>
      </div>

    </section>
  </div>

  <script src="../../JS/collaborators/sidebar.js"></script>
  <script src="../../JS/collaborators/calendar.js"></script>
  <script src="../../JS/collaborators/employees.js"></script>
  <script src="../../JS/collaborators/finance.js"></script>
</body>

</html>