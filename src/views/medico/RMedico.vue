<template>
    <div style="width:60%; margin: auto; margin-top:50px;margin-bottom:50px">
        
    
  <fieldset style="margin-left:0px;text-align:left">
    <legend>Registro de Medico</legend>
    <div class="form-group">
      <label>Nombres</label>
      <input type="text" class="form-control" v-model="nombres" placeholder="Ingresa uno o mas nombres">
    </div>
    <div class="form-group">
      <label>Apellido Paterno</label>
      <input type="text" class="form-control" v-model="apaterno" placeholder="Ingresa tu apellido paterno">
    </div>
    <div class="form-group">
      <label>Apellido Materno</label>
      <input type="text" class="form-control" v-model="amaterno" placeholder="Ingresa tu apellido materno">
    </div>

    <div class="form-group">
      <label>Especialidad</label>
      <select class="custom-select" v-model="especialidad">
      <option v-for="(obj,key) in Json"  :key="key" v-bind:value="{id: obj.id, desc: obj.descripcion}">{{obj.descripcion}}</option>
      
    </select>
    </div>
    <div class="form-group">
      <label>Cedula Profesional</label>
      <input type="text" class="form-control" v-model="cedula" placeholder="Ingresa el numero de cedula">
    </div>
    <hr class="my-4">
    <div class="row">
		<div class="col-md-6">
            <div class="form-group">
            <label>Dirección</label>
            <input type="text" class="form-control" v-model="direccion" placeholder="Ingresa tu dirección">
            </div>
		</div>
		<div class="col-md-6">
             <div class="form-group">
      <label>Pais</label>
      <select class="custom-select"  style="width:100%" v-model="pais" @change="state()">
      <option v-for="(obj,key) in JsonPaises"  :key="key" v-bind:value="{id: key, nombre: obj.name}">{{obj.name}}</option>
      
    </select>
    </div>
            
		</div>
	</div>
	<div class="row">
		<div class="col-md-6">
            <div class="form-group">
      <label>Estado</label>
      <select class="custom-select"  style="width:100%" v-model="estado" >
      <option v-for="(obj,key) in JsonEstados"  :key="key" :value="obj.name">{{obj.name}}</option>
      
    </select>
    </div> 
		</div>
        <div class="col-md-6">
            <div class="form-group">
            <label>Municipio</label>
            <input type="text" class="form-control" v-model="municipio" placeholder="Ingresa tu municipio">
             </div>
        </div>
    </div>
    <div class="row">
		<div class="col-md-6">
            <div class="form-group">
             <label>Numero de Telefono</label>
             <input type="text" class="form-control" v-model="telefono" placeholder="Ingresa tu numero de telefono con lada">
            </div>
		</div>
        <div class="col-md-6">
            <div class="form-group">
             <label>Correo Electronico</label>
             <input type="email" class="form-control" v-model="correo" placeholder="Ingresa tu correo">
            </div>
        </div>
    </div>
    <hr class="my-4">
        <div class="form-group">
             <label>Usuario</label>
             <input type="text" class="form-control" v-model="user" readonly="">
        </div>
        
        <small id="err" class="form-text" style="color:red"></small>
  </fieldset>
<button class="btn btn-primary" @click="confirmUpdate()">Actualizar</button>
    <small  id="emailHelp" class="form-text text-muted">Tus anteriores datos seran reemplazados por los nuevos</small>
 
</div>
    
</template>

