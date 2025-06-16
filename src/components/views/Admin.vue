<template>
  <div class="admin-container">
    <!-- TELA DE LOGIN INTERNA -->
    <div v-if="!autenticado" class="login-box">
      <h2>Login do Administrador 🛡️</h2>
      <input v-model="usuario" type="text" placeholder="Usuário" />
      <input v-model="senha" type="password" placeholder="Senha" />
      <button @click="logar">Entrar</button>
      <p v-if="erro" class="erro-msg">{{ erro }}</p>
    </div>

    <!-- PAINEL APÓS LOGIN -->
    <div v-else>
      <h1>Painel Administrativo 🛠️</h1>

      <!-- 👤 Lista de Usuários -->
      <section>
        <h2>Usuários Registrados</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.id">
              <td>{{ usuario.nome }}</td>
              <td>{{ usuario.email }}</td>
              <td>{{ usuario.cpf }}</td>
              <td><button @click="banirUsuario(usuario.id)">Banir</button></td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- 📊 Relatórios -->
      <section>
        <h2>Relatórios</h2>
        <div class="card-grid">
          <div class="card">
            <h3>Novos Usuários</h3>
            <p>📈 32 na última semana</p>
          </div>
          <div class="card">
            <h3>Pedidos Concluídos</h3>
            <p>📦 187 este mês</p>
          </div>
          <div class="card">
            <h3>Agendamentos</h3>
            <p>📅 46 marcados para hoje</p>
          </div>
        </div>
      </section>

      <!-- 🛠️ Serviços -->
      <section>
        <h2>Serviços Disponíveis</h2>
        <div class="servico-lista">
          <div class="servico-item" v-for="servico in servicos" :key="servico.id">
            <div>
              <h4>{{ servico.nome }}</h4>
              <p>{{ servico.descricao }}</p>
            </div>
            <button @click="editarServico(servico.id)">Editar</button>
          </div>
        </div>
      </section>

      <!-- 🐶 Produtos -->
      <section>
        <h2>Produtos Cadastrados</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="produto in produtos" :key="produto.id">
              <td>{{ produto.nome }}</td>
              <td>{{ produto.categoria }}</td>
              <td>R$ {{ produto.preco.toFixed(2) }}</td>
              <td>
                <button @click="editarProduto(produto.id)">Editar</button>
                <button @click="deletarProduto(produto.id)">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- 📦 Pedidos -->
      <section>
        <h2>Pedidos Recentes</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Produto</th>
              <th>Data</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pedido in pedidos" :key="pedido.id">
              <td>{{ pedido.cliente }}</td>
              <td>{{ pedido.produto }}</td>
              <td>{{ formatarData(pedido.data) }}</td>
              <td>{{ pedido.status }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const usuario = ref('')
const senha = ref('')
const autenticado = ref(false)
const erro = ref('')

function logar() {
  if (usuario.value === 'Clean-ADM' && senha.value === '145210') {
    autenticado.value = true
    erro.value = ''
  } else {
    erro.value = 'Credenciais inválidas!'
  }
}

const usuarios = ref([
  { id: 1, nome: 'Maria Silva', email: 'maria@gmail.com', cpf: '123.456.789-00' },
  { id: 2, nome: 'João Souza', email: 'joao@gmail.com', cpf: '987.654.321-00' }
])

const servicos = ref([
  { id: 1, nome: 'Banho e Tosa', descricao: 'Cuidado completo com higiene' },
  { id: 2, nome: 'Veterinário', descricao: 'Consulta especializada' },
  { id: 3, nome: 'Hospedagem', descricao: 'Conforto para seu pet' }
])

const produtos = ref([
  { id: 1, nome: 'Ração Golden Fórmula', categoria: 'Cachorros', preco: 119.9 },
  { id: 2, nome: 'Bolinha LED', categoria: 'Gatos', preco: 29.5 },
  { id: 3, nome: 'Comedouro Automático', categoria: 'Todos', preco: 89.0 }
])

const pedidos = ref([
  { id: 1, cliente: 'Ana Clara', produto: 'Ração Golden Fórmula', data: '2024-05-20', status: 'Entregue' },
  { id: 2, cliente: 'Lucas Vieira', produto: 'Bolinha LED', data: '2024-05-21', status: 'Em transporte' },
  { id: 3, cliente: 'Marcos Silva', produto: 'Comedouro Automático', data: '2024-05-22', status: 'Pendente' }
])

function banirUsuario(id) {
  usuarios.value = usuarios.value.filter(u => u.id !== id)
  alert('Usuário banido com sucesso 🛑')
}

function editarServico(id) {
  alert(`Abrir modal para editar serviço ID: ${id} 🛠️`)
}

function editarProduto(id) {
  alert(`Abrir editor de produto ID: ${id} ✏️`)
}

function deletarProduto(id) {
  produtos.value = produtos.value.filter(p => p.id !== id)
  alert('Produto removido com sucesso 🗑️')
}

function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR')
}
</script>

<style scoped>
.admin-container {
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  color: #0c452c;
}

.login-box {
  max-width: 400px;
  margin: 4rem auto;
  background: #f4fdf6;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.login-box h2 {
  color: #0c452c;
  margin-bottom: 1rem;
}

.login-box input {
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.login-box button {
  background-color: #0c452c;
  color: white;
  padding: 0.75rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 1rem;
  cursor: pointer;
}

.login-box button:hover {
  background-color: #22dc7c;
  color: #0c452c;
}

.erro-msg {
  color: red;
  margin-top: 0.75rem;
}

section {
  margin-top: 2rem;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.table th, .table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.table th {
  background-color: #f4fdf6;
}

.card-grid {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.card {
  background-color: #f4fdf6;
  padding: 1rem;
  flex: 1;
  min-width: 200px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 1px 6px rgba(0,0,0,0.08);
}

.servico-lista {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.servico-item {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

button {
  background-color: #0c452c;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #22dc7c;
  color: #0c452c;
}
</style>
