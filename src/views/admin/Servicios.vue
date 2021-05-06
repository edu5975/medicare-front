<template>
    <br>
    <div class="container fluid">
        <table id="table" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Descripción</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj,key) in Json"  :key="key">
                    <th>{{obj.id}}</th>
                    <td>{{obj.descripcion}}</td>
                    <td>
                        <button type="button" class="btn btn-warning" @click="registro(obj.descripcion,obj.id)">Editar</button>
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



function tabla() { 
    table.destroy();
    table = $('#table').DataTable({
        dom: 'Blfrtip',
        buttons: [                    
            {
                text: 'Nuevo',
                action: function ( e, dt, node, config ) {
                    funciones.registro();
                }
            },
            'pdf'
            ]
    });
}


export default {
    data: ()=>({
        Json: null,
        descripcion:null
    }),
    created(){
        var funciones = this;     
        axios({
            method: 'get',
            url: 'https://proyecto-tweb.herokuapp.com/servicios'
            })
        .then(response=>{
            this.Json=response.data;   
            $(document).ready(function() {
                $('#table').DataTable({
                dom: 'Blfrtip',
                buttons: [                    
                    {
                        text: 'Nuevo',
                        action: function ( e, dt, node, config ) {
                            funciones.registro();
                        }
                    },
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
                url: 'https://proyecto-tweb.herokuapp.com/servicios'
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
                            url: 'https://proyecto-tweb.herokuapp.com/servicios/'+id
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
        registro:function(descripcion="",id=0){
            var funciones = this;
            var title;

            if(id!=0){
                title = "Actualizar servicio"
            }
            else{
                title = "Nueva servicio"
            }

            $.confirm({
                title,
                content: '' +
                '<form action="" class="formName">' +
                    '<div class="form-group">' +
                    '<label>Ingrese el nombre de la servicio</label>' +
                    '<input type="text" placeholder="Descripción" class="descripcion form-control" required value="'+descripcion+'" />' +
                    '</div>' +
                '</form>',
                buttons: {
                    formSubmit: {
                        text: 'Registrar',
                        btnClass: 'btn-blue',
                        action: function () {                            
                            descripcion = this.$content.find('.descripcion').val();
                            if(!descripcion&&descripcion!=""){
                                $.alert('Ingrese una entrada valida');
                                return false;
                            } 
                            if(id==0){
                                funciones.guardar({
                                    descripcion
                                });
                            }
                            else{
                                funciones.editar({
                                    id,
                                    descripcion
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
        guardar:function(data){
            console.log(data);
            axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/servicios',
                data
                })
            .then(response=>{
                this.iniciar();
            })
            .catch(error=>{                                
                console.log(error)
            })                            
        },
        editar:function(data){
            console.log(data);
            axios({
                method: 'put',
                url: 'https://proyecto-tweb.herokuapp.com/servicios/'+data.id,
                data
                })
            .then(response=>{
                this.iniciar();
            })
            .catch(error=>{                                
                console.log(error)
            })                            
        }        
    }
}
</script>

<style>

</style>