<template>
<div>
    <div v-if="!serv">
        <div class="alert alert-dismissible alert-primary" style="margin: 25px">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Aun no tienes ofreces ningun servicio, ve a opcion "SERVICIOS" en el menu y agrega algunos de lo contrario los pacientes no podran encontrarte :(</strong>
</div>
    </div>



    	<div class="row" style="background-color: #e6ffe6">
		<div class="col-md-12">
      <h3 style="color:green;margin-top:15px">Consultas disponibles</h3>
      <div class="alert  alert-secondary" style="margin:auto;max-width:500px;margin-top:50px;text-align:center" v-if="!avaiable">
        <strong>Por el momento no hay consultas disponibles</strong>
      </div> 
      <ul class="list-group" style="max-width:80%; margin: auto">
       <div v-for="(obj,key) in consultasdisponibles"  :key="key" >
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <label style="min-width:20%;max-width:20%; text-align:left">{{obj.paciente}}</label> <label style="min-width:20%;max-width:20%;max-height:50%; text-align:left">{{obj.sintomas.slice(50)}}...</label>
          <span class="badge badge-primary badge-pill">
            <router-link :to="{path: '/medico/consulta/detalle/'+obj.id}" class= "nav-link" style="color:white">Ver mas</router-link>
          </span> 
        </li>
      </div>
     </ul> 
    <hr style="margin-top:50px">
		</div>
	</div>


  	<div class="row" style="background-color:#ffffe6">
		<div class="col-md-12">
      <h3 style="color:gray;margin-top:15px">Tus consultas</h3>
      <div class="alert  alert-secondary" style="margin:auto;max-width:500px;margin-top:50px;text-align:center" v-if="!asigned">
        <strong>Aun no tienes ninguna consulta, echa un vistazo a las consultas disponibles</strong>
      </div>
      <ul class="list-group" style="max-width:80%; margin: auto">
  <div v-for="(obj,key) in misconsultas"  :key="key" >
  <li class="list-group-item d-flex justify-content-between align-items-center" style="">
      <label style="min-width:20%;max-width:20%;text-align:left;">{{obj.paciente}}</label> <label style="min-width:20%;max-width:20%; text-align:left">{{obj.sintomas}}...</label>
    <span class="badge badge-primary badge-pill">
            <router-link :to="{path: '/medico/consulta/detalle/asignadas/'+obj.idConsultas}" class= "nav-link" style="color:white">Ver mas</router-link>
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

export default{
    data(){
      return{
        serv: null,
        misconsultas: null,
        consultasdisponibles: null,
        especialidad: '',
        avaiable: false,
        asigned: false
      }
    },
    beforeCreate(){
      if(window.localStorage.getItem('role')!=1){router.push('/lobby')}
        axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/medicos/'+window.localStorage.getItem('id'),
                })
            .then(response=>{
                this.especialidad=response.data.idEspecialidades;
                this.Avaiable();
            })
            .catch(error=>{
                
                console.log(error)
            })

            axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/medicos/'+window.localStorage.getItem('id')+"/consultas",
                })
            .then(response=>{
                this.misconsultas=response.data;
                this.asigned=true;
                console.log(this.misconsultas);
            })
            .catch(error=>{
                this.asigned=false;
                console.log(error)
            })
    },
    created(){
      this.List();
    },

    methods: {
        List: function(){
           axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/medicos/'+window.localStorage.getItem('id')+'/servicios',
                })
            .then(response=>{
              this.serv=response.data;
            })
            .catch(error=>{
              console.log("error")  
            }) 
        },
        Avaiable: function(){
          axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/consultas/especialidades/'+this.especialidad,
                })
            .then(response=>{
              this.consultasdisponibles=response.data;
              this.avaiable=true;
            })
            .catch(error=>{
              console.log(error) 
              this.avaiable=false;
            }) 
        }
    }
}
</script>

<style lang="css">
label{
   max-width:50%;
   max-height:45px;
   overflow:hidden;
}
</style>
