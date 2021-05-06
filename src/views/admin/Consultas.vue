<template>
    <br>
    <div class="container fluid">
        <table id="table" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Paciente</th>
                    <th>Especialidad</th>                    
                    <th>Sintomas</th>                                   
                    <th>Estado</th>                                     
                    <th>Fecha</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj,key) in Json"  :key="key">
                    <th>{{obj.id}}</th>
                    <td>{{obj.paciente}}</td>
                    <td>{{obj.descripcion}}</td>                       
                    <td>{{obj.sintomas}}</td>                      
                    <td>{{obj.estado}}</td>     
                    <td>{{obj.fecha}}</td>  
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
            url: 'https://proyecto-tweb.herokuapp.com/consultas'
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
                url: 'https://proyecto-tweb.herokuapp.com/consultas'
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
                            url: 'https://proyecto-tweb.herokuapp.com/consultas/'+id
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
        },
        detalles: async function(id){
            var funciones = this;
            var venta;

            await axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/consultas/'+id
                })
            .then(response=>{
                venta = response.data;
                })
            .catch(error=>{
                console.log(error)
            })
            console.log(venta)

            var content = 
                '<form action="" class="formName">' +
                    '<div class="form-group">' +
                    '<label>ID: ' + venta.id + '</label><br>' +
                    '<label>ID paciente: ' + venta.idPacientes + '</label><br>' +
                    '<label>Paciente: ' + venta.paciente + '</label><br>' +
                    '<label>Total: ' + venta.total + '</label><br>' +
                    '<label>Fecha: ' + venta.fecha + '</label><br>'
                    '<label>Detalles de compra</label><ul>'
                    '</ul></div>' +
                '</form>';
                    

            $.confirm({
                columnClass: 'm',
                title:'Detalles de venta',
                content,
                buttons: {
                    confirm: function () {

                    }
                }
            });
        }   
    }
}
</script>

<style>

</style>