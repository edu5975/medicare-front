<template>
    <br>
    <div class="container fluid">
        <table id="table" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Paciente</th>
                    <th>Total</th>
                    <th>Fecha</th>                    
                    <th>Detalles</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj,key) in Json"  :key="key">
                    <th>{{obj.id}}</th>
                    <td>{{obj.paciente}}</td>
                    <td>{{obj.fecha}}</td>
                    <td>{{obj.total}}</td>                    
                    <td>
                        <button type="button" class="btn btn-success" @click="detalles(obj.id)">Detalles</button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger" @click="eliminar(obj.id)">Eliminar</button>
                    </td>
                </tr> 
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import router from '../../router';

export default {
    data: ()=>({
        Json: null,
        descripcion:null
    }),
    created(){
        var funciones = this;     
        axios({
            method: 'get',
            url: 'https://proyecto-tweb.herokuapp.com/ventas'
            })
        .then(response=>{
            this.Json=response.data;   
            $(document).ready(function() {
                $('#table').DataTable({
                dom: 'Blfrtip',
                buttons: [ 
                        'pdf'
                    ]
                });
            } ); 
        })
        .catch(error=>{
                console.log(error)
        });
    },
    beforeCreate(){   
        if(window.localStorage.getItem('role')!=2){router.push('/lobby')}
    },
    methods: {
        iniciar:function () {  
            axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/ventas'
                })
            .then(response=>{
                this.Json=response.data; 
            })
            .catch(error=>{
                console.log(error)
            })
        },
        eliminar: function(id){
            var funciones = this;
            $.confirm({
                title: '¿Esta seguro?',
                content: 'Confirme si desea eliminar el registro',
                buttons: {
                    confirm: function () {                        
                        axios({
                            method: 'delete',
                            url: 'https://proyecto-tweb.herokuapp.com/ventas/'+id
                            })
                        .then(response=>{
                            funciones.iniciar();
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

<style>

</style>