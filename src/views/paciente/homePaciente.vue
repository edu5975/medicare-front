<template>
    <div class="container-fluid" id="main">
	<div class="row" style="background-color: #e6ffe6">
		<div class="col-md-12">
      <h3 style="color:green;margin-top:15px">Consultas con respuesta</h3>
      <div class="alert  alert-secondary" style="margin:auto;max-width:500px;margin-top:50px;text-align:center" v-if="!respondidas">
        <strong>Por el momento no tienes consultas sin abrir</strong>
      </div> 
      <ul class="list-group" style="max-width:80%; margin: auto">
       <div v-for="(obj,key) in consultas"  :key="key" >
        <li class="list-group-item d-flex justify-content-between align-items-center" v-if="obj.estado=='Con respuesta'">
          <label style="min-width:20%;max-width:20%; text-align:left">{{obj.descripcion}}</label> <label style="min-width:20%;max-width:20%; text-align:left">{{obj.sintomas}}...</label><label>{{obj.fecha.substring(0.10)}}</label><label hidden>{{respondidas=true}}</label>
          <span class="badge badge-primary badge-pill">
            <router-link :to="{path: '/paciente/consulta/detalle/'+obj.id}" class= "nav-link" style="color:white">Ver mas</router-link>
          </span> 
        </li>
      </div>
     </ul> 
    <hr style="margin-top:50px">
		</div>
	</div>



	<div class="row" style="background-color:#ffe6e6">
		<div class="col-md-12">
      <h3 style="color:red;margin-top:15px" >Consultas sin respuesta</h3>
      <div class="alert  alert-secondary" style="margin:auto;max-width:500px;margin-top:50px;text-align:center" v-if="!sinrespuesta">
        <strong>¡Hey! Parece no tienes consultas pendientes ¿Deseas realizar una?</strong><br>
        <button type="button" class="btn btn-primary btn-lg" style="margin-top:10px" @click="consulta()">Nueva Consulta</button>
      </div>
      <ul class="list-group" style="max-width:80%; margin: auto">
  <div v-for="(obj,key) in consultas"  :key="key" >
  <li class="list-group-item d-flex justify-content-between align-items-center" v-if="obj.estado=='Sin responder'">
      <label style="min-width:20%;max-width:20%; text-align:left">{{obj.descripcion}}</label> <label style="min-width:20%;max-width:20%; text-align:left">{{obj.sintomas}}...</label><label>{{obj.fecha}}</label><label hidden>{{sinrespuesta=true}}</label>
    <span class="badge badge-primary badge-pill">
            <router-link :to="{path: '/paciente/consulta/detalle/'+obj.id}" class= "nav-link" style="color:white">Ver mas</router-link>
          </span> 
  </li>
  </div>
  </ul> 
  <hr style="margin-top:50px">
		</div>
	</div>



	<div class="row" style="background-color:#ffffe6">
		<div class="col-md-12">
      <h3 style="color:gray;margin-top:15px">Consultas vistas</h3>
      <div class="alert  alert-secondary" style="margin:auto;max-width:500px;margin-top:50px;text-align:center" v-if="!historial">
        <strong>No tienes ninguna consulta en tu historial</strong>
      </div>
      <ul class="list-group" style="max-width:80%; margin: auto">
  <div v-for="(obj,key) in consultas"  :key="key" >
  <li class="list-group-item d-flex justify-content-between align-items-center" v-if="obj.estado=='Visto'">
      <label style="min-width:20%;max-width:20%; text-align:left">{{obj.descripcion}}</label> <label style="min-width:20%;max-width:20%; text-align:left">{{obj.sintomas}}...</label><label>{{obj.fecha}}</label><label hidden>{{historial=true}}</label>
    <span class="badge badge-primary badge-pill">
            <router-link :to="{path: '/paciente/consulta/detalle/'+obj.id}" class= "nav-link" style="color:white">Ver mas</router-link>
          </span> 
  </li>
  </div>
  </ul> 
   <hr>
		</div>
	</div>
</div>

</template>

<script>
import axios from 'axios';
import router from '../../router';


export default {
  data(){
    return{
      consultas: null,
      sinrespuesta: false,
      respondidas: false,
      historial: false,
      id: window.localStorage.getItem('id')

    }
  },
  beforeCreate(){
 
 
    if(window.localStorage.getItem('role')!=0){router.push('/lobby')}
    axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+window.localStorage.getItem('id')+'/consultas'      
                })
            .then(response=>{
              this.consultas=response.data;
            })
            .catch(error=>{
                console.log(error)
            })
  },
    methods: {
        consulta: function(){
            router.push('/paciente/consulta')
        }
    }
}
</script>

<style lang="css">
label{
   max-width:50%;
   max-height:25px;
   overflow:hidden;
}
</style>