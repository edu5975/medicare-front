<template>
    <div class="row" style="margin:25px">
		<div class="col-md-4">
        <h3>Ofrecer Servicio</h3>
        <div class="form-group">
            <label class="control-label">Selecciona el servicio</label>
      <select class="form-control" id="exampleSelect1" v-model="serviceValue">
        <option v-for="(obj,key) in services" :key="key"  v-bind:value="{id: obj.id, desc: obj.descripcion}" >{{obj.descripcion}}</option>
      </select>
      
  <br>
  <div class="form-group">
      <label class="control-label">Costo</label>
    <div class="input-group mb-3" style="margin:auto;max-width:50%">
      <div class="input-group-prepend">
        <span class="input-group-text">$</span>
      </div>
      <input type="text" class="form-control" v-model="cost">
      <div class="input-group-append">
        <span class="input-group-text">.00</span>
      </div>
    </div>
  </div>
  <small v-if="msg" id="emailHelp" class="form-text" style="color:red">Revisa la informacion de los campos</small>
  <button type="button" class="btn btn-primary" @click="Add()">Ofrecer Servicio</button>

    </div>
		</div>
		<div class="col-md-8">
            <div>
        <h3>Lista de Servicios Activos</h3>
        <table class="table table-hover">
  <thead>
    <tr class="table-primary">
      <th scope="col">Servicio</th>
      <th scope="col">Costo</th>
      <th scope="col">Editar costo</th>
      <th scope="col">Eliminar</th>
    </tr>
  </thead>
  <tbody>
    
    <tr  v-for="(obj,key) in servicesMedico" :key="key" :class="{ 'table-secondary': key%2!=0 }" >
      <th scope="row">{{obj.descripcion}}</th>
      <td>{{obj.costo}}</td>
      <td><button type="button" class="btn btn-warning" @click="registro(obj.descripcion,obj.costo,obj.id)">Editar</button></td>
      <td><button type="button" class="btn btn-danger" @click="eliminar(obj.id)">Eliminar</button></td>
    </tr>
    
    
  </tbody>
</table>
        </div>
		</div>

       
	</div>

</template>

<script>
    import axios from 'axios';
    import router from '../../router';
export default {
    data(){
        return {
            services: null,
            servicesMedico: null,
            serviceValue:null,
            cost: null,
            msg:false,
            key: null
        }
    },
    beforeCreate(){
        if(window.localStorage.getItem('role')!=1){router.push('/lobby')}
        axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/servicios',
                })
            .then(response=>{
              this.services=response.data;
            
            })
            .catch(error=>{
                
            })
           
    },
    created(){
        let self=this;
        self.List();
    },
    
    methods:{
        List: function(){
           axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/medicos/'+window.localStorage.getItem('id')+'/servicios',
                })
            .then(response=>{
              this.servicesMedico=response.data;
            //console.log(this.servicesMedico)
            })
            .catch(error=>{
                this.servicesMedico=null;
              console.log("error")  
            }) 
        },
        registro:function(descripcion="",costo,id){
            var funciones = this;
            var title;

            
                title = "Actualizar servicio ofrecido"
            

            $.confirm({
                columnClass: 'l',
                title,
                content: '' +
                '<form action="" class="formName">' +
                    '<div class="form-group">' +
                    '<label>Ingrese el nuevo costo de '+descripcion+'</label>' +
                    '<input type="text" placeholder="Costo" class="descripcion form-control" required value="'+costo+'" />' +
                    '</div>' +
                '</form>',
                buttons: {
                    formSubmit: {
                        text: 'Actualizar',
                        btnClass: 'btn-blue',
                        action: function () {                            
                            costo = this.$content.find('.descripcion').val();
                            //console.log(costo);
                            if(costo==""){
                                alert('Ingrese una entrada valida');
                                return false;
                            } else{
                                funciones.editar({
                                    id,costo
                                });
                            }
                            
                               
                            
                            
                        }                      
                    },
                    cancel: function () {
                        //close
                    },
                }
            });
        },
        editar: function(id){
           
                
                   var body={
                costo: id.costo
                }
                   axios({
                method: 'put',
                url: 'https://proyecto-tweb.herokuapp.com/medicos/'+window.localStorage.getItem('id')+'/servicios/'+id.id,
                data: body
                })
            .then(response=>{
              
                this.List();
            })
            .catch(error=>{
                console.log(error)
            }) 
            
        },
        Add: function(){
           this.msg=false;
           if(this.serviceValue!=null){
               if(this.cost!=null){
                   var body={
                costo: this.cost
                }
                   axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/medicos/'+window.localStorage.getItem('id')+'/servicios/'+this.serviceValue.id,
                data: body
                })
            .then(response=>{
              //console.log(response.data);
              this.serviceValue="";
              this.cost="";
                this.List();
            })
            .catch(error=>{
                
            }) 
               }else{this.msg=true;}
           }else{this.msg=true;}
        },
        eliminar: function(id){
            var funciones = this;
            $.confirm({
                title: '¿Esta seguro?',
                content: 'Confirme si desea dejar de ofrecer el servicio',
                buttons: {
                    confirm: function () {                        
                        axios({
                            method: 'delete',
                            url: 'https://proyecto-tweb.herokuapp.com/medicos/'+window.localStorage.getItem('id')+'/servicios/'+id,
                            })
                        .then(response=>{
                            $.alert('Servicio eliminado');
                            funciones.List();
                        })
                        .catch(error=>{
                            console.log(error)
                        })
                    },
                    cancel: function () {
                    }
                }
            });
        }
    }
    
}
</script>