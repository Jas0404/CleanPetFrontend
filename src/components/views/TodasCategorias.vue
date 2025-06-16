<template>
  <div class="categorias-page">
    <h1>🧩 Todas as Categorias</h1>
    <div class="grid">
      <div v-for="(grupo, key) in categorias" :key="key" class="grupo">
        <h2>
          <font-awesome-icon :icon="['fas', icones[key]]" class="icon" />
          {{ key.charAt(0).toUpperCase() + key.slice(1) }}
        </h2>
        <ul>
          <li v-for="cat in grupo" :key="cat.nome">
            <strong>{{ cat.nome }}</strong>
            <ul>
              <li v-for="sub in cat.subcategorias" :key="sub">
                <router-link
                  :to="`/produtos/${key}/${cat.nome.toLowerCase()}/${sub.toLowerCase().replace(/ /g, '-')}`"
                  class="sub-link"
                >
                  {{ sub }}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const icones = {
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
.categorias-page {
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
}

h1 {
  color: #0c4c2b;
  margin-bottom: 2rem;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  gap: 1.5rem;
}

.grupo {
  background: #f4fcf7;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #eee;
}

h2 {
  font-size: 1.2rem;
  color: #0c4c2b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  color: #688979;
}

.sub-link {
  color: #0c4c2b;
  text-decoration: none;
}

.sub-link:hover {
  text-decoration: underline;
  color: #22dc7c;
}
</style>
