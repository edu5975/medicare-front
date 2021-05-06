<template>
    <div style="text-align:center">
<h2>Carrito</h2>
   <div v-if="!carrito" class="alert alert-dismissible alert-secondary" style="margin:auto;max-width:500px;margin-top:50px;text-align:center">
  <strong>Tu carrito está vacio. Agrega producots desde la tienda para que puedas verlos aqui</strong><br>
  <button type="button" class="btn btn-primary btn-lg" style="margin-top:10px" @click="tienda()">Ir a la tienda</button>
</div>
<ul class="list-group" style="max-width:80%; margin: auto">
    <div class="row"  v-for="(obj,key) in carrito"  :key="key" style="height:70px">
		<div class="col-md-1" >
            <img src="@/assets/images/cancel.png"  style="width:15px;cursor: pointer;" title="Eliminar archivo" @click="confirmEliminar(obj.id,obj.cantidad)"/>
            <img :src="'https://proyecto-tweb.herokuapp.com/images/'+obj.foto" style="width:50px;height:50px;border-radius:10px"/>
		</div>
		<div class="col-md-11">
            <li class="list-group-item d-flex justify-content-between align-items-center" style="text-align:left">
    {{obj.nombre}}<br>Precio: ${{obj.costo}}
    <span class="badge badge-primary badge-pill">Cantidad: {{obj.cantidad}}</span>
    <span class="badge badge-primary badge-pill">Total: ${{obj.cantidad*obj.costo}}</span>
  </li>
		</div>
	</div>
  
  </ul>
  <div style="max-width:80%;margin: auto;text-align:right">
  <h3 v-html="total" style="margin-right:20px" v-if="carrito"></h3>
  <button type="button" class="btn btn-success" @click="cobro()" v-if="carrito">Realizar Pedido</button>
 
  
 
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
                this.total="Pagas: $"+this.total;
                
            })
            .catch(error=>{
                
            })
    },
    
    methods: {
        cobro: function(){
            router.push('/pago')
        },
        reload: function(){
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
                this.total="Pagas: $"+this.total;
                
            })
            .catch(error=>{
                
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
        confirmEliminar(id,c){
            var funciones=this;
        $.confirm({
        title: 'Eliminar del carrito',
        content: '¿Deseas eliminar el producto del carrito?',
        buttons: {
        confirm: function () {
          funciones.delete(id,c);
        },
        cancel: function () {
           
        },
        
        }
        });
        }
    }
}
</script>