<template>
    <div style="text-align:center">
<h2>Pago</h2>

<table class="table table-hover"  border="1">
  <thead>
    <tr class="table-dark">
      <th scope="col">Producto</th>
      <th scope="col">Precio Unitario</th>
      <th scope="col">Cantidad</th>
      <th scope="col">Precio</th>
    </tr>
  </thead>
  <tbody>
    <tr class="table-light" v-for="(obj,key) in carrito"  :key="key" >
      <th scope="row">{{obj.nombre}}</th>
      <td>{{obj.costo}}</td>
      <td>{{obj.cantidad}}</td>
      <td>{{obj.costo*obj.cantidad}}</td>
    </tr>
    <tr class="table-light"  >
      <th scope="row"></th>
      <td></td>
      <td>Total:</td>
      <td>{{total}}</td>
    </tr>
    
  </tbody>
</table>


<div class="card mb-3" style="max-width: 80%; margin: auto">
  <h3 class="card-header">Informacion del comprador</h3>
  <div class="card-body">
    <h5 class="card-title">Nombre</h5>
    <h6 class="card-subtitle text-muted">{{nombre+' '+apaterno+' '+amaterno}}</h6>
  </div>
  
  <div class="card-body">
    <p class="card-text">Pago en efectivo contra entrega.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">{{'Direccion: '+direccion+','+municipio+','+estado+','+pais}}</li>
    <li class="list-group-item">{{'Telefono: '+telefono}}</li>
    <li class="list-group-item">{{'Email: '+email}}</li>
  </ul>
  <button type="button" class="btn btn-info" @click="venta()">Confirmar pedido</button>
</div>

   

  
  </div>
</template>

<script>

import axios from 'axios';
import router from '../../router';

export default {
    data(){
        return{
            carrito: null,
            total: 0,
            paciente: null,
            nombre: "",
            apaterno: "", 
            amaterno: "",
            direccion: "",
            municipio: "",
            estado: "",
            pais: "",
            telefono: "",
            email: ""

        }
    },
    beforeCreate(){
        if(window.localStorage.getItem('role')!=0){router.push('/lobby')}
        axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+window.localStorage.getItem('id')+'/carrito'
                })
            .then(response=>{
                this.carrito=response.data;
                this.total=0;
                for(var i=0;i<this.carrito.length;i++){
                    this.total+=(this.carrito[i].costo*this.carrito[i].cantidad);
                }
                this.total=this.total;
                
            })
            .catch(error=>{
                
            })
        axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+window.localStorage.getItem('id')
                })
            .then(response=>{
                
                this.nombre=response.data.nombres;
                this.apaterno=response.data.apellidoPaterno;
                this.amaterno=response.data.apellidoMaterno;
                this.direccion=response.data.direccion;
                this.municipio=response.data.municipio;
                this.estado=response.data.estado;
                this.pais=response.data.pais;
                this.telefono=response.data.telefono;
                this.email=response.data.email;

                
            })
            .catch(error=>{
                
            })
    },
    
    methods: {
       
        venta: function(){
            var body={
                idPacientes: window.localStorage.getItem('id'),
                total: this.total
            }
             axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/ventas',
                data: body
                })
            .then(response=>{
               this.extra(response.data.id)
            
            })
            .catch(error=>{
                
                console.log(error)
            })
        },
        extra: function(id){
            for(var i=0;i<this.carrito.length;i++){
                var body={
                    precio: this.carrito[i].costo,
                    cantidad: this.carrito[i].cantidad
                }
         axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/ventas/'+id+'/medicamentos/'+this.carrito[i].id,
                data: body
                
                })
            .then(response=>{
                
            })
            .catch(error=>{
                
                console.log(error)
            })
      }
      
     axios({
                method: 'delete',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+window.localStorage.getItem('id')+'/carrito',
                
                })
            .then(response=>{
              $.alert("Pedido realizado correctamente");
              router.push('/pedidos');  
            })
            .catch(error=>{
                
                console.log(error)
            })
        },

        delete(id,c){
            
             axios({
                method: 'delete',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+window.localStorage.getItem('id')+'/carrito/'+id,
                })
            .then(response=>{
               
                this.reload();
            
            })
            .catch(error=>{
                
                console.log(error)
            })
           
        },
        tienda: function(){
            router.push('/tienda');
        },
        confirmPedir(){
            var funciones=this;
        $.confirm({
        title: 'Eliminar del carrito',
        content: '¿Deseas eliminar el producto del carrito?',
        buttons: {
        confirm: function () {
         // funciones.delete();
        },
        cancel: function () {
           
        },
        
        }
        });
        }
    }
}
</script>