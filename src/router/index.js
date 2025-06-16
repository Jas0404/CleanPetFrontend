// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'

import Home from '../components/views/Home.vue'
import Login from '../components/views/Login.vue'
import Cachorros from '../components/views/Cachorros.vue'
import Gatos from '../components/views/Gatos.vue'
import Aves from '../components/views/Aves.vue'
import Peixes from '../components/views/Peixes.vue'
import Produtos from '../components/views/Produtos.vue'
import Carrinho from '../components/views/Carrinho.vue'
import Favoritos from '../components/views/Favoritos.vue'
import Cadastro from '../components/views/Cadastro.vue'
import Pagamentos from '../components/views/Pagamentos.vue'
import Perfil from '../components/views/Perfil.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/caes', component: Cachorros },
  { path: '/gatos', component: Gatos },
  { path: '/aves', component: Aves },
  { path: '/peixes', component: Peixes },
  { path: '/carrinho', component: Carrinho },
  { path: '/favoritos', component: Favoritos },
  { path: '/cadastro', component: Cadastro },
  {
    path: '/categorias',
    name: 'TodasCategorias',
    component: () => import('../components/views/TodasCategorias.vue')
  },
  {
    path: '/produtos/:animal/:categoria/:subcategoria',
    name: 'Produtos',
    component: Produtos
  },
  {
    path: '/cadastro-pet',
    name: 'CadastroPet',
    component: () => import('../components/views/CadastroPet.vue')
  },
  {
    path: '/servicos',
    name: 'Servicos',
    component: () => import('../components/views/Servicos.vue')
  },
  {
    path: '/agenda',
    name: 'MinhaAgenda',
    component: () => import('../components/views/MinhaAgenda.vue')
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil
  },
  {
    path: '/pagamentos',
    name: 'Pagamentos',
    component: Pagamentos
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../components/views/Admin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ Proteção da rota do admin
router.beforeEach((to, from, next) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  if (to.path.startsWith('/admin')) {
    // Somente email específico pode acessar /admin
    if (usuario && usuario.email === 'admin@cleanpet.com') {
      next()
    } else {
      next('/') // Redireciona para home
    }
  } else {
    next()
  }
})

export default router
