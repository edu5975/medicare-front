<template>
<div>
    <h1>Detalle de la consulta  {{idConsulta}}</h1>
    <div class="form-group" style="max-width:50%;margin:auto">
    <fieldset>
    <label class="control-label" for="readOnlyInput">Nombre del Paciente</label>
    <input class="form-control" id="readOnlyInput" type="text" :placeholder="nombres+' '+apellidoPaterno+' '+apellidoMaterno" readonly="">
    </fieldset>
    </div>
    <br>
    <div class="form-group" style="max-width:50%;margin:auto">
    <fieldset>
    <label class="control-label" for="readOnlyInput">Fecha</label>
    <input class="form-control" id="readOnlyInput" type="text" :placeholder="fecha[0]" readonly="">
    </fieldset>
    </div>
    <hr>

    <div class="form-group" style="max-width:50%;margin:auto">
      <label for="exampleTextarea">Sintomas</label>
      <textarea class="form-control" v-model="sintomas" rows="3"></textarea>
    </div>
    <br>
    <div class="form-group" style="max-width:50%;margin:auto">
      <label>Especialidad</label>
      <select class="custom-select" v-model="especialidad" disabled>
      <option v-for="(obj,key) in especialidades"  :key="key" :value="obj.id">{{obj.descripcion}}</option>
    </select>
    <small id="fileHelp" class="form-text text-muted">Los medicos pueden redirigir la especialidad de tu consulta en caso de ser necesario.</small>
    </div>
    <hr>

    <div class="row" style="max-width:50%;margin:auto">
		<div class="col-md-6">
            <div class="form-group" >
      <label for="exampleTextarea">Archivos adjuntos</label>
      <div v-for="(obj,key) in media"  :key="key">
      <br>
      <a :href="'https://proyecto-tweb.herokuapp.com/images/'+obj.media" target="_blank"><button class="btn btn-outline-primary">{{obj.media}}</button></a>
      &nbsp;
      <img src="@/assets/images/cancel.png"  style="width:15px;cursor: pointer;" title="Eliminar archivo" @click="confirmDeleteMedia(obj.id)" />
      
      </div>
    </div>
		</div>
		<div class="col-md-6" style="margin:auto">
      <label >Agregar archivos extra</label>
    <div class="form-group">
    <div class="input-group mb-3">
      <div class="custom-file">
        <input type="file" class="custom-file-input" id="inputGroupFile02" ref="file" v-on:change="handleFileUpload()">
        <label class="custom-file-label" for="inputGroupFile02" v-html="fileStatus"></label>
      </div>
    </div>
  </div>
  <div v-if="load">
  <small  id="emailHelp" class="form-text" style="color: #158cba">Estamos cargando tu archivo</small>
<div class="progress" style="margin-bottom:10px">
  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 50%;"></div>
</div>
</div>
  <button type="button" class="btn btn-secondary" @click="submitFile()">Upload</button>
		</div>
	</div>


    
    <br>
    <button type="button" class="btn btn-warning" @click="updateConsulta()">Actualizar Informacion</button>
    <br>

</div>
</template>

