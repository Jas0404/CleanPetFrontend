// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'

// FontAwesome
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons'
library.add(faCheckCircle, faCircle)

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUser, faHeart, faShoppingBag, faSignInAlt, faUserPlus,
  faArrowUp, faHouseUser, faTree, faWater, faThLarge,
  faDog, faCat, faDove, faFish, faPaw, faOtter, faHippo,
  faBriefcaseMedical, faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'
import {
  faWhatsapp, faFacebook, faInstagram, faTiktok
} from '@fortawesome/free-brands-svg-icons'

// Diretiva de máscara (vue-the-mask)
import { mask } from 'vue-the-mask'

// 1. Adiciona ícones à biblioteca
library.add(
  faUser, faHeart, faShoppingBag, faSignInAlt, faUserPlus,
  faArrowUp, faHouseUser, faTree, faWater, faThLarge,
  faDog, faCat, faDove, faFish, faPaw, faOtter, faHippo,
  faBriefcaseMedical, faCalendarAlt,
  faWhatsapp, faFacebook, faInstagram, faTiktok
)

// 2. Cria app, registra componentes e diretivas
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.directive('mask', mask) // ✅ diretiva v-mask corretamente registrada
app.use(router)

app.mount('#app')
