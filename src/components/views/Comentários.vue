<!-- src/components/views/Comentarios.vue -->
<template>
  <div class="comentarios-container">
    <h1>Comentários 🐾</h1>

    <form @submit.prevent="adicionarComentario">
      <input v-model="nome" placeholder="Seu nome" required />
      <textarea v-model="texto" placeholder="Deixe seu comentário" required />
      <button type="submit">Enviar</button>
    </form>

    <div class="comentario" v-for="(c, index) in comentarios" :key="index">
      <strong>{{ c.nome }}</strong>
      <p>{{ c.texto }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const nome = ref('')
const texto = ref('')
const comentarios = ref([])

onMounted(() => {
  const salvos = JSON.parse(localStorage.getItem('comentarios') || '[]')
  comentarios.value = salvos
})

function adicionarComentario() {
  const novo = { nome: nome.value, texto: texto.value }
  comentarios.value.unshift(novo)
  localStorage.setItem('comentarios', JSON.stringify(comentarios.value))

  nome.value = ''
  texto.value = ''
}
</script>

<style scoped>
.comentarios-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f4fcf7;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
  font-family: 'Poppins', sans-serif;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input, textarea {
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button {
  background-color: #0c452c;
  color: white;
  border: none;
  padding: 0.8rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #22dc7c;
  color: #0c452c;
}

.comentario {
  background: white;
  padding: 1rem;
  margin-top: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}
</style>
