<!-- src/components/views/Produtos.vue -->
<template>
  <div class="produtos">
    <!-- <h2>{{ animal }} > {{ categoria }} > {{ subcategoria }}</h2>
    <p>
      Aqui você verá os produtos de <strong>{{ subcategoria }}</strong> para <strong>{{ animal }}</strong>! 🐾
    </p> -->

    <!-- <div class="produto" v-for="produto in produtos" :key="produto.id">
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
    </div> -->

    <h3>Produtos Disponíveis</h3>
    <div class="produtos-lista" v-if="produtos.length">
      <div class="produto-card" v-for="produto in produtos" :key="produto.id">
        <img :src="produto.imagem || '/default.jpg'" alt="produto" />
        <h3>{{ produto.nome }}</h3>
        <p>R$ {{ produto.preco.toFixed(2) }}</p>
        <button @click="adicionarAoCarrinho(produto)">Adicionar ao carrinho</button>
      </div>
    </div>
    <p v-else>Nenhum produto disponível no momento.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'

const route = useRoute()
//console.log(route.params);
const animal = route.params.animal
const categoria = route.params.idcategoria
//const subcategoria = route.params.subcategoria.replace(/-/g, ' ')

const produtos = ref([])
const servicos = ref([])

onMounted(async () => {
  try {
    const produtosResponse = await axios.get(
      `https://localhost:7074/api/produtos/filtro/${categoria}`
    )
    produtos.value = produtosResponse.data
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    Swal.fire('Erro', 'Erro ao buscar produtos!', 'error')
  }

  try {
    const servicoResponse = await axios.get('https://localhost:7074/api/servicos')
    servicos.value = servicoResponse.data
  } catch (error) {
    console.error('Erro ao buscar serviços:', error)
    Swal.fire('Erro', 'Erro ao buscar serviços!', 'error')
  }
})

const toggleFavorito = (produto) => {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
  const index = favoritos.findIndex((p) => p.id === produto.id)

  if (index >= 0) {
    favoritos.splice(index, 1)
    Swal.fire('Removido dos Favoritos', '', 'info')
  } else {
    favoritos.push(produto)
    Swal.fire('Adicionado aos Favoritos!', '', 'success')
  }

  localStorage.setItem('favoritos', JSON.stringify(favoritos))
  window.dispatchEvent(new Event('storage'))
}

const isFavorito = (produtoId) => {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
  return favoritos.some((p) => p.id === produtoId)
}

const adicionarAoCarrinho = (servico) => {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
  carrinho.push(servico)
  localStorage.setItem('carrinho', JSON.stringify(carrinho))

  Swal.fire({
    title: 'Adicionado!',
    text: `${servico.nome} foi adicionado ao carrinho.`,
    icon: 'success',
    timer: 1200,
    showConfirmButton: false,
  })

  window.dispatchEvent(new Event('storage'))
}
</script>

<style scoped>
.produtos {
  padding: 2rem;
}

/* Produtos */
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

/* Serviços (Cards estilo ProdutosCard.vue) */
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

.produto-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.produto-card button {
  margin-top: 1rem;
  background-color: #00bcd4;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.produto-card button:hover {
  background-color: #009fb1;
}
</style>
