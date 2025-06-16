<template>
  <div v-if="isOpen" class="sidebar-overlay" @click="fecharSidebar">
    <aside class="sidebar" @click.stop>
      <h3 class="title">🐾 Bem-vindo à Clean Pet!</h3>
      <ul>
        <li v-for="(animal, key) in categorias" :key="key">
          <button @click="toggleAnimal(key)">
            <font-awesome-icon :icon="['fas', iconesAnimais[key]]" class="animal-icon" />
            <span class="seta" :class="{ rotacionada: aberto === key }">▶</span>
            {{ key.charAt(0).toUpperCase() + key.slice(1) }}
          </button>

          <ul v-if="aberto === key">
            <li v-for="cat in animal" :key="cat.nome">
              <button @click="toggleCategoria(cat.nome)">
                <span class="seta pequeno" :class="{ rotacionada: subAberto === cat.nome }">▶</span>
                {{ cat.nome }}
              </button>

              <ul v-if="subAberto === cat.nome">
                <li v-for="sub in cat.subcategorias" :key="sub">
                  <router-link
                    :to="`/produtos/${key}/${cat.nome.toLowerCase()}/${sub.toLowerCase().replace(/ /g, '-')}`"
                    class="sub-link"
                    @click="$emit('close')"
                  >
                    {{ sub }}
                  </router-link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>

      <hr />

      <!-- Espaço Pet -->
      <router-link to="/cadastro-pet" class="sub-link" @click="$emit('close')">
        <font-awesome-icon icon="paw" class="animal-icon" />
        Espaço Pet
      </router-link>

      <!-- Todas as categorias -->
      <router-link to="/categorias" class="sub-link">
        <font-awesome-icon icon="th-large" class="animal-icon" />
        Ver todas as categorias
      </router-link>
      <!-- Serviços -->
      <router-link to="/servicos" class="sub-link">
        <font-awesome-icon icon="briefcase-medical" class="animal-icon" />
         Serviços
      </router-link>
      <!-- Agenda -->
      <router-link to="/agenda" class="sub-link">
        <font-awesome-icon icon="calendar-alt" class="animal-icon" />
        Minha Agenda
      </router-link>
      <!-- Perfil -->
      <router-link to="/perfil" class="sub-link">
        <font-awesome-icon icon="user" />
        Meu Perfil
      </router-link>




<router-link to="/pagamento" class="sub-link">
 Pagamento
</router-link>

    </aside>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps(['isOpen'])
const emit = defineEmits(['close'])

const aberto = ref('')
const subAberto = ref('')

const fecharSidebar = () => emit('close')

const toggleAnimal = (animal) => {
  aberto.value = aberto.value === animal ? '' : animal
  subAberto.value = ''
}

const toggleCategoria = (categoria) => {
  subAberto.value = subAberto.value === categoria ? '' : categoria
}

const categorias = {
  cachorros: [
    { nome: 'Ração', subcategorias: ['Ração seca', 'Ração úmida'] },
    { nome: 'Petiscos', subcategorias: ['Ossinhos', 'Snacks'] },
    { nome: 'Roupas', subcategorias: ['Camisetas', 'Casacos'] },
    { nome: 'Acessórios', subcategorias: ['Coleiras', 'Camas'] }
  ],
  gatos: [
    { nome: 'Ração', subcategorias: ['Ração premium', 'Ração úmida'] },
    { nome: 'Higiene', subcategorias: ['Areia sanitária', 'Pazinha'] },
    { nome: 'Brinquedos', subcategorias: ['Arranhadores', 'Ratinhos'] }
  ],
  aves: [
    { nome: 'Alimentação', subcategorias: ['Sementes', 'Frutas secas'] },
    { nome: 'Gaiolas', subcategorias: ['Gaiolas grandes', 'Gaiolas pequenas'] }
  ],
  peixes: [
    { nome: 'Ração', subcategorias: ['Peixes tropicais', 'Peixes ornamentais'] },
    { nome: 'Aquários', subcategorias: ['Pequenos', 'Grandes'] }
  ],
  casa: [
    { nome: 'Decoração', subcategorias: ['Tapetes', 'Vasos', 'Quadros'] },
    { nome: 'Lavanderia', subcategorias: ['Sabão', 'Amaciante', 'Organizadores'] },
    { nome: 'Utilidades', subcategorias: ['Panela', 'Vassoura', 'Baldes'] }
  ],
  jardim: [
    { nome: 'Plantas', subcategorias: ['Suculentas', 'Orquídeas'] },
    { nome: 'Ferramentas', subcategorias: ['Tesouras', 'Pás', 'Regadores'] }
  ],
  piscina: [
    { nome: 'Produtos', subcategorias: ['Cloro', 'Limpeza'] },
    { nome: 'Acessórios', subcategorias: ['Boias', 'Redes', 'Bombas'] }
  ]
}

const iconesAnimais = {
  cachorros: 'dog',
  gatos: 'cat',
  aves: 'dove',
  peixes: 'fish',
  casa: 'house-user',
  jardim: 'tree',
  piscina: 'water'
}
</script>


<style scoped>
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0,0,0,0.4);
  z-index: 998;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  background-color: #0c4c2b;
  z-index: 999;
  padding: 1.5rem 1rem;
  overflow-y: auto;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.3);
}

.title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #fff;
}

ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

li {
  margin-bottom: 0.5rem;
}

button {
  background: none;
  border: none;
  font-weight: 500;
  color: #f4fcf7;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  padding: 0.3rem 0;
  transition: background 0.3s;
}

button:hover {
  color: #22dc7c;
}

.sub-link {
  display: block;
  color: #f4fcf7;
  padding-left: 1.5rem;
  text-decoration: none;
  margin: 0.25rem 0;
  transition: color 0.2s;
}

.sub-link:hover {
  color: #22dc7c;
  text-decoration: underline;
}

.seta {
  transition: transform 0.3s ease;
  display: inline-block;
}

.seta.rotacionada {
  transform: rotate(90deg);
}

.seta.pequeno {
  font-size: 0.85rem;
}

.animal-icon {
  color: #688979;
  font-size: 1.2rem;
}
</style>
