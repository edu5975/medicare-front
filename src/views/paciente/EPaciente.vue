<template>
    <div style="width:60%; margin: auto; margin-top:50px;margin-bottom:50px">
    
  <fieldset style="margin-left:0px;text-align:left">
    <legend>Registro de Paciente</legend>
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
      <label>Fecha de Nacimiento</label>
      <input type="date" class="form-control" v-model="fecha">
    </div>

  <div class="form-group">    
      <label>Alergias</label>
    <Multiselect
      v-model="alergias.value"
      v-bind="alergias"
    >
    </Multiselect>
  </div>
  <div class="form-group">
      <label>Enfermedades cronicas</label>
    <Multiselect
      v-model="enfermedades.value"
      v-bind="enfermedades"
    >
    </Multiselect>
  </div>
  <div class="form-group">
      <label>Cirugias</label>
    <Multiselect
      v-model="cirugias.value"
      v-bind="cirugias"
    >
    </Multiselect>
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
      <select class="custom-select"  style="width:100%" v-model="pais" @change="state()" hint="Ingresa tu dirección">  
        
      <option v-for="(obj,key) in JsonPaises"  :key="key" v-bind:value="{id: key, nombre: obj.name}" >{{obj.name}}</option>

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
             <label>User</label>
             <input type="text" class="form-control" v-model="user" readonly="">
        </div>
        <small id="err" class="form-text" style="color:red"></small>
  </fieldset>
<button class="btn btn-primary" @click="confirmUpdate()">Actualizar</button>
    <small  id="emailHelp" class="form-text text-muted">Al actualizar cambiaras los datos por los que se muestran en los formularios</small>
 
</div> 
    
</template>

<script>

import axios from 'axios';
import router from '../../router';
import Multiselect from '@vueform/multiselect'

