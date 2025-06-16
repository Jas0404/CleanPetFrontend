<template>
  <div class="perfil-container">
    <h1>Meu Perfil</h1>

    <div class="perfil-section">
      <h2>Dados Pessoais</h2>
      <div class="info-row" v-if="usuario">
        <div><strong>Nome:</strong> {{ usuario.nome }}</div>
        <div><strong>Email:</strong> {{ usuario.email }}</div>
        <div><strong>Endereço:</strong> {{ usuario.endereco }}</div>
      </div>
    </div>

    <div class="perfil-section">
      <h2>Pets Cadastrados</h2>
      <div v-if="pets.length > 0">
        <div class="info-row" v-for="pet in pets" :key="pet.id">
          <div><strong>Nome:</strong> {{ pet.nome }}</div>
          <div><strong>Espécie:</strong> {{ pet.tipo }}</div>
          <div><strong>Raça:</strong> {{ pet.raca }}</div>
        </div>
      </div>
      <p v-else class="vazio">Nenhum pet cadastrado.</p>
    </div>

    <div class="perfil-section">
      <h2>Cartões Cadastrados</h2>
      <div v-if="cartoes.length > 0">
        <div class="info-row" v-for="cartao in cartoes" :key="cartao.numero">
          <div><strong>Número:</strong> **** **** **** {{ cartao.numero.slice(-4) }}</div>
          <div><strong>Validade:</strong> {{ cartao.validade }}</div>
          <div><strong>Bandeira:</strong> {{ cartao.bandeira }}</div>
        </div>
      </div>
      <p v-else class="vazio">Nenhum cartão salvo.</p>
    </div>

    <div class="perfil-section">
      <h2>Pedidos Realizados</h2>
      <div v-if="pedidos.length > 0">
        <div class="info-row" v-for="pedido in pedidos" :key="pedido.id">
          <div><strong>ID:</strong> {{ pedido.id }}</div>
          <div><strong>Data:</strong> {{ pedido.data }}</div>
          <div><strong>Status:</strong> {{ pedido.status }}</div>
        </div>
      </div>
      <p v-else class="vazio">Nenhum pedido encontrado.</p>
    </div>

    <div class="perfil-section">
      <h2>Minha Agenda</h2>
      <div v-if="agenda.length > 0">
        <div class="info-row" v-for="item in agenda" :key="item.id">
          <div><strong>Serviço:</strong> {{ item.servico }}</div>
          <div><strong>Data:</strong> {{ item.data }}</div>
          <div><strong>Status:</strong> {{ item.status }}</div>
        </div>
      </div>
      <p v-else class="vazio">Nenhum agendamento.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const usuario = ref(null)
const pets = ref([])
const cartoes = ref([])
const pedidos = ref([])
const agenda = ref([])

onMounted(() => {
  usuario.value = JSON.parse(localStorage.getItem('usuario')) || {
    nome: 'João Pet',
    email: 'joao@email.com',
    endereco: 'Rua dos Pets, 123'
  }

  pets.value = JSON.parse(localStorage.getItem('pets')) || []
  cartoes.value = JSON.parse(localStorage.getItem('cartoes')) || []
  pedidos.value = JSON.parse(localStorage.getItem('pedidos')) || []
  agenda.value = JSON.parse(localStorage.getItem('agenda')) || []
})
</script>

<style scoped>
.perfil-container {
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  background-color: #f7fdf7;
  color: #0c4c2b;
  max-width: 1000px;
  margin: 2rem auto;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 2rem;
  color: #0c4c2b;
  margin-bottom: 1.5rem;
  text-align: center;
}

.perfil-section {
  margin-bottom: 2rem;
}

.perfil-section h2 {
  font-size: 1.3rem;
  color: #0c4c2b;
  border-left: 5px solid #22dc7c;
  padding-left: 0.6rem;
  margin-bottom: 1rem;
}

.info-row {
  background: #ffffff;
  border: 1px solid #c2e4c9;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.vazio {
  color: #aaa;
  font-style: italic;
}
</style>
