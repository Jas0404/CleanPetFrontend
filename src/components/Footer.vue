<template>
  <footer class="footer">
    <div class="footer-wrapper">
      <!-- COLUNA 1: Logo, descrição e links -->
      <div class="footer-col">
        <img src="/Logo.png" alt="Clean Pet" class="footer-logo" />
        <p class="footer-desc"> 
          Tudo o que seu pet precisa, em um só lugar 🐾
        </p>
        <nav class="footer-links">
          <router-link to="/">Início</router-link>
          <router-link to="/servicos">Serviços</router-link>
          <router-link to="/cadastro-pet">Espaço Pet</router-link>
          <router-link to="/categorias">Categorias</router-link>
          <router-link to="/favoritos">Favoritos</router-link>
          <router-link to="/carrinho">Carrinho</router-link>
        </nav>
      </div>

      <!-- COLUNA 2: Endereço, mapa, direitos -->
      <div class="footer-col">
        <h4>Nosso Endereço</h4>
        <iframe
          src="https://www.google.com/maps?q=Rua+São+José,+Sabar,+Roça+Grande+de+Santo+Antônio,+Minas+Gerais,+Belo+Horizonte,+Brasil&output=embed"
          allowfullscreen
          loading="lazy"
        ></iframe>
        <div class="footer-copy">
          <p>© 2025 Clean Pet. Todos os direitos reservados.</p>
          <p><a href="mailto:atendimento@cleanpet.com.br">atendimento@cleanpet.com.br</a></p>
        </div>
      </div>

<!-- COLUNA 3: Formas de pagamento + Redes sociais -->
<div class="footer-col payment">
  <h4>Formas de Pagamento</h4>
  <div class="card-images">
    <img
      v-for="(pagamento, index) in formasPagamento"
      :key="index"
      :src="pagamento.src"
      :alt="pagamento.nome"
    />
  </div>

  <!-- Redes sociais dentro da mesma coluna -->
  <h4>Redes Sociais</h4>
  <div class="social-icons">
    <a href="https://wa.me/+5531971603062" target="_blank" class="icon whatsapp">
      <font-awesome-icon :icon="['fab', 'whatsapp']" />
    </a>
    <a href="https://www.facebook.com/cleanpet" target="_blank" class="icon facebook">
      <font-awesome-icon :icon="['fab', 'facebook']" />
    </a>
    <a href="https://www.instagram.com/040.ladeira" target="_blank" class="icon instagram">
      <font-awesome-icon :icon="['fab', 'instagram']" />
    </a>
    <a href="https://www.tiktok.com/@050.ladeira" target="_blank" class="icon tiktok">
      <font-awesome-icon :icon="['fab', 'tiktok']" />
    </a>
  </div>
</div>
    </div>

  </footer>
</template>
<script setup>
const formasPagamento = [
  { nome: 'Visa', imagem: '/public/PIX.png'  },
  { nome: 'MasterCard', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/MasterCard-logo.svg' },
  { nome: 'PayPal', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/PayPal_logo_2014.svg' },
  { nome: 'American Express', src: 'https://upload.wikimedia.org/wikipedia/commons/3/35/American_Express_logo_%282013%29.svg' }
]
</script>

<style scoped>
.footer {
  background:  #0c452c;
  color: white;
  padding: 2rem 1rem;
  font-family: 'Poppins', sans-serif;
  position: relative;
}

.footer-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.footer-col {
  flex: 1;
  min-width: 250px;
}

.footer-logo {
  width: 120px;
  margin-bottom: 0.0rem; /* ⬅️ Reduzido */
}

.footer-desc {
  font-size: 1rem;
  color: #f7e4e4;
  line-height: 1.4;      /* ⬅️ Mais compacto */
}


.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

}

.footer-links a {
  color: #f4fcf7;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #ffd700;
}

/* Mapa e direitos */
iframe {
  width: 100%;
  height: 160px;
  border-radius: 10px;
  border: none;
  margin-bottom: 1rem;
}

.footer-copy {
  font-size: 0.85rem;
  color: #d3f5e3;
}

.footer-copy a {
  color: #d3f5e3;
  text-decoration: underline;
}

/* Pagamento */
.payment h4 {
  margin-bottom: 0.5rem;
}

.card-images {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
}

.card-images img {
  height: 32px;
  transition: transform 0.3s ease;
}

.card-images img:hover {
  transform: scale(1.1);
}

/* Redes sociais fixas na lateral esquerda */
.social-icons {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 1.5rem;
}


.icon {
  font-size: 1.8rem;
  color: white;
  transition: transform 0.3s ease, color 0.3s ease;
}

.icon:hover {
  transform: scale(1.2) rotate(10deg);
}


.whatsapp:hover {
  color: #25d366;
}

.facebook:hover {
  color: #1877f2;
}

.instagram:hover {
  color: #e1306c;
}

.tiktok:hover {
  color: #000;
}

/* Responsivo */
@media (max-width: 768px) {
  .footer-wrapper {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  .social-icons {
    position: static;
    flex-direction: row;
    justify-content: center;
    margin-top: 2rem;
  }
}
</style>
