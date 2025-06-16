<template>
    <div class="produto-card">
      <img :src="produto.imagem" alt="produto" />
      <h3>{{ produto.nome }}</h3>
      <p>R$ {{ produto.preco.toFixed(2) }}</p>
      <button @click="$emit('adicionar', produto)">Adicionar ao carrinho</button>
    </div>
  </template>
  
  <script setup>
  defineProps(['produto'])
  defineEmits(['adicionar'])
  </script>
  
  <style scoped>
  .produto-card {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 1rem;
    width: 200px;
    text-align: center;
    background: #fff;
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
  