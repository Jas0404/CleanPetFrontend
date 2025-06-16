<template>
  <div class="pagamento-container">
    <h1>Pagamento</h1>

    <!-- Lista de Itens no Carrinho -->
    <div v-if="carrinho.length" class="resumo-carrinho">
      <h2>Resumo do Pedido 🛒</h2>
      <ul>
        <li v-for="(item, index) in carrinho" :key="index">
          <img :src="item.imagem" alt="produto" />
          <span>{{ item.nome }}</span>
          <strong>R$ {{ item.preco.toFixed(2) }}</strong>
        </li>
      </ul>
      <p class="total">Total: R$ {{ total.toFixed(2) }}</p>
    </div>

    <!-- Seleção de Pagamento -->
    <div class="forma-pagamento">
      <h2>Forma de Pagamento 💳</h2>
      <select v-model="formaSelecionada">
        <option value="cartao">Cartão de Crédito</option>
        <option value="pix">PIX</option>
        <option value="boleto">Boleto</option>
      </select>

      <!-- Formulário Cartão -->
      <div v-if="formaSelecionada === 'cartao'" class="form-cartao">
        <input v-model="dadosCartao.numero" placeholder="Número do cartão" />
        <input v-model="dadosCartao.nome" placeholder="Nome impresso" />
        <input v-model="dadosCartao.validade" placeholder="Validade (MM/AA)" />
        <input v-model="dadosCartao.cvv" placeholder="CVV" />
      </div>

      <!-- PIX -->
      <div v-if="formaSelecionada === 'pix'" class="form-pix">
        <p>Chave PIX gerada:</p>
        <strong>{{ chavePix }}</strong>
      </div>

      <!-- Boleto -->
      <div v-if="formaSelecionada === 'boleto'" class="form-boleto">
        <p>Seu boleto será gerado após a finalização.</p>
        <p><strong>Linha Digitável:</strong> {{ linhaDigitavel }}</p>
      </div>

      <!-- Botão de Finalizar -->
      <button @click="finalizarPagamento">Finalizar Pagamento</button>

      <p v-if="mensagem" class="mensagem">{{ mensagem }}</p>
    </div>
  </div>
</template>

<script setup>
// 📦 Imports
import { ref, computed } from 'vue'

// ✅ Carrinho simulado com dados existentes
const carrinho = ref(JSON.parse(localStorage.getItem('carrinho')) || [])

// 💰 Total do pedido
const total = computed(() => carrinho.value.reduce((acc, item) => acc + item.preco, 0))

// 🧾 Formas de pagamento
const formaSelecionada = ref('cartao')

// 💳 Dados do cartão de crédito (simulação)
const dadosCartao = ref({
  numero: '',
  nome: '',
  validade: '',
  cvv: ''
})

// 🔐 Dados fictícios para PIX e boleto
const chavePix = 'cleanpet@pix.com'
const linhaDigitavel = '23793.38128 60002.345678 43000.123456 7 82320000010000'

// 💬 Mensagem de retorno ao usuário
const mensagem = ref('')

// ✅ Simulação de finalização de pagamento
function finalizarPagamento() {
  if (formaSelecionada.value === 'cartao') {
    if (!dadosCartao.value.numero || !dadosCartao.value.nome || !dadosCartao.value.validade || !dadosCartao.value.cvv) {
      mensagem.value = 'Preencha todos os dados do cartão!'
      return
    }
  }

  mensagem.value = `Pagamento via ${formaSelecionada.value.toUpperCase()} realizado com sucesso!`
  // Aqui você pode esvaziar o carrinho ou redirecionar
}
</script>

<style scoped>
.pagamento-container {
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  max-width: 800px;
  margin: auto;
}

h1, h2 {
  color: #0c4c2b;
}

.resumo-carrinho ul {
  list-style: none;
  padding: 0;
}

.resumo-carrinho li {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
}

.resumo-carrinho img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.total {
  font-weight: bold;
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #22dc7c;
}

.forma-pagamento {
  margin-top: 2rem;
}

select, input {
  display: block;
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

button {
  background-color: #0c4c2b;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background-color: #22dc7c;
  color: #0c4c2b;
}

.mensagem {
  margin-top: 1rem;
  font-weight: bold;
  color: #0c4c2b;
}
</style>
