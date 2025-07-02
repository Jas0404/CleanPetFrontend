<template>
  <div class="cadastro-container">
    <h1>Espaço Pet</h1>
    <p class="subtitulo">Cadastre aqui seu companheiro de patas com muito carinho 💚</p>

    <form @submit.prevent="salvarPet">
      <!-- FOTO DO PET -->
      <div class="foto-container">
        <input type="file" accept="image/*" @change="previewFoto" id="foto" hidden />
        <label for="foto">
          <div class="foto-preview" v-if="fotoPreview">
            <img :src="fotoPreview" alt="Foto do pet" />
          </div>
          <div class="foto-placeholder" v-else>
            <font-awesome-icon :icon="['fas', 'camera']" />
            <p>Adicionar Foto</p>
          </div>
        </label>
      </div>

      <!-- Escolha visual da espécie -->
      <section class="especies">
        <h3>Escolha a espécie</h3>
        <div class="especie-grid">
          <div
            v-for="opcao in especies"
            :key="opcao.nome"
            :class="['especie-card-img', { ativa: form.especie === opcao.nome }]"
            @click="form.especie = opcao.id"
          >
            <img :src="opcao.imagem" :alt="opcao.imagem" />
            <span>{{ opcao.nome }}</span>
          </div>
        </div>
      </section>

      <!-- Campos de dados -->
      <section class="form-grid">
        <input v-model="form.nome" type="text" placeholder="Nome do Pet" required />

        <!-- Raça com preview -->
        <div class="raca-select">
          <select
            v-model="form.raca"
            :disabled="!form.especie"
            :class="{ desabilitado: !form.especie }"
          >
            <option disabled value="">
              {{ form.especie ? 'Selecione a raça' : 'Escolha uma espécie' }}
            </option>
            <option v-for="r in racasDisponiveis" :key="r.nome" :value="r.nome">
              {{ r.nome }}
            </option>
          </select>

          <!-- Exibe ícone se houver raça selecionada -->
          <div class="raca-preview" v-if="form.raca">
            <img
              v-if="racasDisponiveis.find(r => r.nome === form.raca)?.icon"
              :src="racasDisponiveis.find(r => r.nome === form.raca).icon"
              :alt="form.raca"
            />
          </div>
        </div>

        <input v-model="form.idade" type="number" placeholder="Idade (anos)" min="0" />
        <input v-model="form.peso" type="number" placeholder="Peso (kg)" step="0.1" min="0" />
        <input v-model="form.tamanho" type="number" placeholder="Altura (cm)" step="1" min="0" />
        <input v-model="form.cor" type="text" placeholder="Cor do Pelo" />
        <select v-model="form.pelo">
          <option disabled value="">Tamanho do Pelo</option>
          <option>Curto</option>
          <option>Médio</option>
          <option>Longo</option>
          <option>Sem pelo</option>
        </select>
      </section>

      <!-- Observações -->
      <textarea v-model="form.obs" rows="4" placeholder="Observações (opcional)" />

      <!-- Botão -->
      <button type="submit">Salvar Pet</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const form = ref({
  nome: '',
  especie: '',
  raca: '',
  idade: '',
  peso: '',
  tamanho: '',
  cor: '',
  pelo: '',
  obs: '',
  foto: null
})

const fotoPreview = ref(null)

const previewFoto = (event) => {
  const file = event.target.files[0]
  if (file) {
    form.value.foto = file
    fotoPreview.value = URL.createObjectURL(file)
  }
}

const especies = ref([])
const racasPorEspecie = ref([])

onMounted(async () => {
  try {
    const response = await axios.get('https://localhost:7074/api/animal')
    especies.value = response.data
  } catch (error) {
    console.error('Erro ao buscar espécies:', error)
    Swal.fire('Erro', 'Erro ao carregar as espécies!', 'error')
  }
})

// 🔁 Sempre que a espécie mudar, busca as raças dela
watch(() => form.value.especie, async (novaEspecie) => {
  console.log(form.value)
  if (novaEspecie) {
    try {
      const response = await axios.get(`https://localhost:7074/api/raca/por-animal/${novaEspecie}`)
      racasPorEspecie.value = response.data
      form.value.raca = '' // limpa seleção anterior
    } catch (error) {
      console.error('Erro ao buscar raças:', error)
      Swal.fire('Erro', 'Erro ao carregar as raças!', 'error')
    }
  } else {
    racasPorEspecie.value = []
    form.value.raca = ''
  }
})

const racasDisponiveis = computed(() => racasPorEspecie.value)

const salvarPet = () => {
  console.log('🐾 Pet cadastrado com sucesso:', form.value)
  alert(`Pet ${form.value.nome} cadastrado com sucesso! 🐾`)
}
</script>

<style scoped>
.cadastro-container {
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fdfdfd;
  border-radius: 12px;
  box-shadow: 0 8px 20px #0c4c2b;
  font-family: 'Poppins', sans-serif;
  color: #0c4c2b;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.subtitulo {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1rem;
  color: #688979;
}

section {
  margin-bottom: 1.5rem;
}

/* FOTO DO PET */
.foto-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.foto-preview img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #0c4c2b;
  box-shadow: 0 2px 8px #4cffa2;
  transition: transform 0.2s ease;
}

.foto-preview img:hover {
  transform: scale(1.05);
}

.foto-placeholder {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: #e0e0e0;
  border: 2px dashed #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #0c4c2b;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.foto-placeholder:hover {
  background-color: #e6f1ec;
}

.foto-placeholder svg {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

/* ESPÉCIES */
.especies h3 {
  margin-bottom: 1rem;
}

.especie-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.especie-card-img {
  cursor: pointer;
  width: 120px;
  text-align: center;
  transition: transform 0.2s ease, border 0.3s;
  border: 2px solid transparent;
  border-radius: 12px;
  overflow: hidden;
  background: #f0f0f0;
  padding: 0.5rem;
}

.especie-card-img img {
  width: 80%;
  height: 90px;
  object-fit: contain;
  border-radius: 8px;
}

.especie-card-img span {
  display: block;
  margin-top: 0.5rem;
  font-weight: 500;
  color: #0c4c2b;
}

.especie-card-img:hover {
  transform: scale(1.05);
}

.especie-card-img.ativa {
  border: 2px solid #2b915c;
  background: #e6f7f0;
}

/* FORMULÁRIO */
.form-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

input, select, textarea {
  padding: 0.75rem;
  border: 1px solid #0c4c2b;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
}

button {
  width: 100%;
  padding: 0.9rem;
  font-size: 1.1rem;
  background: #0c4c2b;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  transition: background 0.3s ease;
  margin-top: 1rem;
}

button:hover {
  background: #22dc7c;
}
select.desabilitado {
  background-color: #f5f5f5;
  color: #aaa;
  cursor: not-allowed;
}
.raca-select {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start; 
  color: #0c4c2b;
}

.raca-select select {
  width: 100%;
}

.raca-preview {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.raca-preview img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  border-radius: 10px;
  background: #f5f5f5;
  border: 1px solid #ddd;
}


</style>
