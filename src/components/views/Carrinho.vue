<template>
    <div class="carrinho">
      <h1>Meu Carrinho</h1>
      <div v-if="carrinho.length === 0">
        <p>Seu carrinho está vazio 😿</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="(item, index) in carrinho" :key="index">
            <img :src="item.imagem" width="80" />
            <span>{{ item.nome }}</span> - R$ {{ item.preco.toFixed(2) }}
            <button @click="remover(index)">Remover</button>
          </li>
        </ul>
        <h3>Total: R$ {{ total.toFixed(2) }}</h3>
        
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue'
  
  const carrinho = ref(JSON.parse(localStorage.getItem('carrinho')) || [])
  
  const total = computed(() =>
    carrinho.value.reduce((acc, item) => acc + item.preco, 0)
  )
  
  function remover(index) {
    carrinho.value.splice(index, 1)
  }
  
  watch(carrinho, () => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho.value))
  }, { deep: true })
  </script>
  
  <style scoped>
  .carrinho {
    padding: 2rem;
    margin-top: 60px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #ccc;
    padding-bottom: 0.5rem;
  }
  button {
    background-color: red;
    color: white;
    padding: 0.3rem 0.6rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  