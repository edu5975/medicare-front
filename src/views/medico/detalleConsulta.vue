<template>
<div>
    <h1>Detalle de la consulta  {{idConsulta}}</h1>
    <hr>
    <div class="form-group" style="max-width:50%;margin:auto">
    <fieldset>
    <label class="control-label" for="readOnlyInput">Nombre del Paciente</label>
    <h3>{{nombres+' '+apellidoPaterno+' '+apellidoMaterno}}</h3>
    </fieldset>
    </div>
    <div class="row" style="max-width:50%;margin:auto;margin-top:10px">
		<div class="col-md-4">
      <ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center active">
    Alergias
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center disabled" v-if="alergiasnull">
    Sin Alergias
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(obj,key) in alergias"  :key="key">
    {{obj.descripcion}}
  </li>
</ul>
		</div>


		<div class="col-md-4">
      <ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center active">
    Cirugias
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center disabled" v-if="cirugiasnull">
    Sin Cirugias
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(obj,key) in cirugias"  :key="key">
    {{obj.descripcion}}
  </li>
</ul>
		</div>


		<div class="col-md-4">
      <ul class="list-group">
  <li class="list-group-item d-flex justify-content-between align-items-center active">
    Enfermedades
  </li>

  <li class="list-group-item d-flex justify-content-between align-items-center disabled" v-if="enfermedadesnull">
    Sin Enfermedades
  </li>
  <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(obj,key) in enfermedades"  :key="key">
    {{obj.descripcion}}
  </li>
</ul>
		</div>
	</div>
    <hr>
    <div class="form-group" style="max-width:50%;margin:auto">
    <fieldset>
    <label class="control-label" for="readOnlyInput">Fecha de Consulta</label>
    <h5>{{fecha[0]}}</h5>
    </fieldset>
    </div>
    <hr>

    <div class="form-group" style="max-width:50%;margin:auto">
      <label for="exampleTextarea">Sintomas</label>
      <textarea class="form-control" v-model="sintomas" rows="3" readonly=""></textarea >
    </div>
    <br>
    <div class="form-group" style="max-width:50%;margin:auto">
      <label>Especialidad</label>
      <select class="custom-select" v-model="especialidad">
      <option v-for="(obj,key) in especialidades"  :key="key" :value="obj.id">{{obj.descripcion}}</option>
    </select>
    <button type="button" class="btn btn-warning" style="margin-top:10px" @click="updateConsulta()">Redirigir consulta</button>&nbsp;
    <small id="fileHelp" class="form-text text-muted">Si lo consideras necesario puedes redirigir esta consulta a otra area para que los medicos de ahi la atiendan.</small>
    <small id="fileHelp" class="form-text text-muted">Ten en cuenta que al redirigir una consulta esta ya no estara disponible para tu especialidad.</small>
    </div>
    <hr>

    <div class="row" style="max-width:50%;margin:auto">
		<div class="col-md-6">
            <div class="form-group" >
      <label for="exampleTextarea">Archivos adjuntos</label>
      <div v-for="(obj,key) in media"  :key="key">
      <br>
      <a :href="'https://proyecto-tweb.herokuapp.com/images/'+obj.media" target="_blank"><button class="btn btn-outline-primary">{{obj.media}}</button></a>
      
      
      </div>
    </div>
		</div>
		<div class="col-md-6" style="margin:auto">
      <button type="button" class="btn btn-success" @click="confirmAtender()">Atender esta consulta</button>
      <small id="fileHelp" class="form-text text-muted">Al atender esta consulta dejara de estar disponible en la ventana principal para los demas medicos.</small>
		</div>
	</div>

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
            estado: "",
            idPaciente: null,
            alergias: null,
            enfermedades: null,
            cirugias: null,
            alergiasnull: true,
            cirugiasnull: true,
            enfermedadesnull: true,
            idEspecialidad: null
            
        }
    },
    beforeCreate(){
      if(window.localStorage.getItem('role')!=1){router.push('/lobby')}
        this.idConsulta=this.$route.params.id,


        axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/medicos/'+window.localStorage.getItem('id'),
                
                })
            .then(response=>{
              
               this.idEspecialidad=response.data.idEspecialidades;

            })
            .catch(error=>{
                
                console.log(error)
            })

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
               this.especialidad=response.data.especialidades.id;
               this.estado=response.data.estado;
               this.idPaciente=response.data.idPaciente;

               if(this.idEspecialidad!=response.data.idEspecialidad){
                 router.push('/lobby')
               }

               if(response.data.medicos!=null){
                 router.push('/lobby')
               }
              this.pacienteInfo();

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
      pacienteInfo: function(){
        axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+this.idPaciente+'/alergias',
                })
            .then(response=>{
              this.alergias=response.data; 
               this.alergiasnull=false;
            })
            .catch(error=>{
                console.log(error)
                this.alergiasnull=true;
            })

        axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+this.idPaciente+'/enfermedades',
                })
            .then(response=>{
              this.enfermedades=response.data; 
               this.enfermedadesnull=false;
            })
            .catch(error=>{
                console.log(error)
                this.enfermedadesnull=true;
            })
        
        axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+this.idPaciente+'/cirugias',
                })
            .then(response=>{
              this.cirugias=response.data; 
               this.cirugiasnull=false;
            })
            .catch(error=>{
                console.log(error)
                this.cirugias=true;
            })
      },
        
      confirmAtender: function(){
        var funciones=this;
        $.confirm({
       title: 'Atender consulta',
        content: 'Estas seguro que quieres atender esta consulta?',
    buttons: {
        confirm: function () {
          funciones.atender();
        },
        cancel: function () {
           
        },
        
        }
        });
      },
      atender: function(){
        axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/medicos/'+window.localStorage.getItem('id')+'/consultas/'+this.$route.params.id,
                })
            .then(response=>{
              $.alert('Consulta asignada a ti correctamente! Podras atender tu consulta en la seccion de MIS CONSULTAS en la pagina principal');  
              router.push('/medico/consulta/detalle/asignadas/'+this.$route.params.id);
            })
            .catch(error=>{
                $.alert('Algo salio mal al tratar de atender esta consulta');
                console.log(error)
            })
      },
      updateConsulta: function(){
        var funciones=this;
        $.confirm({
    title: 'Redirigir Consulta',
    content: 'Estas seguro de redirigir esta consulta?',
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
              $.alert('Consulta redirigida correctamente!');  
              router.push('/lobby');
            })
            .catch(error=>{
                
                console.log(error)
            })
      },
     
    }
}
</script>
