<template>
<div style="font: small-caps 100%/200% serif;">
    <div class="row" style="margin:auto;max-width:90%;margin-top:10px">
        <div class="card text-white bg-secondary mb-3" style="max-width: 20rem;">
  <div class="card-body">
    <form class="form-inline">
      <input class="form-control" type="text" v-model="busqueda" placeholder="Buscar" >
      <button type="button" class="btn btn-primary" @click="search2()">Buscar</button>
    </form>
  </div>
</div>
        
        </div>
    <div class="row" style="margin:10px;max-width:95%;margin:auto" >
		
		<div class="col-md-12">
			<div class="row">
				<div class="col-md-3" v-for="(obj,key) in Products"  :key="key"  >
                    <div class="alert" style="height:350px;border-color:#c5c5c5;" >
                        <div style="height:200px;overflow: hidden;border-radius: 10px;background-color:white;cursor: pointer; " @click="detalle(obj)">
                           <img :src="'https://proyecto-tweb.herokuapp.com/images/'+obj.foto" style="width:100%;margin:auto;"/> 
                        </div>
                        <div>
                            <hr class="my-1">
                        <div class="row" style="margin:auto;margin-top:10px"><h4 class="text-muted">${{obj.costo}}</h4>
                        <button type="button" style="width:60%;margin: auto;margin-right:10px" @click="cart(obj)" class="btn btn-warning btn-sm">Agregar al carrito</button>
                        </div>
                        <div class="row" style="margin:auto"><h2 style="color:black">{{obj.nombre}}</h2></div>
                        </div>
                        </div>
				</div>
				
			</div>
			
			
		</div>
	</div>
    <div v-if="detail" @click="hide()" style="background-color:rgba(0, 0, 0, 0.5);position:fixed;top:0px;left:0px;width:100%;height:100%">

      </div>
    <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true" v-if="detail"
     style="position:fixed;top:50%;left:50%;background:white;transform: translate(-50%, -50%);min-width:30%;width:90%;max-height:95%">
  <div class="toast-header">
    <strong class="mr-auto" v-html="nombre"></strong>
    <button type="button" class="ml-2 mb-1 close" @click="hide()" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  
  <div class="toast-body">
      <div style="height:350px;overflow: hidden;border-radius: 20px">
          <img alt="Img Detail" :src="'https://proyecto-tweb.herokuapp.com/images/'+foto" style="width:100%;border-radius:20px" />
          </div>
      <hr class="my-2">
      <p><h2 v-html="precio"></h2><button type="button" class="btn btn-warning" @click="cart(selected)">Agregar al carrito</button></p>
      <hr class="my-2">
    <p style="text-align:justify" v-html="descripcion"></p>
  </div>
</div>
    </div>
</template>

<script>
import axios from 'axios';
import router from '../../router';

export default {
    data(){
        return{
            Products: null,
            detail: false,
            descripcion: "",
            precio: "",
            nombre: "",
            foto: "",
            logged: false,
            paciente: false,
            selected: false,
            busqueda: ""
        }
    },
    created(){
        if(window.localStorage.getItem('logged')=='true'){
            this.logged=true;
           if(window.localStorage.getItem('role')==0){
               this.paciente=true;
           } else{
               this.paciente=false;
           }
        }else{
            this.logged=false;
        }
        axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/medicamentos'
                
                })
            .then(response=>{
                this.Products=response.data;
            })
            .catch(error=>{
                
                console.log(error)
            })
    },
    methods:{
        search2: function(){
            var body={
                nombre: this.busqueda
            }
           
            axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/medicamentos/busqueda',
                data: body
                })
            .then(response=>{
                this.Products=response.data;
               
            })
            .catch(error=>{
                $.alert("No hay resultados para esa busqueda")
            })  
        },
        detalle: function(obj){
            this.selected=obj;
            //console.log(obj);
            this.nombre=obj.nombre;
            this.descripcion=obj.descripcion;
            this.precio="$"+obj.costo;
            this.foto=obj.foto;
            this.detail=true;

        },
        hide: function(){
            this.detail=false;
        },
        cart: function(obj){
            if(this.paciente){
                var body={
                    idPacientes: window.localStorage.getItem('id'),
                    idMedicamentos: obj.id,
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
                
                
            }else if(this.logged){
                $.alert('Necesitar ser paciente para poder comprar');
            }else{
                $.alert('Inicia sesión para agregar productos a tu carrito');
            }
            
            
        }

    }
    
}
</script>