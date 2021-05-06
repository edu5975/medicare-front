<template>
<div style="max-width: 50%; margin:auto">
    <legend>Busqueda de Medicos</legend>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
           <div class="form-group">
              <label>Pais</label>
              <select class="custom-select"  style="width:100%" v-model="pais" @change="state()">
                  <option  v-bind:value="{id: '0', nombre: ''}">Cualquier pais</option>
                  <option v-for="(obj,key) in JsonPaises"  :key="key" v-bind:value="{id: key, nombre: obj.name}">{{obj.name}}</option>
              </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>Estado</label>
            <select class="custom-select"  style="width:100%" v-model="estado" @change="getMedico()">
              <option  value="0">Cualquier estado</option>
              <option v-for="(obj,key) in JsonEstados"  :key="key" :value="obj.name">{{obj.name}}</option>            
          </select>
          </div> 
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Especialidad</label>
            <select class="custom-select" v-model="especialidad" @change="getMedico()">
              <option  value="0">Cualquier especialidad</option>
              <option v-for="(obj,key) in Json"  :key="key" :value="obj.id">{{obj.descripcion}}</option>      
          </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label>Servicio</label>
            <select class="custom-select" v-model="servicio" @change="getMedico()">
          <option class="custom-select" value="0" >Cualquier servicio</option>
            <option v-for="(obj,key) in servicios"  :key="key" :value="obj.id">{{obj.descripcion}}</option>
          </select>
          </div>
        </div>
      </div>
    </div>

    
    <hr>
    <legend>Listado de Medicos</legend>
    <div class="form-group" v-for="(obj,key) in medicos"  :key="key">
        
    <div class="card mb-3">
  <h3 class="card-header">{{obj.nombres+' '+obj.apellidoMaterno+' '+obj.apellidoPaterno}}</h3>
  <div class="card-body">
    <h5 class="card-title">Nombre</h5>
    <h6 class="card-subtitle text-muted">{{obj.nombres+' '+obj.apellidoMaterno+' '+obj.apellidoPaterno}}</h6>
  </div>
  
  
  <ul class="list-group list-group-flush">
    <li class="list-group-item">{{'Telefono: '+obj.telefono}}</li>
    <li class="list-group-item" style="color:blue;cursor:pointer" @click="correo(obj.email)">{{'Email: '+obj.email}}</li>
    <li class="list-group-item">{{'Pais: '+obj.pais}}</li>
    <li class="list-group-item">{{'Estado: '+obj.estado}}</li>
    <li class="list-group-item">{{'Municipio: '+obj.municipio}}</li>
  </ul>
 
</div>
<hr>
  </div>



    </div>
</template>


<script>
import axios from 'axios';
import router from '../../router';

export default{
    data(){
        return{
            Json: null,
            JsonEstados: null,
            JsonPaises: null,
            servicios: null,
            medicos: null,
            pais: {id: '0',
                    nombre: ''},
            estado: '0',
            especialidad: '0',
            servicio: "0"
        }
    },
    beforeCreate(){
        axios({
                method: 'get',
                url: 'https://countriesnow.space/api/v0.1/countries/states'
                })
            .then(response=>{
              this.JsonPaises=response.data.data;  
               
            })
            .catch(error=>{
                console.log(error)
            })

        
        axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/especialidades'
                })
            .then(response=>{
              this.Json=response.data;
                
                
            })
            .catch(error=>{
                console.log(error)
            })
            axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/servicios',
                })
            .then(response=>{
              this.servicios=response.data;
            
            })
            .catch(error=>{
                
            })

            axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/medicos',
                })
            .then(response=>{
              this.medicos=response.data;
            
            })
            .catch(error=>{
                
            })
    },
    methods:{
      correo: function(email){
        var mail='mailto:'+email;
        console.log(mail)
        window.open(mail);
      },
        state: function(){
      var id=this.pais.id;
      this.getMedico();
      
      
      this.JsonEstados=this.JsonPaises[id].states
    },
    getMedico: function(){
        var bpais;
        var bestado;
        var bespecialidad;
        var bservicio;
        
        if(this.pais.id=='0'){bpais=''}else{bpais=this.pais.nombre}
        if(this.estado=='0'){bestado=''}else{bestado=this.estado}
        if(this.especialidad=='0'){bespecialidad=''}else{bespecialidad=this.especialidad}
        if(this.servicio=='0'){bservicio=''}else{bservicio=this.servicio}

        var body={
            pais: bpais,
            estado: bestado,
            idEspecialidades: bespecialidad,
            servicios: bservicio,
        }
        console.log(body)
        axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/medicos/busqueda',
                data: body
                })
            .then(response=>{
              this.medicos=response.data;    
              console.log(this.medicos);
            })
            .catch(error=>{
                this.medicos=null;
                $.alert("Ups! Parece que no hay medicos con las caracteristicas que solicitas")
            })
    }
    }
}
</script>