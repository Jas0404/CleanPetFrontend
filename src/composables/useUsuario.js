// src/composables/useUsuario.js
import { ref } from 'vue'

const usuario = ref(JSON.parse(localStorage.getItem('usuario') || 'null'))

export function useUsuario() {
  const estaLogado = ref(!!usuario.value)

  const login = (dados) => {
    usuario.value = dados
    localStorage.setItem('usuario', JSON.stringify(dados))
    estaLogado.value = true
  }

 const logout = () => {
  usuario.value = null
  localStorage.removeItem('usuario')
  estaLogado.value = false
  window.location.href = '/' // recarrega e reseta
}

  return {
    usuario,
    estaLogado,
    login,
    logout
  }
}
