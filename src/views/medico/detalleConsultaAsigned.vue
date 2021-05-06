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
      <select class="custom-select" v-model="especialidad" disabled="">
      <option v-for="(obj,key) in especialidades"  :key="key" :value="obj.id">{{obj.descripcion}}</option>
    </select>
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
      
		</div>
	</div>
  <hr>
    <div class="form-group" style="max-width:50%;margin:auto">
      <label for="exampleTextarea"><h4>Receta</h4></label>

      <div class="form-group" style="margin:auto">
      <label for="exampleTextarea">Diagnostico</label>
      <textarea class="form-control"  rows="3" v-model="receta" v-if="!receted"></textarea >
      <textarea class="form-control"  rows="3" v-model="receta" v-if="receted" readonly=""></textarea >
      <button type="button" style="margin-top:10px" class="btn btn-success" v-if="!receted" @click="confirmDiagnostico()">Enviar diagnostico</button>
      <button type="button" style="margin-top:10px" class="btn btn-info" v-if="receted" @click="confirmEmail()">Enviar email de notificación</button>
    </div>
      
      
        
      <div class="row" style="margin-top:10px">
		<div class="col-md-5">
      <select class="custom-select" v-model="medicamento">
      <option v-for="(obj,key) in medicamentos"  :key="key" :value="obj.id">{{obj.nombre}}</option>
    </select>
		</div>
		<div class="col-md-5">
      <input type="text" class="form-control" v-model="horarios" placeholder="Horarios de administracion" >
		</div>
    <div class="col-md-2">

      <button type="button" class="btn btn-primary btn-sm" @click="confirmReceta()">Anadir a receta</button>
		</div>
	</div>

  <div class="row" style="margin:auto;margin-top:10px" v-for="(obj,key) in medicamentosRecetados"  :key="key" >
        <button type="button" class="btn btn-outline-warning" style="margin-bottom:5px">{{obj.nombre+": "+obj.dosis}}</button>
        <img src="@/assets/images/cancel.png"  style="margin-left:10px;width:2%;height:2%;cursor: pointer;" title="Eliminar medicamento" @click="confirmDeleteMed(obj.id)" />
        </div>
      
    </div>
    <br>
    <hr>
    <div class="form-group" style="max-width:50%;margin:auto">
      <label for="exampleTextarea"><h4>COVID-19</h4></label>
        <div class="form-group">
      <label for="exampleSelect1">Estado del Paciente</label>
      <select class="form-control" id="exampleSelect1" v-model="selectCovid">
        <option value="Sospechoso">Sospechoso</option>
        <option value="Confirmado">Confirmado</option>
        <option value="Curado">Curado</option>
      </select>
      <button type="button" class="btn btn-primary btn-sm" @click="covidConfirm()">Agregar registro</button>
      <small id="fileHelp" class="form-text text-muted">Reportar los pacientes con covid ayuda a llevar un registro mundial de la enfermedad.</small>
      <br>
      <br>
      <label for="exampleSelect1">Historial de COVID-19 del Paciente</label>
      <ul class="list-group">
      <li class="list-group-item d-flex justify-content-between align-items-center" v-if="!covid">
      El paciente no tiene registros de COVID
      </li>
     <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(obj,key) in covid"  :key="key">
       {{obj.estado}}
    <span class="badge badge-primary badge-pill">{{obj.fecha.slice(0,10)}}</span>
   </li>

    </ul>
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
            diagnostico: "",
            medicamentos: null,
            idPaciente: null,
            alergias: null,
            enfermedades: null,
            cirugias: null,
            alergiasnull: true,
            cirugiasnull: true,
            enfermedadesnull: true,
            receted: false,
            receta: null,
            idMedico: null,
            medicamento: null,
            horarios: null,
            medicamentosRecetados: null,
            emailPaciente: null,
            covid: null,
            selectCovid: null,
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
               this.especialidad=response.data.especialidades.id
               this.emailPaciente=response.data.pacientes.email;
               this.estado=response.data.estado;
               this.idPaciente=response.data.idPaciente;
               if(this.idEspecialidad!=response.data.idEspecialidad){
                 router.push('/lobby')
               }
               this.idMedico=window.localStorage.getItem('id');
               if(response.data.medicos[0].idMedicos!=this.idMedico){
                 router.push('/lobby')
               }
               this.pacienteInfo();

                this.fetchCovid();
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


            axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/medicamentos',
                
                })
            .then(response=>{
               this.medicamentos=response.data;

            })
            .catch(error=>{
                
                console.log(error)
            })


            axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/recetas/'+this.$route.params.id,   
                })
            .then(response=>{
              this.receta=response.data.descripcion
               console.log(response.data);
                this.receted=true;
                this.reloadMedicamentos();
            })
            .catch(error=>{
                this.receted=false;
                console.log(error)
            })

            
    },
    methods: {
      covidConfirm: function(){
        var funciones=this;
        $.confirm({
       title: 'Registrar COVID',
        content: '¿Estas seguro que quieres enviar una actualizacion del paciente?',
    buttons: {
        enviar: function () {
          
         funciones.covidRegister(); 
        },
        cancelar: function () {
           
        },
        
        }
        });
      },
      covidRegister: function(){
        if(this.selectCovid!=null){
          var body={
            idPaciente: this.idPaciente,
            idMedico: window.localStorage.getItem('id'),
            estado: this.selectCovid
          }
          axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/covid', 
                data: body  
                })
            .then(response=>{
              $.alert("Registro actualizado correctamente");
              this.fetchCovid();
            })
            .catch(error=>{
                
            })
        }else{$.alert("Selecciona una opcion valida de la lista")}
      },
      fetchCovid: function(){
        axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+this.idPaciente+'/covid',   
                })
            .then(response=>{
              this.covid=response.data;
              console.log(this.covid)
            })
            .catch(error=>{
                this.covid=null;
            })
      },
      setData: function(){
           var body={
              idEspecialidad: this.especialidad,
              sintomas: this.sintomas,
              estado: "Con respuesta",
            }
            axios({
                method: 'put',
                url: 'https://proyecto-tweb.herokuapp.com/consultas/'+this.$route.params.id,
                data: body
                })
            .then(response=>{
              
            })
            .catch(error=>{
                
                console.log(error)
            })
      },
      email: function(){
        var body={
              email: this.emailPaciente,
              titulo: "Consulta Contestada",
              contenido: "¡Hola! Tu consulta ha sido resulta, ve al panel de inicio para verla a detalle, http://medicareitc.site/paciente",
            }
            axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/email',
                data: body
                })
            .then(response=>{
              console.log(response);
              $.alert("El email se envió con exito");
            })
            .catch(error=>{
                
                console.log(error)
            })
      },
      confirmEmail: function(){
        var funciones=this;
        $.confirm({
       title: 'Enviar email',
        content: '¿Estas seguro que quieres enviar el mail de notificacion? Es conveniente enviar este email una vez que has terminado de agregar los medicamentos a la receta',
    buttons: {
        enviar: function () {
          funciones.email();
          
        },
        cancelar: function () {
           
        },
        
        }
        });
      },
      confirmDeleteMed: function(id){
        var funciones=this;
        $.confirm({
       title: 'Borrar medicamento',
        content: '¿Estas seguro que quieres borrar este medicamento de la receta?',
    buttons: {
        confirm: function () {
          funciones.deleteMedicamento(id);
        },
        cancel: function () {
           
        },
        
        }
        });
      },
      deleteMedicamento: function(id){
         axios({
                method: 'delete',
                url: 'https://proyecto-tweb.herokuapp.com/recetas/'+this.$route.params.id+'/medicamentos/'+id,
                
                })
            .then(response=>{
              this.reloadMedicamentos();
            })
            .catch(error=>{
               $.alert("Algo salió mal, recarga la pagina e intenta de nuevo")
            })
      },
 confirmReceta: function(){
        var funciones=this;
        $.confirm({
       title: 'Agregar a receta',
        content: '¿Estas seguro que quieres agregar este medicamento a la receta?',
    buttons: {
        confirm: function () {
          if(funciones.receted){
            funciones.addMedicamento();
          }else{
            $.alert("Primero envia un diagnostico para poder agregar medicamentos")
          }
        },
        cancel: function () {
           
        },
        
        }
        });
      },
      reloadReceta: function(){
         axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/recetas/'+this.$route.params.id,   
                })
            .then(response=>{
              this.receta=response.data.descripcion
               console.log(response.data);
                this.receted=true;
            })
            .catch(error=>{
                this.receted=false;
                console.log(error)
            })
      },
      reloadMedicamentos: function(){
        axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/recetas/'+this.$route.params.id+'/medicamentos',
                })
            .then(response=>{
              this.medicamentosRecetados=response.data;
            })
            .catch(error=>{
               
            })
      },
      addMedicamento: function(){
        if(this.medicamento!=null){
          if(this.horarios!=null){
            var body={
              dosis: this.horarios
            }
              axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/recetas/'+this.$route.params.id+'/medicamentos/'+this.medicamento,
                data: body
                })
            .then(response=>{
              $.alert("Medicamento añadido a la receta")
              this.reloadMedicamentos();
              this.medicamento=null;
              this.horarios=null;
              this.setData();
            })
            .catch(error=>{
               $.alert("Algo salió mal, recarga la pagina e intenta de nuevo")
            })
          }else{$.alert("Agrega los horarios de administracion del medicamento")}
        }else{$.alert("Selecciona un medicamento")}
      },
      confirmDiagnostico: function(){
        var funciones=this;
        $.confirm({
       title: 'Enviar diagnostico',
        content: '¿Estas seguro que quieres enviar el diagnostico?',
    buttons: {
        confirm: function () {
          if(funciones.receted){
            $.alert("Actualizando receta");
          }else{
            funciones.addReceta();
          }
        },
        cancel: function () {
           
        },
        
        }
        });
      },
      addReceta : function(){
        var body={
          idConsulta: this.$route.params.id,
          idMedico: this.idMedico,
          descripcion: this.receta
        }
        axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/recetas',
                data: body,
                })
            .then(response=>{
              this.reloadReceta();
              this.setData();
              $.alert("Diagnostico enviado correctamente")
            })
            .catch(error=>{
               $.alert("Algo salió mal, recarga la pagina e intenta de nuevo")
            })
      },
      updateReceta: function(){
        var body={
          idConsulta: this.$route.params.id,
          idMedico: this.idMedico,
          descripcion: this.receta
        }
        axios({
                method: 'put',
                url: 'https://proyecto-tweb.herokuapp.com/recetas/'+this.$route.params.id,
                data: body,
                })
            .then(response=>{
              $.alert("Diagnostico enviado correctamente")
            })
            .catch(error=>{
               $.alert("Algo salió mal, recarga la pagina e intenta de nuevo")
            })
      },
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
              router.push('/lobby');
            })
            .catch(error=>{
                $.alert('Algo salio mal al tratar de atender esta consulta');
                console.log(error)
            })
      },
     
     
    }
}
</script>
