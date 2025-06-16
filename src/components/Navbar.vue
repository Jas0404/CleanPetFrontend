<template>
  <header class="navbar">
    <button class="menu-btn" @click="$emit('toggle-sidebar')">☰</button>

    <router-link to="/">
      <img src="/Logo.png" alt="Clean Pet" class="logo" />
    </router-link>

    <div class="grid"></div>

    <div id="poda">
      <div class="glow"></div>
      <div class="darkBorderBg"></div>
      <div class="darkBorderBg"></div>
      <div class="darkBorderBg"></div>
      <div class="white"></div>
      <div class="border"></div>

      <div id="main">
        <input
  v-model="termo"
  @input="emit('search', termo)"
  placeholder="Buscar produtos..."
  type="text"
  name="text"
  class="input"
/>
        <div id="input-mask"></div>
        <div id="pink-mask"></div>
        <div class="filterBorder"></div>
        <div id="filter-icon">
          <svg
    preserveAspectRatio="none"
    height="27"
    width="27"
    viewBox="4.8 4.56 14.832 15.408"
    fill="none"
  >
    <path
      d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z"
      stroke="#d6d6e6"
      stroke-width="1"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
        </div>
        <div id="search-icon">
          <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    viewBox="0 0 24 24"
    stroke-width="2"
    stroke-linejoin="round"
    stroke-linecap="round"
    height="24"
    fill="none"
    class="feather feather-search"
  >
    <circle stroke="url(#search)" r="8" cy="11" cx="11"></circle>
    <line
      stroke="url(#searchl)"
      y2="16.65"
      y1="22"
      x2="16.65"
      x1="22"
    ></line>
    <defs>
      <linearGradient gradientTransform="rotate(50)" id="search">
        <stop stop-color="#f8e7f8" offset="0%"></stop>
        <stop stop-color="#b6a9b7" offset="50%"></stop>
      </linearGradient>
      <linearGradient id="searchl">
        <stop stop-color="#b6a9b7" offset="0%"></stop>
        <stop stop-color="#837484" offset="50%"></stop>
      </linearGradient>
    </defs>
  </svg>
        </div>
      </div>
    </div>

    <div class="nav-icons">
     <router-link to="/favoritos" class="nav-icon" title="Favoritos">
  <font-awesome-icon icon="heart" />
  <span v-if="favoritosCount > 0" class="badge">{{ favoritosCount }}</span>
</router-link>


 <router-link to="/carrinho" class="nav-icon" title="Carrinho">
  <font-awesome-icon icon="shopping-bag" />
  <span v-if="carrinhoCount > 0" class="badge">{{ carrinhoCount }}</span>
</router-link>

      <!-- Ícone de perfil com menu -->
      <div class="nav-icon" v-if="estaLogado">
  <router-link to="/perfil" class="nav-icon" title="Perfil">
    <font-awesome-icon icon="user" />
  </router-link>
</div>

<!-- Se não estiver logado -->
<label class="popup nav-icon" title="Entrar" v-else>
  <input type="checkbox" v-model="popupAberto" />
  <div tabindex="0" class="burger">
    <svg viewBox="0 0 24 24" fill="white" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z"
      />
    </svg>
  </div>

  <nav class="popup-window">
    <legend>Conta</legend>
    <ul>
      <li>
        <router-link to="/login" @click="fecharPopup">
          <button>
            <font-awesome-icon icon="sign-in-alt" />
            <span>Login</span>
          </button>
        </router-link>
      </li>
      <li>
        <router-link to="/cadastro" @click="fecharPopup">
          <button>
            <font-awesome-icon icon="user-plus" />
            <span>Criar Conta</span>
          </button>
        </router-link>
      </li>
    </ul>
  </nav>
</label>



    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const termo = ref('')
const emit = defineEmits(['search'])

const favoritosCount = ref(0)
const carrinhoCount = ref(0)

const usuario = ref(null)
const estaLogado = computed(() => !!usuario.value)

const router = useRouter()

// Novo: estado do popup
const popupAberto = ref(false)

// Fecha o popup
function fecharPopup() {
  popupAberto.value = false
  const checkbox = document.querySelector('.popup input[type="checkbox"]')
  if (checkbox) checkbox.checked = false
}

const atualizarContadores = () => {
  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || []
  favoritosCount.value = favoritos.length

  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
  carrinhoCount.value = carrinho.length
}

const verificarUsuario = () => {
  const userData = localStorage.getItem('usuario')
  usuario.value = userData ? JSON.parse(userData) : null
}

