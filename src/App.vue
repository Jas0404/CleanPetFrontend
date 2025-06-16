<template>
  <div id="app">
    <Navbar @toggle-sidebar="toggleSidebar" @search="buscarTermo" />

    <div class="layout">
      <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />

      <div class="main-container" :class="{ 'with-sidebar': sidebarOpen }">
        <main class="main-content">
          <router-view :termo="termoBusca" />
        </main>
           <button v-show="mostrarTopo" class="voltar-topo" @click="scrollParaTopo">
      
    </button>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'

const sidebarOpen = ref(false)
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

// Termo de pesquisa vindo do Navbar
const termoBusca = ref('')
const buscarTermo = (termo) => {
  termoBusca.value = termo
}



const mostrarTopo = ref(false)

const onScroll = () => {
  mostrarTopo.value = window.scrollY > 300
}

const scrollParaTopo = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>


<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
}

/* Flex layout abaixo da navbar */
.layout {
  display: flex;
  flex: 1;
  width: 100%;
}

/* container principal com conteúdo e footer */
.main-container {
  flex: 1;
  transition: margin-left 0.3s;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 100px); /* ajusta conforme altura real da navbar */
  width: 100%;
  box-sizing: border-box;
}

/* aplica espaço lateral se sidebar estiver aberta */
.with-sidebar {
  margin-left: 260px; /* mesma largura da sidebar */
}

/* espaço do conteúdo principal */
.main-content {
  flex: 1;
  padding: 2rem;
  width: 100%;
}
.voltar-topo {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #0c4c2b;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.voltar-topo:hover {
  background-color: #22dc7c;
  opacity: 1;
  transform: translateY(-4px);
}


.voltar-topo:hover {
  background-color: #22dc7c;
}
html {
  scroll-behavior: smooth;
}

</style>
