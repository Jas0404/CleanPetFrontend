<template>
  <div class="login-container">
    <h1>Login</h1>

    <form @submit.prevent="logar">
      <input v-model="email" type="email" placeholder="E-mail" required />

      <!-- Se chave não estiver ativa, mostra o campo de senha -->
      <input
        v-if="!usarChave"
        v-model="senha"
        type="password"
        placeholder="Senha"
        required
      />

      <!-- Campo de chave de acesso -->
      <input
        v-if="usarChave"
        v-model="chave"
        type="text"
        placeholder="Chave de acesso"
        required
      />

      <button type="submit">Entrar</button>
    </form>

    <button class="alt-login-btn" @click="ativarChave">
      {{ usarChave ? 'Voltar para login com senha' : 'Entrar com chave de acesso' }}
    </button>

    <p v-if="erro" class="erro-msg">{{ erro }}</p>
    <p v-if="mensagem" class="sucesso-msg">{{ mensagem }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const email = ref('')
const senha = ref('')
const chave = ref('')
const erro = ref('')
const mensagem = ref('')
const usarChave = ref(false)
const router = useRouter()

const ativarChave = async () => {
  usarChave.value = !usarChave.value
  erro.value = ''
  mensagem.value = ''

  // Quando usuário ativa a chave, pode simular envio da chave por email
  if (usarChave.value && email.value) {
    try {
      await axios.post('https://localhost:7154/api/usuarios/enviar-chave', {
        email: email.value
      })
      mensagem.value = 'Chave de acesso enviada para seu e-mail 📩'
    } catch (e) {
      erro.value = 'Erro ao enviar a chave. Verifique o e-mail.'
    }
  }
}

const logar = async () => {
  erro.value = ''
  mensagem.value = ''

  try {
    const endpoint = usarChave.value
      ? 'https://localhost:7154/api/usuarios/login-chave'
      : 'https://localhost:7154/api/usuarios/login'

    const payload = usarChave.value
      ? { email: email.value, chave: chave.value }
      : { email: email.value, senha: senha.value }

    const response = await axios.post(endpoint, payload)

    localStorage.setItem('usuario', JSON.stringify(response.data))
    router.push('/perfil')
  } catch (e) {
    erro.value = e.response?.data?.message || 'Falha ao autenticar!'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 420px;
  margin: 4rem auto;
  background: #f4fdf6;
  padding: 2rem;
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 6px 20px #0c452c;
}

h1 {
  text-align: center;
  color: #0c452c;
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

button {
  padding: 0.8rem;
  background-color: #0c452c;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background-color: #22dc7c;
  color: #0c452c;
}

.alt-login-btn {
  margin-top: 1rem;
  font-size: 0.9rem;
  background: none;
  border: none;
  color: #0c452c;
  text-decoration: underline;
  cursor: pointer;
}

.alt-login-btn:hover {
  color: #22dc7c;
}

.erro-msg {
  text-align: center;
  color: red;
  margin-top: 1rem;
}

.sucesso-msg {
  text-align: center;
  color: green;
  margin-top: 1rem;
}
</style>
