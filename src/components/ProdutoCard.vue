<template>
  <div class="produtos-lista">
    <div v-for="servico in servicos" :key="servico.id" class="produto-card">
      <img :src="servico.imagem || '/default.jpg'" alt="produto" />
      <h3>{{ servico.nome }}</h3>
      <p>R$ {{ servico.preco.toFixed(2) }}</p>
      <button @click="adicionarAoCarrinho(servico)">Adicionar ao carrinho</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const servicos = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7074/api/produtos')
    servicos.value = response.data
  } catch (error) {
    console.error('Erro ao buscar serviços:', error)
    Swal.fire('Erro', 'Erro ao carregar os serviços!', 'error')
  }
})

const emit = defineEmits(['adicionar'])

const adicionarAoCarrinho = (servico) => {
  emit('adicionar', servico)
  Swal.fire({
    title: 'Adicionado!',
    text: `${servico.nome} foi adicionado ao carrinho.`,
    icon: 'success',
    timer: 1200,
    showConfirmButton: false,
  })
}
</script>

<style scoped>
.produtos-lista {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
}

.produto-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  width: 200px;
  text-align: center;
  background: #fff;
  transition: box-shadow 0.3s ease;
}

.produto-card:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

button {
  margin-top: 1rem;
  background-color: #00bcd4;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #009fb1;
}
</style>