export default {
  components: {
      Multiselect,
    },
    async mounted(){ 
      const id = window.localStorage.getItem('id');
      //alergias
      const lista1 = await axios.get('https://proyecto-tweb.herokuapp.com/alergias')
      this.alergias.options = lista1.data;     
      try {        
        const l = await axios.get('https://proyecto-tweb.herokuapp.com/pacientes/'+id+'/alergias')
        var a = []
        l.data.forEach(element => {
          a.push(element.id)
        });
        this.alergias.value = a; 
      } catch (error) {      
      } 
      //enfermedades
      const lista2 = await axios.get('https://proyecto-tweb.herokuapp.com/enfermedades')
      this.enfermedades.options = lista2.data;  
      try {        
        const l = await axios.get('https://proyecto-tweb.herokuapp.com/pacientes/'+id+'/enfermedades')
        var a = []
        l.data.forEach(element => {
          a.push(element.id)
        });
        this.enfermedades.value = a; 
      } catch (error) {      
      } 
      //cirugias   
      const lista3 = await axios.get('https://proyecto-tweb.herokuapp.com/cirugias')
      this.cirugias.options = lista3.data;
      try {        
        const l = await axios.get('https://proyecto-tweb.herokuapp.com/pacientes/'+id+'/cirugias')
        var a = []
        l.data.forEach(element => {
          a.push(element.id)
        });
        this.cirugias.value = a; 
      } catch (error) {      
      }  
    },
  data(){
    return {    
    id: null, 
    JsonPaises: [],
    JsonEstados: null,
    nombres: null,
    apaterno: null,
    amaterno: null,
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
    fecha: null,
    password: "",
    pconfirm: "",
    alergias: {
          mode: 'tags',
          value: [],
          placeholder: 'Si tienes una o más alergias elige a continuación',
          label:'descripcion',
          valueProp: 'id',
          trackBy:'descripcion',
          hideSelected: true,
          filterResults: true,
          minChars: 1,
          resolveOnLoad: false,
          delay: 0,
          searchable: true,
          options: []
        },
        enfermedades: {
          mode: 'tags',
          value: [],
          placeholder: 'Si tienes una o más enfermedades cronicas elige a continuación',
          label:'descripcion',
          valueProp: 'id',
          trackBy:'descripcion',
          hideSelected: true,
          filterResults: true,
          minChars: 1,
          resolveOnLoad: false,
          delay: 0,
          searchable: true,
          options: []
        },
        cirugias: {
          mode: 'tags',
          value: [],
          placeholder: 'Si te han realizado una o más cirugias elige a continuación',
          label:'descripcion',
          valueProp: 'id',
          trackBy:'descripcion',
          hideSelected: true,
          filterResults: true,
          minChars: 1,
          resolveOnLoad: false,
          delay: 0,
          searchable: true,
          options: []
        },
    }
  },
  beforeCreate(){
    if(window.localStorage.getItem('role')!=0){router.push('/lobby')}
     axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+window.localStorage.getItem('id'),
                
                })
            .then(response=>{
               this.nombres=response.data.nombres;
               this.apaterno=response.data.apellidoPaterno;
               this.amaterno=response.data.apellidoMaterno;
               this.fecha=response.data.nacimiento.slice(0,10);
               this.direccion=response.data.direccion;
               this.pais.nombre=response.data.pais;
               this.estado=response.data.estado;
               this.municipio=response.data.municipio;
               this.telefono=response.data.telefono;
               this.correo=response.data.email;
               this.user=response.data.user;
              this.country();

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

      if(this.fecha!=null){
      if(this.nombres!=null){
        if(this.apaterno!=null){
          if(this.amaterno!=null){
            if(this.alergias!=null){
              if(this.enfermedades!=null){
                if(this.cirugias!=null){
                  if(this.direccion!=null){
                    if(this.municipio!=null){
                      if(this.estado!=null){
                        if(this.pais!=null){
                          if(this.telefono!=null){
                            if(this.correo!=null){
                              if(this.user!=null){
                                if(this.password!=null){
                                  if(this.pconfirm!=null && this.pconfirm==this.password){ 
                                      //console.log(this.alergias[0].desc);

                                    
                                      //console.log(this.fecha)
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
      else{document.getElementById("err").innerHTML  = "Campo nombres invalido";}}
    else{document.getElementById("err").innerHTML  = "Campo fechan invalido";}
     
    },
  send: function(){
        var body={
                nombres: this.nombres,
                apellidoPaterno: this.apaterno,
                apellidoMaterno: this.amaterno,
                direccion: this.direccion,
                municipio: this.municipio,
                estado: this.estado,
                pais: this.pais.nombre,
                nacimiento: this.fecha,
                telefono: this.telefono,
                email: this.correo,
                user: this.user,
               
                
            }

            axios({
                method: 'put',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+window.localStorage.getItem('id'),
                data: body
                })
            .then(response=>{
                this.id=window.localStorage.getItem('id');
                this.deleteextras();
                $.alert("Actualizacion correcta");
                
            })
            .catch(error=>{
                
                console.log(error)
            })
  },
  deleteextras(){
    
      axios({
                method: 'delete',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+window.localStorage.getItem('id')+'/enfermedades',
                })
            .then(response=>{
                axios({
                method: 'delete',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+window.localStorage.getItem('id')+'/alergias',
                })
            .then(response=>{
               axios({
                method: 'delete',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+window.localStorage.getItem('id')+'/cirugias',
                })
            .then(response=>{
              this.id=parseInt(window.localStorage.getItem('id'));
            this.extras();        
            })
            .catch(error=>{

            })         
            })
            .catch(error=>{

            })        
            })
            .catch(error=>{

            })

        

        
            
           
  },

  extras: function(){
    for(var i=0;i<this.alergias.value.length;i++){
         axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+this.id+'/alergias/'+this.alergias.value[i],
                
                })
            .then(response=>{
                
            })
            .catch(error=>{
                
                console.log(error)
            })
      }
    for(var i=0;i<this.enfermedades.value.length;i++){
         axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+this.id+'/enfermedades/'+this.enfermedades.value[i],
                
                })
            .then(response=>{
                
            })
            .catch(error=>{
                
                console.log(error)
            })
      }
    for(var i=0;i<this.cirugias.value.length;i++){
         axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+this.id+'/cirugias/'+this.cirugias.value[i],
                
                })
            .then(response=>{
                
            })
            .catch(error=>{
                
                console.log(error)
            })
     } 
  }

  }
}
</script>

<style src="@vueform/multiselect/themes/default.css">

</style>