<template>
  <div class="cadastro-container">
    <h1>🐾 Criar Conta</h1>

    <form @submit.prevent="cadastrar">
      <input v-model="nome" type="text" placeholder="Nome completo" required />

      <input
        v-model="cpf"
        v-mask="'###.###.###-##'"
        type="text"
        placeholder="CPF"
        required
      />

      <!-- Nascimento com limite de 15 anos -->
      <input
        v-model="nascimento"
        :max="dataMaxima"
        type="date"
        required
        class="input-date"
      />
      <small v-if="nascimento" class="data-formatada">
        <font-awesome-icon icon="calendar-alt" /> {{ dataFormatada }}
      </small>

      <input
        v-model="celular"
        v-mask="'(##) #####-####'"
        type="tel"
        placeholder="Celular"
        required
      />

      <input v-model="email" type="email" placeholder="Seu e-mail" required />
      <input v-model="login" type="text" placeholder="Seu login" required />
      <input v-model="senha" type="password" placeholder="Senha" required />
      <input v-model="confirmar" type="password" placeholder="Confirmar senha" required />

      <!-- Validação visual da senha -->
      <ul class="senha-requisitos">
        <li :class="{ ok: senhaRegras.tamanho }">
          <font-awesome-icon :icon="senhaRegras.tamanho ? 'check-circle' : 'circle'" />
          Pelo menos 8 caracteres
        </li>
        <li :class="{ ok: senhaRegras.maiuscula }">
          <font-awesome-icon :icon="senhaRegras.maiuscula ? 'check-circle' : 'circle'" />
          Pelo menos 1 letra maiúscula
        </li>
        <li :class="{ ok: senhaRegras.numero }">
          <font-awesome-icon :icon="senhaRegras.numero ? 'check-circle' : 'circle'" />
          Pelo menos 1 número
        </li>
        <li :class="{ ok: senhaRegras.iguais }">
          <font-awesome-icon :icon="senhaRegras.iguais ? 'check-circle' : 'circle'" />
          Senhas iguais
        </li>
      </ul>

      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import Swal from 'sweetalert2'
import { maska } from 'vue-the-mask'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Form state
const nome = ref('')
const cpf = ref('')
const nascimento = ref('')
const celular = ref('')
const email = ref('')
const login = ref('')
const senha = ref('')
const confirmar = ref('')
const router = useRouter()

// Regras de senha
const senhaRegras = computed(() => ({
  tamanho: senha.value.length >= 8,
  maiuscula: /[A-Z]/.test(senha.value),
  numero: /\d/.test(senha.value),
  iguais: senha.value === confirmar.value && senha.value.length > 0
}))

// Computa a data máxima permitida (15 anos atrás)
const dataMaxima = computed(() => {
  const hoje = new Date()
  hoje.setFullYear(hoje.getFullYear() - 15)
  return hoje.toISOString().split('T')[0]
})

// Data formatada em português
const dataFormatada = computed(() => {
  if (!nascimento.value) return ''
  const data = new Date(nascimento.value)
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
})

// Cadastro com validação e SweetAlert2
const cadastrar = async () => {
  const idadeMinima = new Date()
  idadeMinima.setFullYear(idadeMinima.getFullYear() - 15)

  if (new Date(nascimento.value) > idadeMinima) {
    Swal.fire('Aviso', 'Você precisa ter no mínimo 15 anos para se cadastrar.', 'warning')
    return
  }

  if (senha.value !== confirmar.value) {
    Swal.fire('Aviso', 'As senhas não coincidem.', 'warning')
    return
  }

  try {
    await axios.post('https://localhost:7074/api/usuarios', {
      nome: nome.value,
      cpf: cpf.value,
      nascimento: nascimento.value,
      NumCelular: celular.value,
      email: email.value,
      senha: senha.value,
      Login: login.value,
    })

    Swal.fire('Sucesso', 'Usuário cadastrado com sucesso! Redirecionando para o login...', 'success')

    setTimeout(() => {
      router.push('/login')
    }, 2000)

  } catch (e) {
    Swal.fire('Erro', e.response?.data?.message || 'Erro ao cadastrar. Tente novamente.', 'error')
  }
}
</script>

<style scoped>
.cadastro-container {
  max-width: 500px;
  margin: 3rem auto;
  background-color: #f4fdf6;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px #0c452c;
  font-family: 'Poppins', sans-serif;
}

h1 {
  color: #0c452c;
  text-align: center;
  margin-bottom: 1.5rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.input-date {
  background-color: #fff;
  color: #0c452c;
}

input:focus {
  outline: none;
  border-color: #0c452c;
  box-shadow: 0 0 0 2px #22dc7c66;
}

.data-formatada {
  color: #0c452c;
  font-size: 0.9rem;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

button {
  background-color: #0c452c;
  color: white;
  border: none;
  padding: 0.8rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #158f50;
  color: #0c452c;
}

.senha-requisitos {
  list-style: none;
  padding: 0.5rem 0 1rem;
  font-size: 0.85rem;
  color: #888;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-top: -0.5rem;
}

.senha-requisitos li {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.senha-requisitos li.ok {
  color: #0c452c;
  font-weight: 600;
}
</style>
