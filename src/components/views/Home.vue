<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <!-- Carrossel -->
    <section class="carousel">
      <div class="carousel-images">
        <img :src="images[current]" alt="Banner promocional" />
      </div>
    </section>

    <!-- Benefícios -->
    <section class="benefits">
      <div class="benefit" v-for="(benefit, index) in benefits" :key="index">
        <img :src="benefit.icon" />
        <p>{{ benefit.text }}</p>
      </div>
    </section>

    <!-- Categorias -->
    <section class="categories">
      <h2>Categorias</h2>
      <div class="category-list">
        <router-link
          v-for="cat in categories"
          :key="cat.id"
          :to="`/produtos/${cat.id}`"
          class="category"
        >
          <font-awesome-icon :icon="['fas', cat.icone]" class="category-icon" />
          <span>{{ cat.nome }}</span>
        </router-link>
      </div>
    </section>

    <!-- Ofertas -->
    <section class="offers">
      <h2>Ofertas Especiais 🛍️</h2>
      <div class="offer-list">
        <div class="offer" v-for="offer in offers" :key="offer.id">
          <img :src="offer.imagem" />
          <p>{{ offer.nome }}</p>
          <strong> R$ {{ offer.preco }}</strong>
        </div>
      </div>
    </section>

    <!-- Destaques -->
    <section class="destaques">
      <h2>Destaques da Semana 🌟</h2>
      <div class="destaque-grid">
        <div class="destaque-item" v-for="(item, i) in destaques" :key="i">
          <img :src="item.img" />
          <h4>{{ item.nome }}</h4>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Depoimentos -->
    <section class="depoimentos">
      <h2>O que dizem sobre a Clean Pet 💬</h2>
      <div class="depoimento-lista">
        <div class="depoimento" v-for="(depo, i) in depoimentos" :key="i">
          <img :src="depo.avatar" />
          <p>"{{ depo.texto }}"</p>
          <span>- {{ depo.nome }}</span>
        </div>
      </div>
    </section>

    <!-- Motivos -->
    <section class="por-que">
      <h2>Por que escolher a Clean Pet? 🐾</h2>
      <div class="motivos">
        <div class="motivo" v-for="m in motivos" :key="m.texto">
          <font-awesome-icon :icon="['fas', m.icon]" class="motivo-icon" />
          <h4>{{ m.titulo }}</h4>
          <p>{{ m.texto }}</p>
        </div>
      </div>
    </section>

    <!-- Entrega -->
    <section class="delivery">
      <h2>Entrega Rápida</h2>
      <p>Receba seus produtos em casa com rapidez, segurança e carinho 💙</p>
    </section>

    <!-- Sobre -->
    <section class="about">
      <h2>Sobre a Clean Pet</h2>
      <p>
        Somos apaixonados por pets! 🐶🐱 Atendemos com amor e oferecemos os melhores produtos e serviços para o seu melhor amigo.
      </p>
    </section>

    <!-- Botão de voltar ao topo -->
    <button v-show="mostrarTopo" class="voltar-topo" @click="scrollParaTopo">
      <font-awesome-icon :icon="['fas', 'arrow-up']" class="icone-topo" />
    </button>
  </div>
</template>

<script setup>
import axios from 'axios'
import Swal from 'sweetalert2'
import { ref, onMounted, onUnmounted } from 'vue'

const images = ['Banners/banner1.png', 'Banners/banner2.jpg']
const current = ref(0)

const offers = ref([]) 
const categories = ref([]) 

