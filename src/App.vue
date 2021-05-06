<template>

<div>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
<router-link to="/" class="navbar-brand"><img alt="MediCare logo" src="@/assets/images/logo.png" style="width:200px;margin-bottom:10px">
</router-link> |

  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
      
      <li  class="nav-item" v-if="admin || medico || paciente" >
        <router-link to="/lobby" class= "nav-link">Inicio</router-link>
      </li> 
      <li  class="nav-item" v-if="paciente" >
        <router-link to="/paciente/perfil" class= "nav-link">Perfil</router-link>
      </li>
      <li  class="nav-item" v-if="medico" >
        <router-link to="/medico/perfil" class= "nav-link">Perfil</router-link>
      </li>
      <li  class="nav-item" v-if="admin" >
        <router-link to="/admin/pacientes" class= "nav-link">Pacientes</router-link>
      </li>  
      <li  class="nav-item" v-if="admin" >
        <router-link to="/admin/medicos" class= "nav-link">Medicos</router-link>
      </li>            
      <li  class="nav-item" v-if="admin" >
        <router-link to="/admin/alergias" class= "nav-link">Alergias</router-link>
      </li>        
      <li  class="nav-item" v-if="admin" >
        <router-link to="/admin/cirugias" class= "nav-link">Cirugias</router-link>
      </li>
      <li  class="nav-item" v-if="admin" >
        <router-link to="/admin/enfermedades" class= "nav-link">Enfermedades</router-link>
      </li>
      <li  class="nav-item" v-if="admin" >
        <router-link to="/admin/especialidades" class= "nav-link">Especialidades</router-link>
      </li>
      <li  class="nav-item" v-if="admin" >
        <router-link to="/admin/medicamentos" class= "nav-link">Medicamentos</router-link>
      </li>
      <li  class="nav-item" v-if="admin" >
        <router-link to="/admin/servicios" class= "nav-link">Servicios</router-link>
      </li>
      <li  class="nav-item" v-if="admin" >
        <router-link to="/admin/ventas" class= "nav-link">Ventas</router-link>
      </li>
      <li  class="nav-item" v-if="admin" >
        <router-link to="/admin/covid" class= "nav-link">Covid</router-link>
      </li>
      <li  class="nav-item" v-if="admin" >
        <router-link to="/admin/consultas" class= "nav-link">Consultas</router-link>
      </li>
      <li  class="nav-item" v-if="medico" >
        <router-link to="/medico/servicios" class= "nav-link">Servicios</router-link>
      </li>
      <li  class="nav-item" v-if="!admin" >
        <router-link to="/medicos" class= "nav-link">Busqueda de Medicos</router-link>
      </li>
      <li  class="nav-item" v-if="paciente" >
        <router-link to="/paciente/consulta" class= "nav-link">Nueva Consulta</router-link>
      </li>
      <li  class="nav-item" v-if="paciente" >
        <router-link to="/pedidos" class= "nav-link">Pedidos</router-link>
      </li>
      <li  class="nav-item" >
        <router-link to="/tienda" class= "nav-link">Tienda</router-link>
      </li>      
      <li  class="nav-item" >
        <router-link to="/covid" class= "nav-link">Covid</router-link>
      </li>
      

      
      

      
      
      
    </ul>
    <ul class="navbar-nav my-2 my-lg-0">
      <li class="nav-item" v-if="paciente">
          <router-link to="/carrito" class= "nav-link">
          <img src="@/assets/images/carro.png" title="Ir al Carrito" style="width:30px" />
          </router-link>
        </li>
      <li class="nav-item">
        <router-link v-if="!logged" to="/login" class= "nav-link">Iniciar Sesión</router-link>
        <router-link v-if="logged" to="/logout" class= "nav-link">
        <img src="@/assets/images/logout.png" style="width:30px" title="Cerrar Sesion"/>
        </router-link>
      </li>
    </ul>
  </div>
</nav>
  
  <router-view/>

</div>

</template>


<script>

export default {
  data(){
    return{
      logged: false,
      admin: false,
      paciente: false,
      medico: false,
    }
  },
  created(){
    this.logged=window.localStorage.getItem('id');
    if(window.localStorage.getItem('role')==2){
      this.admin=true;
    }else{this.admin=false;}

    if(window.localStorage.getItem('role')==1){
      this.medico=true;
    }else{this.medico=false;}

    if(window.localStorage.getItem('role')==0){
      this.paciente=true;
    }else{this.paciente=false;}

  }

    
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
