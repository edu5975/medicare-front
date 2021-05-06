<template>
  <div class="">
  <h1 class="display-3">¡Bienvenido!</h1>
  <p class="lead"><h3>MediCare es una plataforma para ayudarte a ti y a tu familia a mantenerse sanos.</h3></p>
  
  
    <img alt="consulta online" src="../assets/images/consulta.jpg" style="width:50%;border-radius:25px">
    <blockquote class="blockquote text-center">
    <br>
  <p class="mb-0">Gracias a nuestra extensa red de medicos y proveedores <br> puedes realizar tus consultas de manera online
    sin tener que salir de casa</p>
</blockquote>
   
  <hr class="my-4">
  <p class="text-secondary" v-if="!logged" >¡Echa un vistazo! Crea una cuenta o inicia sesion.</p>
  <p class="lead" v-if="!logged" >
    <router-link class="btn btn-primary btn-lg" to="/login" role="button">Comenzar</router-link>
  </p>
</div>

</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data: ()=>({
    logged: false,
  }),
  created(){
    if(window.localStorage.getItem('logged')=='true'){this.logged=true}else{this.logged=false}
  }
}
</script>