onMounted(async () => {
  setInterval(() => {
    current.value = (current.value + 1) % images.length
  }, 3000)

  window.addEventListener('scroll', onScroll)

   try {
    const response = await axios.get('https://localhost:7074/api/produtos')
    offers.value = response.data
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    Swal.fire('Erro', 'Erro ao carregar os produtos!', 'error')
  }

  try {
    const response = await axios.get('https://localhost:7074/api/categorias')
    categories.value = response.data
  } catch (error) {
    console.error('Erro ao buscar categorias:', error)
    Swal.fire('Erro', 'Erro ao carregar os categorias!', 'error')
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const mostrarTopo = ref(false)
const onScroll = () => {
  mostrarTopo.value = window.scrollY > 300
}
const scrollParaTopo = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const benefits = [
  { icon: '/frete-gratis.png', text: 'Frete grátis acima de R$99' },
  { icon: '/icons/pix.png', text: '10% off no Pix' },
  { icon: '/entrega.png', text: 'Entrega rápida' }
]

// const categories = [
//   { name: 'Cães', slug: 'caes', icon: 'dog' },
//   { name: 'Gatos', slug: 'gatos', icon: 'cat' },
//   { name: 'Aves', slug: 'aves', icon: 'dove' },
//   { name: 'Peixes', slug: 'peixes', icon: 'fish' },
//   { name: 'Casa', slug: 'casa', icon: 'house-user' },
//   { name: 'Jardim', slug: 'jardim', icon: 'tree' },
//   { name: 'Piscina', slug: 'piscina', icon: 'water' }
// ]

// const offers = [
//   { name: 'Ração Premium 10kg', price: 'R$ 129,90', img: '/produtos/racao1.jpg' },
//   { name: 'Areia para gatos', price: 'R$ 39,90', img: '/produtos/areia.jpg' },
//   { name: 'Brinquedo Mordedor', price: 'R$ 19,90', img: '/produtos/brinquedo.jpg' }
// ]

const destaques = [
  { nome: 'Coleira personalizada', desc: 'Conforto e estilo.', img: '/produtos/coleira.jpg' },
  { nome: 'Casa para cães', desc: 'Resistente e espaçosa.', img: '/produtos/casa.jpg' },
  { nome: 'Arranhador Deluxe', desc: 'Para gatos ativos.', img: '/produtos/arranhador.jpg' }
]

const depoimentos = [
  { nome: 'Ana Clara', texto: 'Excelente atendimento e produtos de qualidade!', avatar: '/clientes/ana.jpg' },
  { nome: 'Rodrigo M.', texto: 'Meu pet adorou o serviço de banho!', avatar: '/clientes/rodrigo.jpg' },
  { nome: 'Letícia F.', texto: 'Entrega super rápida, recomendo muito.', avatar: '/clientes/leticia.jpg' }
]

const motivos = [
  { titulo: 'Qualidade Garantida', texto: 'Produtos e serviços testados e aprovados.', icon: 'check-circle' },
  { titulo: 'Atendimento Especializado', texto: 'Equipe pronta para cuidar do seu pet.', icon: 'user-md' },
  { titulo: 'Entrega Rápida', texto: 'Receba onde estiver, com agilidade.', icon: 'truck' }
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.home {
  padding: 2rem;
  padding-top: 1rem;
  font-family: 'Poppins', sans-serif;
}

.carousel-images {
  max-width: 1200px;
  margin: 0 auto;
}

.carousel img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
}

.benefits {
  display: flex;
  justify-content: space-around;
  margin: 2rem 0;
  text-align: center;
}

.benefit img {
  width: 40px;
  height: 40px;
}

.category-list {
  display: flex;
  gap: 2rem;
  justify-content: space-evenly;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.category {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #0c4c2b;
  transition: transform 0.3s;
}

.category-icon {
  font-size: 3rem;
  color: #688979;
  margin-bottom: 0.5rem;
}

.category:hover {
  transform: scale(1.05);
  color: #22dc7c;
}

.offers {
  margin: 2rem 0;
}

.offer-list {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.offer {
  width: 200px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
}

.offer img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

/* NOVAS SEÇÕES */

.destaques, .depoimentos, .por-que {
  background: #f4fcf7;
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  text-align: center;
}

.destaque-grid {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.destaque-item {
  background: white;
  width: 220px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  padding: 1rem;
  transition: 0.3s;
}

.destaque-item:hover {
  transform: scale(1.05);
}

.destaque-item img {
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-radius: 8px;
}

.depoimento-lista {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.depoimento {
  background: white;
  padding: 1rem;
  max-width: 250px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}

.depoimento img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.motivos {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.motivo {
  max-width: 220px;
}

.motivo-icon {
  font-size: 2.2rem;
  color: #22dc7c;
  margin-bottom: 0.5rem;
}

.delivery,
.about {
  background: #f4fcf7;
  padding: 2rem;
  border-radius: 10px;
  margin: 2rem 0;
  text-align: center;
  color: #0c4c2b;
}

.voltar-topo {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.voltar-topo:hover {
  transform: translateY(-4px);
}

.icone-topo {
  color: #688979;
}
</style>
