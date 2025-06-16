<template>
  <div class="login-container">
    <h1>Login</h1>

    <form @submit.prevent="logar">
      <input v-model="email" type="email" placeholder="E-mail" required />

      <input
        v-if="!usarChave"
        v-model="senha"
        type="password"
        placeholder="Senha"
        required
      />

      <input
        v-if="usarChave"
        v-model="chave"
        type="text"
        placeholder="Chave de acesso"
        required
      />

      <button :disabled="carregando" type="submit">
        {{ carregando ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>

    <button class="alt-login-btn" @click="ativarChave">
      {{ usarChave ? 'Voltar para login com senha' : 'Entrar com chave de acesso' }}
    </button>

    <p v-if="mensagem" class="sucesso-msg">{{ mensagem }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const email = ref('')
const senha = ref('')
const chave = ref('')
const mensagem = ref('')
const usarChave = ref(false)
const carregando = ref(false)
const router = useRouter()

const ativarChave = async () => {
  usarChave.value = !usarChave.value
  mensagem.value = ''

  if (usarChave.value && email.value) {
    try {
      await axios.post('https://localhost:7154/api/usuarios/enviar-chave', {
        email: email.value
      })
      mensagem.value = 'Chave de acesso enviada para seu e-mail 📩'
    } catch {
      Swal.fire('Erro', 'Erro ao enviar a chave. Verifique o e-mail.', 'error')
    }
  }
}

const logar = async () => {
  mensagem.value = ''
  carregando.value = true

  try {
    let response

    if (usarChave.value) {
      response = await axios.post('https://localhost:7154/api/usuarios/login-chave', {
        email: email.value,
        chave: chave.value
      })
    } else {
      response = await axios.post('https://localhost:7074/api/login/autenticar', {
        login: email.value,
        senha: senha.value
      })
    }

    localStorage.setItem('usuario', JSON.stringify(response.data))
    router.push('/perfil')
  } catch (e) {
    const msg = e.response?.data?.message || 'Falha ao autenticar!'
    Swal.fire('Erro', msg, 'error')
  } finally {
    carregando.value = false
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

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
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

.sucesso-msg {
  text-align: center;
  color: green;
  margin-top: 1rem;
}
</style>