<script>
import axios from 'axios';
import router from '../../router';
export default {
  data: ()=>({
    Json: null,
    JsonPaises: null,
    JsonEstados: null,
    nombres: null,
    apaterno: null,
    amaterno: null,
    especialidad: {
                id: "",
                desc: ""
    },
    cedula: null,
    direccion: null,
    municipio: null,
    estado: null,
    pais: {
            nombre: "",
            id: ""
    },
    telefono: null,
    correo: null,
    user: null,
    password: "",
    pconfirm: ""
  }),
  beforeCreate(){
    if(window.localStorage.getItem('role')!=1){router.push('/lobby')}
      axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/medicos/'+window.localStorage.getItem('id'),
                
                })
            .then(response=>{
               this.nombres=response.data.nombres;
               this.apaterno=response.data.apellidoPaterno;
               this.amaterno=response.data.apellidoMaterno;
               this.direccion=response.data.direccion;
               this.pais.nombre=response.data.pais;
               this.estado=response.data.estado;
               this.municipio=response.data.municipio;
               this.telefono=response.data.telefono;
               this.correo=response.data.email;
               this.user=response.data.user;
               this.cedula=response.data.cedula;
               this.especialidad.id=response.data.idEspecialidades;
               this.especialidad.desc=response.data.descripcion;

              this.country();

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
                url: 'https://countriesnow.space/api/v0.1/countries/states'
                })
            .then(response=>{
              this.JsonPaises=response.data.data;  
               
            })
            .catch(error=>{
                console.log(error)
            })
  },
  methods: {
    confirmUpdate: function(){
        var funciones=this;
        $.confirm({
       title: 'Actualizar Datos',
        content: 'Estas seguro que quieres actualizar los datos?',
    buttons: {
        confirm: function () {
          funciones.register();
        },
        cancel: function () {
           
        },
        
        }
        });
      },
    country: function(){
      axios({
                method: 'get',
                url: 'https://countriesnow.space/api/v0.1/countries/states'
                })
            .then(response=>{
              this.JsonPaises=response.data.data;  
              this.getid();
               
            })
            .catch(error=>{
                console.log(error)
            })
    },
    getid: function(){
      for(var i=0;i<this.JsonPaises.length;i++){
        if(this.JsonPaises[i].name==this.pais.nombre){
          
          this.pais.id=i;
          this.state();
        }
      }
    },
    state: function(){
      var id=this.pais.id;
      this.JsonEstados=this.JsonPaises[id].states
    },
    register: function(){
      document.getElementById("err").innerHTML  = " ";
      
      if(this.nombres!=null){
        if(this.apaterno!=null){
          if(this.amaterno!=null){
            if(this.amaterno!=null){
              if(this.especialidad!=null){
                if(this.cedula!=null){
                  if(this.direccion!=null){
                    if(this.municipio!=null){
                      if(this.estado!=null){
                        if(this.pais!=null){
                          if(this.telefono!=null){
                            if(this.correo!=null){
                              if(this.user!=null){
                                if(this.password!=null){
                                  if(this.pconfirm!=null && this.pconfirm==this.password){ 
                                   this.send();
                                  
                                    }
                                  else{document.getElementById("err").innerHTML  = "Las contraseñas no coinciden";}}
                                else{document.getElementById("err").innerHTML  = "Campo contraseña invalido";}}
                              else{document.getElementById("err").innerHTML  = "Campo user invalido";}}
                            else{document.getElementById("err").innerHTML  = "Campo correo invalido";}}
                          else{document.getElementById("err").innerHTML  = "Campo telefono invalido";}}
                        else{document.getElementById("err").innerHTML  = "Campo pais invalido";}}
                      else{document.getElementById("err").innerHTML  = "Campo estado invalido";}}
                    else{document.getElementById("err").innerHTML  = "Campo municipio invalido";}}
                  else{document.getElementById("err").innerHTML  = "Campo direccion invalido";}}
                else{document.getElementById("err").innerHTML  = "Campo cedula invalido";}}
              else{document.getElementById("err").innerHTML  = "Campo especialidad invalido";}}
            else{document.getElementById("err").innerHTML  = "Campo a invalido";}}
          else{document.getElementById("err").innerHTML  = "Campo apellido materno invalido";}}
        else{document.getElementById("err").innerHTML  = "Campo apellido paterno invalido";}}
      else{document.getElementById("err").innerHTML  = "Campo nombres invalido";}
     
    },
  send: function(){
        var body={
                nombres: this.nombres,
                apellidoPaterno: this.apaterno,
                apellidoMaterno: this.amaterno,
                cedula: this.cedula,
                direccion: this.direccion,
                municipio: this.municipio,
                estado: this.estado,
                pais: this.pais.nombre,
                telefono: this.telefono,
                email: this.correo,
                user: this.user,
                idEspecialidades: this.especialidad.id,
                descripcion: this.especialidad.desc
            }

            axios({
                method: 'put',
                url: 'https://proyecto-tweb.herokuapp.com/medicos/'+window.localStorage.getItem('id'),
                data: body
                })
            .then(response=>{
                $.alert("Actualizacion correcta");
              
            })
            .catch(error=>{
                
                console.log(error)
            })
  }

  }
}
</script>