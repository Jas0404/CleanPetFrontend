<template>
    <div class="animal-page">
      <h1>🐟 Produtos para Peixes</h1>
      <div class="produto-list">
        <ProdutoCard
          v-for="produto in produtos"
          :key="produto._id"
          :produto="produto"
          @adicionar="adicionarAoCarrinho"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import ProdutoCard from '../ProdutoCard.vue'
  
  const produtos = ref([])
  const carrinho = ref(JSON.parse(localStorage.getItem('carrinho')) || [])
  
  onMounted(async () => {
    const res = await fetch('http://localhost:3000/produtos/animal/peixe')
    produtos.value = await res.json()
  })
  
  function adicionarAoCarrinho(produto) {
    carrinho.value.push(produto)
    localStorage.setItem('carrinho', JSON.stringify(carrinho.value))
    alert(`${produto.nome} adicionado ao carrinho!`)
  }
  </script>
  
  <style scoped>
  .animal-page {
    padding: 2rem;
    margin-top: 60px;
  }
  .produto-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  </style>
  