onMounted(() => {
  atualizarContadores()
  verificarUsuario()

  window.addEventListener('storage', () => {
    atualizarContadores()
    verificarUsuario()
  })
  window.addEventListener('focus', () => {
    atualizarContadores()
    verificarUsuario()
  })
})
</script>

<style scoped>
.navbar {
  height: 100px;
  background-color: #0c452c;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  gap: 1rem;
  z-index: 1000;
}

.menu-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 20px;
}

.logo {
  height: 150px;
  margin-left: 1rem;
  margin-top: 30px;
}



.white,
.border,
.darkBorderBg,
.glow {
  max-height: 70px;
  max-width: 314px;
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
  z-index: -1;
  border-radius: 12px;
  filter: blur(3px);
}

.input {
  background-color: #b5c3bd ;
  border: none;
  width: 301px;
  height: 56px;
  border-radius: 10px;
  color: #0c4c2b;
  padding-inline: 59px;
  font-size: 18px;
}

#poda {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  margin-left: 1rem;
}

.input::placeholder {
  color: #0c4c2b;
}

.input:focus {
  outline: none;
}

#main:focus-within > #input-mask {
  display: none;
}

#input-mask {
  pointer-events: none;
  width: 100px;
  height: 20px;
  position: absolute;
  background: linear-gradient(90deg, transparent, );
  top: 18px;
  left: 70px;
}

#pink-mask {
  pointer-events: none;
  width: 30px;
  height: 20px;
  position: absolute;
  background: #0c452c;
  top: 10px;
  left: 5px;
  filter: blur(20px);
  opacity: 0.8;
  /* animation: leftright 4s ease-in infinite; */
  transition: all 2s;
}

#main:hover > #pink-mask {
  /* animation: rotate 4s linear infinite; */
  opacity: 0;
}

.white {
  max-height: 63px;
  max-width: 307px;
  border-radius: 10px;
  filter: blur(2px);
}

.white::before {
  content: "";
  z-index: -2;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(83deg);
  position: absolute;
  width: 600px;
  height: 600px;
  background-repeat: no-repeat;
  background-position: 0 0;
  filter: brightness(1.4);
  background-image: conic-gradient(
    #f3000000 0%,
    #05ff50,
    #00000000 8%,
    #00000000 50%,
    #22dc7c ,
    #fa171700 58%
  );
  /* animation: rotate 4s linear infinite; */
  transition: all 2s;
}

.border {
  max-height: 59px;
  max-width: 303px;
  border-radius: 11px;
  filter: blur(0.5px);
}

.border::before {
  content: "";
  z-index: -2;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(70deg);
  position: absolute;
  width: 600px;
  height: 600px;
  filter: brightness(1.3);
  background-repeat: no-repeat;
  background-position: 0 0;
  background-image: conic-gradient(
    #1c191c,
    #688979   5%,
    #1c191c 14%,
    #1c191c 50%,
    #688979   60%,
    #1c191c 64%
  );
  /* animation: rotate 4s 0.1s linear infinite; */
  transition: all 2s;
}

.darkBorderBg {
  max-height: 65px;
  max-width: 312px;
}

.darkBorderBg::before {
  content: "";
  z-index: -2;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(82deg);
  position: absolute;
  width: 600px;
  height: 600px;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-image: conic-gradient(
    rgba(0, 0, 0, 0),
    #22dc7c ,
    rgba(0, 0, 0, 0) 10%,
    rgba(0, 0, 0, 0) 50%,
    #22dc7c ,
    rgba(0, 0, 0, 0) 60%
  );
  transition: all 2s;
}

/* Hover Animations */

#poda:hover > .darkBorderBg::before {
  transform: translate(-50%, -50%) rotate(-98deg);
}
#poda:hover > .glow::before {
  transform: translate(-50%, -50%) rotate(-120deg);
}
#poda:hover > .white::before {
  transform: translate(-50%, -50%) rotate(-97deg);
}
#poda:hover > .border::before {
  transform: translate(-50%, -50%) rotate(-110deg);
}

/* Focus-within Animations */

#poda:focus-within > .darkBorderBg::before {
  transform: translate(-50%, -50%) rotate(442deg);
  transition: all 4s;
}
#poda:focus-within > .glow::before {
  transform: translate(-50%, -50%) rotate(420deg);
  transition: all 4s;
}
#poda:focus-within > .white::before {
  transform: translate(-50%, -50%) rotate(443deg);
  transition: all 4s;
}
#poda:focus-within > .border::before {
  transform: translate(-50%, -50%) rotate(430deg);
  transition: all 4s;
}

