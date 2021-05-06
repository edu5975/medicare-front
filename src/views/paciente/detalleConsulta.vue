<template>
<div id="main" min-width="1500px">
    <h1>Detalle de la consulta  {{idConsulta}}</h1>
    <hr>
    <div class="form-group" style="max-width:50%;margin:auto">
    <fieldset>
    <label class="control-label" for="readOnlyInput">Nombre del Paciente</label>
    <h3>{{nombres+' '+apellidoPaterno+' '+apellidoMaterno}}</h3>
    </fieldset>
    </div>
    <br>
    <div class="form-group" style="max-width:50%;margin:auto">
    <fieldset>
    <label class="control-label" for="readOnlyInput">Fecha</label>
    <h5>{{fecha[0]}}</h5>
    </fieldset>
    </div>
    <hr>

    <div class="form-group" style="max-width:50%;margin:auto">
      <label for="exampleTextarea">Sintomas</label>
      <textarea class="form-control" v-model="sintomas" rows="3" v-if="screen"></textarea>
      <br>
      <strong v-html="sintomas" v-if="!screen"></strong>
    </div>
    <br>
    <div class="form-group" style="max-width:50%;margin:auto">
      <label>Especialidad</label>
      <select class="custom-select" v-model="especialidad" v-if="!asignado && screen" >
      <option v-for="(obj,key) in especialidades"  :key="key" :value="obj.id">{{obj.descripcion}}</option>
    </select>
    <select class="custom-select" v-model="especialidad" disabled v-if="asignado && screen">
      <option v-for="(obj,key) in especialidades"  :key="key" :value="obj.id">{{obj.descripcion}}</option>
    </select>
    <br>
    <strong v-html="especialidad" v-if="!screen"></strong>
    <small id="fileHelp" class="form-text text-muted">Los medicos pueden redirigir la especialidad de tu consulta en caso de ser necesario.</small>
    </div>
    <br>
    <button type="button" class="btn btn-warning" @click="updateConsulta()" v-if="screen">Actualizar Informacion</button>&nbsp;
    <button type="button" class="btn btn-danger" @click="confirmDeleteConsulta()" v-if="!asignado && screen">Eliminar consulta</button>
    <br>
    <hr>

    <div class="row" style="max-width:50%;margin:auto" v-if="screen">
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
		<div class="col-md-6" style="margin:auto" >
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
  <hr>



  <div class="form-group" style="max-width:50%;margin:auto" v-if="asignado">
    <div class="card mb-3">
  <h3 class="card-header">Medico Asignado</h3>
  <div class="card-body">
    <h5 class="card-title">Nombre</h5>
    <h6 class="card-subtitle text-muted">{{medico.medico}}</h6>
  </div>
  
  
  <ul class="list-group list-group-flush">
    <li class="list-group-item">{{'Telefono: '+medico.telefono}}</li>
    <li class="list-group-item" style="color:blue;cursor:pointer" @click="correo()">{{'Email: '+medico.email}}</li>
    <li class="list-group-item">{{'Pais: '+medico.pais}}</li>
    <li class="list-group-item">{{'Estado: '+medico.estado}}</li>
    <li class="list-group-item">{{'Municipio: '+medico.municipio}}</li>
  </ul>
 
</div>
  </div>

  <div class="card bg-light mb-3" style="max-width: 50%;margin:auto" id="receta" v-if="receta">
  <div class="card-header">Receta Medica</div>
  <div class="card-body">
    <h4 class="card-title">{{diagnostico}}</h4>
    <p class="card-text">.</p>

    <div class="row" style="margin:auto;margin-top:5px" v-for="(obj,key) in medicamentos"  :key="key" >
        <button type="button" class="btn btn-secondary" style="margin-bottom:5px">{{obj.nombre+": "+obj.dosis}}</button>
        <img src="@/assets/images/carro2.png"  style="margin-left:10px;width:4%;height:4%;cursor: pointer;" title="Añadir al carrito" @click="cart(obj.id)" />
   </div>
   
  </div>

  
  </div>
    
</div>
<div style="margin-bottom:50px">
  <button type="button" class="btn btn-secondary" @click="correo2()">Enviar receta por correo</button> 
<button type="button" class="btn btn-secondary" @click="pdf()">Descargar Consulta en PDF</button> 
  </div>

<br > 
</template>

<script>
import axios from 'axios';
import router from '../../router';
import html2pdf from 'html2pdf.js'

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
            estado: "",
            asignado: false,
            medico: null,
            receta: null,
            medicamentos: null,
            diagnostico: null,
            screen: true,
            email: "email@dominio.com"
        }
    },
    beforeCreate(){
      if(window.localStorage.getItem('role')!=0){router.push('/lobby')}
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
               this.email=response.data.pacientes.email;

               if(parseInt(window.localStorage.getItem('id'))!=response.data.idPaciente){
                 router.push('/lobby')
               }

              if(response.data.medicos!=null){
                this.asignado=true;
                this.medico=response.data.medicos[0];
                if(response.data.recetas!=null){
                 this.estado="Visto";
                this.setData(3);
                this.recetas();
                }
                
              }else{
                this.asignado=false;
              }

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
      correo2: function(){
        var r=document.getElementById('receta').innerHTML;
        console.log(r);
        console.log(this.email);
        var body={
          email: this.email,
          titulo: "Receta de Consulta",
          contenido: r
        }
        axios({

                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/email',
                data: body
                })
            .then(response=>{
                $.alert("Correo enviado");
            })
            .catch(error=>{
                
            })
      },
      pdf: function(){
        var funciones=this;
        this.screen=false;
        setTimeout(() => {funciones.save()}, 1000);
        
      },
      save: function(){
        var element = document.getElementById('main');
        var opt = {
            margin:       1,
            filename:     'Consulta.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
          };
        html2pdf().set(opt).from(element).save();
        this.screen=true;
      },
      cart: function(id){
         var body={
                    idPacientes: window.localStorage.getItem('id'),
                    idMedicamentos: id,
                    cantidad: 1
                }
                axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/carrito',
                data: body
                })
            .then(response=>{
                $.alert('Agregado al carrito');
            })
            .catch(error=>{
                
                $.alert('Algo salio mal, contacta a un administrador si el problema persiste');
            })
      },
      recetas: function(){
        axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/recetas/'+this.$route.params.id,   
                })
            .then(response=>{
              this.receta=response.data.descripcion;
               this.medicamentos=response.data.medicamentos;
                this.diagnostico=response.data.descripcion;
            })
            .catch(error=>{
                this.receted=false;
                console.log(error)
            })
      },
      correo: function(){
        var mail='mailto:'+this.medico.email;
        console.log(mail)
        window.open(mail);
      },
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
      setData: function(id=1){
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
              if(id==1){
                $.alert('Actualizado Correctamente!');  
              }
              
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
