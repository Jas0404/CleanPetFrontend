<script setup>
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'

const userId = 1 // deve vir da autenticação
const favoritosIds = ref([])

// Computado para contar quantos produtos estão nos favoritos
const totalFavoritos = computed(() => favoritosIds.value.length)

// Carrega os favoritos do usuário ao montar
async function carregarFavoritos() {
  const res = await axios.get(`http://localhost:3000/api/favorito/${userId}`)
  favoritosIds.value = res.data
}

// Adiciona ou remove um favorito
async function toggleFavorito(produtoId) {
  if (favoritosIds.value.includes(produtoId)) {
    await axios.delete('http://localhost:3000/api/favorito', {
      data: { usuarioId: userId, produtoId }
    })
    favoritosIds.value = favoritosIds.value.filter(id => id !== produtoId)
  } else {
    await axios.post('http://localhost:3000/api/favorito', {
      usuarioId: userId,
      produtoId
    })
    favoritosIds.value.push(produtoId)
  }
}

onMounted(() => {
  carregarFavoritos()
})
</script>

<template>
  <div>
    <h2>Favoritos: {{ totalFavoritos }}</h2>

    <!-- Exemplo de botão para cada produto (substitua pelo seu loop de produtos) -->
    <button @click="toggleFavorito(123)">
      Adicionar/Remover Produto 123 dos Favoritos
    </button>
  </div>
</template>
