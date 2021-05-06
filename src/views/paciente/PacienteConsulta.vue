<template>
    <div style="margin: auto; margin-top: 10px; max-width: 80%;">
        <h1>Nueva Consulta Medica</h1>
        <div class="form-group" style="text-align:left">
      <label for="exampleTextarea">Sintomas</label>
      <textarea class="form-control" v-model="sintoma" placeholder="Describe a detalle tus sintomas para que el medico pueda evaluarte correctamente, mientras mas informacion mejor" id="exampleTextarea" rows="3"></textarea>
    </div>
    <div class="form-group" style="text-align:left">
     <label>Especialidad</label>
     <select class="custom-select"  style="width:100%" v-model="especialidad">
     <option v-for="(obj,key) in especialidades"  :key="key" :value="obj.id">{{obj.descripcion}}</option>
   </select>
   </div>
     <div class="form-group" style="text-align:left">
      <label for="exampleInputFile">Evidencias</label>
       <input type="file" ref="files" class="form-control-file"  id="exampleInputFile" multiple v-on:change="handleFileUpload()" aria-describedby="fileHelp" > 
      <small id="fileHelp" class="form-text text-muted">Puedes seleccionar mas de un archivo si mantienes la tecla CTRL mientra das click en los archivos.</small>

      <hr>
      
    </div>
    <div v-if="load">
  <small  id="emailHelp" class="form-text" style="color: #158cba">Estamos subiendo tu consulta</small>
<div class="progress" style="margin-bottom:10px">
  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 50%;"></div>
</div>
</div>
    <button type="button" class="btn btn-primary" @click="guardar()">Registrar Consulta</button>
    </div>

    
</template>

<script>
import axios from 'axios';
import router from '../../router';
export default{
    data(){
        return{
           files: '' ,
           consulta: null,
           especialidades: '',
           especialidad: null,
           sintoma: null,
           load: false,
           
        }
    },
    beforeCreate(){
     if(window.localStorage.getItem('role')!=0){router.push('/lobby')}
           
      axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/especialidades'
                })
            .then(response=>{
              this.especialidades=response.data;  
               
            })
            .catch(error=>{
                console.log(error)
            })
    },
    created(){
      
    },
    methods: {
      file: function(){
        
      }, 
      guardar: function(){
        if(this.sintoma!=null){
          if(this.especialidad!=null){
              var body={
                idPaciente: parseInt(window.localStorage.getItem('id')),
                idEspecialidad: this.especialidad,
                sintomas: this.sintoma
              }
              console.log(body);
               axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/consultas',
                data: body
                })
            .then(response=>{
              this.consulta=response.data;
              this.submitFiles();
            })
            .catch(error=>{
                
            })
          }else{
            $.alert("Por favor selecciona una especialidad para que podamos redirigir tu consulta");
          }
        }else{
          $.alert("Por favor describe los sintomas que padeces");
        }
        
      },
      submitFiles: async function(){
        this.load=true;
        for( var i = 0; i < this.files.length; i++ ){
          var formData = new FormData();
          let file = this.files[i];
          formData.append('media', file);
          await axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/consultas/'+this.consulta.id+'/media',
                data: formData
                })
            .then(response=>{
              
            })
            .catch(error=>{
              $.alert("Algo salio mal, verifica que tus archivos no esten corruptos")
              return; 
            })
            
          }
          $.alert("Consulta generada correctamente");
          this.load=false;
          this.sintoma=null;
          this.especialidad=null;
      },
      handleFileUpload(){
      this.files = this.$refs.files.files;
      console.log(this.files);
      }
    
    }
}
</script>
