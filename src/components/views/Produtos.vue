<template>
  <div class="produtos">
    <h2>{{ animal }} > {{ categoria }} > {{ subcategoria }}</h2>
    <p>Aqui você verá os produtos de <strong>{{ subcategoria }}</strong> para <strong>{{ animal }}</strong>! 🐾</p>

    <div class="produto" v-for="produto in produtos" :key="produto.id">
      <img :src="produto.imagemUrl || '/default.jpg'" alt="Produto" />
      <p>{{ produto.nome }}</p>
      <p>{{ produto.descricao }}</p>
      <p>R$ {{ produto.preco }}</p>
      <button
  :class="['fav-btn', { ativo: isFavorito(produto.id) }]"
  @click="toggleFavorito(produto)"
  title="Adicionar aos Favoritos"
>
  <font-awesome-icon icon="heart" />
</button>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();

const animal = route.params.animal;
const categoria = route.params.categoria;
const subcategoria = route.params.subcategoria.replace(/-/g, ' ');

const produtos = ref([]);

onMounted(async () => {
   console.log("onMounted executado");
  try {
    const response = await axios.get(`https://localhost:7074/api/produtos`);
    produtos.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    alert("Erro ao buscar produtos!");
  }
});

const toggleFavorito = (produto) => {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
  const index = favoritos.findIndex(p => p.id === produto.id)

  if (index >= 0) {
    favoritos.splice(index, 1)
  } else {
    favoritos.push(produto)
  }

  localStorage.setItem('favoritos', JSON.stringify(favoritos))
  window.dispatchEvent(new Event('storage'))
}

const isFavorito = (produtoId) => {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
  return favoritos.some(p => p.id === produtoId)
}

</script>

<style scoped>
.produtos {
  padding: 2rem;
}

.produto {
  display: inline-block;
  width: 160px;
  margin: 1rem;
  text-align: center;
}

.produto img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

.produto p {
  margin: 0.5rem 0;
}
.fav-btn {
  background: none;
  border: none;
  font-size: 1.4rem;
  color: #ccc;
  cursor: pointer;
  transition: transform 0.3s ease, color 0.3s ease;
  margin-top: 0.5rem;
}

.fav-btn.ativo {
  color: #ff5a5f;
  transform: scale(1.2);
}

.fav-btn:hover {
  transform: scale(1.1);
}

</style>
