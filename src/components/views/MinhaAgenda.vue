<template>
  <div class="agenda-container">
    <h1>Minha Agenda 🗓️</h1>

    <div v-if="agendamentos.length === 0" class="vazio">
      <p>Nenhum agendamento encontrado.</p>
    </div>

    <div v-else class="agenda-lista">
      <div v-for="(ag, index) in agendamentos" :key="index" class="agendamento-card">
        <h3>{{ ag.servico }}</h3>
        <p><strong>Data:</strong> {{ ag.data }}</p>
        <p><strong>Hora:</strong> {{ ag.hora }}</p>
        <p><strong>Pet:</strong> {{ ag.pet.nome }} ({{ ag.pet.tipo }})</p>
        <p v-if="ag.obs"><strong>Obs:</strong> {{ ag.obs }}</p>

        <button class="btn-cancelar" @click="cancelar(index)">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const agendamentos = ref([])

onMounted(() => {
  agendamentos.value = JSON.parse(localStorage.getItem('agendamentos') || '[]')
})

function cancelar(index) {
  if (confirm('Deseja cancelar este agendamento?')) {
    agendamentos.value.splice(index, 1)
    localStorage.setItem('agendamentos', JSON.stringify(agendamentos.value))
  }
}
</script>

<style scoped>
.agenda-container {
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
}

.agenda-lista {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.agendamento-card {
  background: #f0f0f0;
  padding: 1rem;
  border-radius: 10px;
  width: 250px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.vazio {
  text-align: center;
  color: #888;
}

.btn-cancelar {
  background-color: #e74c3c;
  color: white;
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 0.5rem;
  font-weight: bold;
}

.btn-cancelar:hover {
  background-color: #c0392b;
}
</style>
