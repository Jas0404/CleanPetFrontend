<template>
  <div class="carrinho">
    <h1>🐾 Meu Carrinho 🛒</h1>

    <div v-if="carrinho.length === 0" class="vazio">
      <p>Seu carrinho está vazio 😿</p>
    </div>

    <div v-else class="lista-itens">
      <ul>
        <li v-for="item in carrinho" :key="item.id">
          <img :src="item.imagem" alt="produto" />
          <div class="info">
            <span class="nome">{{ item.nome }}</span>
            <span class="preco">R$ {{ item.preco }}</span>
          </div>
          <button @click="remover(item.id)">❌</button>
        </li>
      </ul>
      <h3 class="total">Total: R$ {{ total.toFixed(2) }}</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const carrinho = ref([])

const token = localStorage.getItem('token')

const api = axios.create({
  baseURL: 'https://localhost:7074/api/',
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const total = computed(() =>
  carrinho.value.reduce((acc, item) => acc + item.preco, 0)
)

async function carregarCarrinho() {
  try {
    //const response = await api.get('CarrinhoItem')
    //carrinho.value = localStorage.getItem('carrinho') //response.data
    const carrinhoSalvo = localStorage.getItem('carrinho')
    carrinho.value = carrinhoSalvo ? JSON.parse(carrinhoSalvo) : []
  } catch (error) {
    console.error('Erro ao carregar carrinho:', error)
  }
}

async function remover(id) {
  try {
    await api.delete(`CarrinhoItem/${id}`)
    carrinho.value = carrinho.value.filter(item => item.id !== id)
  } catch (error) {
    console.error('Erro ao remover item:', error)
  }
}

onMounted(() => {
  carregarCarrinho()
})
</script>

<style scoped>
.carrinho {
  padding: 2rem;
  max-width: 800px;
  margin: 70px auto;
  background: #e9fdf0;
  border-radius: 2rem;
  box-shadow: 0 0 15px rgba(0, 128, 0, 0.1);
  font-family: 'Comic Sans MS', 'Poppins', cursive;
  text-align: center;
}

.carrinho h1 {
  color: #3b7d57;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.vazio p {
  font-size: 1.3rem;
  color: #666;
}

.lista-itens ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.lista-itens li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-radius: 1.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.lista-itens li:hover {
  transform: scale(1.02);
}

.lista-itens img {
  width: 80px;
  height: 80px;
  border-radius: 1rem;
  object-fit: cover;
}

.info {
  flex: 1;
  text-align: left;
  margin-left: 1rem;
}

.nome {
  font-weight: bold;
  font-size: 1.1rem;
  color: #2c5f3e;
}

.preco {
  display: block;
  color: #3b7d57;
  margin-top: 0.2rem;
}

button {
  background-color: #ff6b81;
  color: white;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #e6506d;
}

.total {
  margin-top: 2rem;
  font-size: 1.4rem;
  color: #2c5f3e;
  font-weight: bold;
}
</style>
