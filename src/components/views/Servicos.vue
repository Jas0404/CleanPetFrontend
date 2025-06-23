<template>
  <div class="servicos-container">
    <h1>Serviços Disponíveis</h1>

    <div class="servicos-grid">
      <div v-for="servico in servicos" :key="servico.nome" class="servico-card">
        <img :src="servico.imagem" :alt="servico.nome" />
        <h3>{{ servico.nome }}</h3>
        <p>{{ servico.descricao }}</p>
        <button @click="abrirAgendamento(servico)">Agendar</button>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal" v-if="modalAberto">
      <div class="modal-content">
        <h2>Agendar: {{ servicoSelecionado.nome }}</h2>

        <div v-if="pets.length > 0">
          <label>
            Escolha um pet:
            <select v-model="dados.petId" required>
              <option disabled value="">Selecione...</option>
              <option v-for="pet in pets" :key="pet.id" :value="pet.id">
                {{ pet.nome }} ({{ pet.tipo }})
              </option>
            </select>
          </label>
        </div>

        <div v-else>
          <p>Nenhum pet cadastrado.</p>
          <router-link to="/cadastro-pet">
            <button>Cadastrar Pet</button>
          </router-link>
        </div>

        <form @submit.prevent="confirmarAgendamento" v-if="pets.length > 0">
          <label>
            Data:
            <input type="date" v-model="dados.data" required />
          </label>
          <label>
            Hora:
            <input type="time" v-model="dados.hora" required />
          </label>
          <label>
            Observações:
            <textarea v-model="dados.obs" placeholder="Opcional"></textarea>
          </label>
          <div class="botoes">
            <button type="submit">Confirmar</button>
            <button type="button" @click="modalAberto = false">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const servicos = ref([])
const pets = ref([])
const modalAberto = ref(false)
const servicoSelecionado = ref({})
const dados = ref({
  data: '',
  hora: '',
  obs: '',
  petId: ''
})

function abrirAgendamento(servico) {
  servicoSelecionado.value = servico
  dados.value = { data: '', hora: '', obs: '', petId: '' }
  modalAberto.value = true
}

function confirmarAgendamento() {
  const pet = pets.value.find(p => p.id === dados.value.petId)
  const agendamento = {
    servico: servicoSelecionado.value.nome,
    data: dados.value.data,
    hora: dados.value.hora,
    obs: dados.value.obs,
    pet: { id: pet.id, nome: pet.nome, tipo: pet.tipo }
  }

  const agendamentos = JSON.parse(localStorage.getItem('agendamentos') || '[]')
  agendamentos.push(agendamento)
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos))

  modalAberto.value = false
  router.push('/agenda')
}

onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7074/api/servicos')
    servicos.value = response.data
  } catch (error) {
    console.error('Erro ao carregar serviços:', error)
  }

  pets.value = JSON.parse(localStorage.getItem('pets') || '[]')
})

</script>

<style scoped>
.servicos-container {
  padding: 2rem;
}

.servicos-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.servico-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: center;
  width: 300px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.servico-card img {
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

button {
  background-color: #0c452c;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

button:hover {
  background-color: #22dc7c;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
}

.modal-content label {
  display: block;
  margin-bottom: 1rem;
  font-weight: bold;
}

.modal-content input,
.modal-content textarea,
.modal-content select {
  width: 100%;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-top: 0.25rem;
}

.botoes {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