.glow {
  overflow: hidden;
  filter: blur(30px);
  opacity: 0.4;
  max-height: 130px;
  max-width: 354px;
}

.glow:before {
  content: "";
  z-index: -2;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(60deg);
  position: absolute;
  width: 999px;
  height: 999px;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-image: conic-gradient(
    #000,
    #402fb5 5%,
    #000 38%,
    #000 50%,
    #cf30aa 60%,
    #000 87%
  );
  /* animation: rotate 4s 0.3s linear infinite; */
  transition: all 2s;
}

/* Keyframes */

@keyframes rotate {
  100% {
    transform: translate(-50%, -50%) rotate(450deg);
  }
}

@keyframes leftright {
  0% {
    transform: translate(0px, 0px);
    opacity: 1;
  }
  49% {
    transform: translate(250px, 0px);
    opacity: 0;
  }
  80% {
    transform: translate(-40px, 0px);
    opacity: 0;
  }
  100% {
    transform: translate(0px, 0px);
    opacity: 1;
  }
}

#filter-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  max-height: 40px;
  max-width: 38px;
  height: 100%;
  width: 100%;
  isolation: isolate;
  overflow: hidden;
  border-radius: 10px;
  background: linear-gradient(180deg, #0c452c, black, #0c452c);
  border: 1px solid transparent;
}

.filterBorder {
  height: 42px;
  width: 40px;
  position: absolute;
  overflow: hidden;
  top: 7px;
  right: 7px;
  border-radius: 10px;
}

.filterBorder::before {
  content: "";
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(90deg);
  position: absolute;
  width: 600px;
  height: 600px;
  background-repeat: no-repeat;
  background-position: 0 0;
  filter: brightness(1.35);
  background-image: conic-gradient(
    rgba(0, 0, 0, 0),
    #3d3a4f,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0) 50%,
    #3d3a4f,
    rgba(0, 0, 0, 0) 100%
  );
  animation: rotate 4s linear infinite;
}

#main {
  position: relative;
}

#search-icon {
  position: absolute;
  left: 20px;
  top: 15px;
}

/* Empurra o login pra direita */
.login-link {
  margin-left: auto;
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding-left: 1.5rem;
  padding-right: 0.5rem;
}

.login-link:hover {
  text-decoration: underline;
}

.nav-icons {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.nav-icon {
  position: relative;
  color: white;
  font-size: 1.3rem;
  text-decoration: none;
}

.nav-icon:hover {
  color: #ffd700; /* dourado leve */
}

.badge {
  position: absolute;
  top: -6px;
  right: -8px;
  background-color: #ff5a5f;
  color: white;
  font-size: 0.6rem;
  padding: 2px 6px;
  border-radius: 50%;
  font-weight: bold;
}

/* login link visível e destacado */
.login-link {
  color: white;
  font-weight: bold;
  margin-left: 0.8rem;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}

/* RESPONSIVIDADE SMART SEM EMPILHAR */
@media (max-width: 768px) {
  .navbar {
    flex-wrap: nowrap; /* impede quebra */
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
  }

  .logo {
    height: 60px;
  }

  .input {
    width: 180px;
    font-size: 0.9rem;
    padding-inline: 40px;
  }

  .nav-icon {
    font-size: 1.1rem;
  }

  .login-link {
    font-size: 0.9rem;
  }
}
/* Garante que Navbar e Footer usem toda a largura da tela */
.navbar {
  width: 100%;
  max-width: 100vw;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.popup {
  position: relative;
  display: inline-block;
}

.popup input {
  display: none;
}

.popup .burger {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 20px;
}

.popup .popup-window {
  transform: scale(0);
  transform-origin: top right;
  opacity: 0;
  position: absolute;
  top: 35px;
  right: 0;
  background: white;
  color: #222;
  border: 1px solid #ddd;
  border-radius: 5px;
  z-index: 999;
  transition: all 0.2s ease;
  padding: 0.5rem 0.75rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.popup input:checked ~ .popup-window {
  transform: scale(1);
  opacity: 1;
}

.popup-window ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.popup-window li {
  margin-bottom: 0.4rem;
}

.popup-window button {
  border: none;
  background: none;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #0c452c;
}

.popup-window button:hover {
  text-decoration: underline;
}

</style>