<script>
import axios from 'axios';
import router from '../../router';
export default{
    data(){
        return{
            idConsulta: null,
            nombres: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            sintomas: "",
            media: "",
            fecha: "",
            especialidad: "",
            especialidades: "",
            fileStatus: "Elige un archivo",
            file: null,
            load: false,
            estado: ""
        }
    },
    beforeCreate(){
        this.idConsulta=this.$route.params.id,
        axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/consultas/'+this.idConsulta,
                
                })
            .then(response=>{
               this.nombres=response.data.pacientes.nombres;
               this.apellidoPaterno=response.data.pacientes.apellidoPaterno;
               this.apellidoMaterno=response.data.pacientes.apellidoMaterno;
               this.sintomas=response.data.sintomas;
               this.media=response.data.consultas_media;
               this.fecha=response.data.fecha;
               this.fecha=this.fecha.split('T');
               this.especialidad=response.data.especialidades.id
               this.estado=response.data.estado;


            })
            .catch(error=>{
                
                console.log(error)
            })

            axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/especialidades',
                
                })
            .then(response=>{
               this.especialidades=response.data;

            })
            .catch(error=>{
                
                console.log(error)
            })
    },
    methods: {
        handleFileUpload(){
          this.file = this.$refs.file.files[0];
          this.fileStatus=this.file.name.slice(0,20);
          console.log(this.$route.params.id);
      }, 
      submitFile: function(){
        if(this.file!=null){
          this.load=true;
            let formData = new FormData();
          formData.append('media', this.file);
          axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/consultas/'+this.$route.params.id+'/media',
                data: formData
                })
            .then(response=>{
               this.Updatemedia();
               this.file=null;
               this.fileStatus="Elige un archivo";
               this.load=false;
               $.alert("Archivo subido con exito");
            })
            .catch(error=>{
                
                console.log(error)
            })
        }else{
          $.alert("Debes seleccionar un archivo para poder subirlo");
        }
          
      },
      confirmDeleteConsulta: function(){
        var funciones=this;
        $.confirm({
        title: 'Eliminar consulta',
        content: 'Deseas eliminar la consulta seleccionada?',
        buttons: {
        confirm: function () {
          funciones.deleteConsulta();
        },
        cancel: function () {
           
        },
        
        }
        });
      },
      deleteConsulta: function(){
          axios({
                method: 'delete',
                url: 'https://proyecto-tweb.herokuapp.com/consultas/'+this.$route.params.id,
                })
            .then(response=>{
                $.alert("Consulta eliminada con exito");
                router.push('/lobby');
            })
            .catch(error=>{
                
                console.log(error)
            })
      },
      Updatemedia: function(){
          axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/consultas/'+this.$route.params.id,
                
                })
            .then(response=>{
               
               this.media=response.data.consultas_media;
               


            })
            .catch(error=>{
                
                console.log(error)
            })
      },
      confirmDeleteMedia: function(id){
        var funciones=this;
        $.confirm({
        title: 'Eliminar archivo',
        content: 'Deseas eliminar el archivo seleccionado?',
        buttons: {
        confirm: function () {
          funciones.deleteMedia(id);
        },
        cancel: function () {
           
        },
        
        }
        });
      },
      deleteMedia: function(id){
        axios({
                method: 'delete',
                url: 'https://proyecto-tweb.herokuapp.com/consultas/'+this.$route.params.id+'/media/'+id,
                })
            .then(response=>{
                $.alert("Archivo eliminado con exito");
                this.Updatemedia();
            })
            .catch(error=>{
                
                $.alert("Algo salio mal, contacta con un administrador si el problema persiste")
            })
      },
      updateConsulta: function(){
        var funciones=this;
        $.confirm({
    title: 'Editar Consulta!',
    content: 'Deseas actualizar los datos de tu consulta?',
    buttons: {
        confirm: function () {
          funciones.setData();
        },
        cancel: function () {
           
        },
        
        }
        });
      },
      setData: function(){
           var body={
              idEspecialidad: this.especialidad,
              sintomas: this.sintomas,
              estado: this.estado,
            }
            axios({
                method: 'put',
                url: 'https://proyecto-tweb.herokuapp.com/consultas/'+this.$route.params.id,
                data: body
                })
            .then(response=>{
              $.alert('Actualizado Correctamente!');  
            })
            .catch(error=>{
                
                console.log(error)
            })
      },
      reload: function(){
        axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/consultas/'+this.$route.params.id,
                
                })
            .then(response=>{
               this.nombres=response.data.pacientes.nombres;
               this.apellidoPaterno=response.data.pacientes.apellidoPaterno;
               this.apellidoMaterno=response.data.pacientes.apellidoMaterno;
               this.sintomas=response.data.sintomas;
               this.media=response.data.consultas_media;
               this.fecha=response.data.fecha;
               this.fecha=this.fecha.split('T');
               this.especialidad=response.data.especialidades.id
               this.estado=response.data.estado;


            })
            .catch(error=>{
                
                console.log(error)
            })
      }
    }
}
</script>
