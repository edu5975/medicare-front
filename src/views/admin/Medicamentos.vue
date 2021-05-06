<template>
    <br>
    <div class="container fluid" >
        <table id="table" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Foto</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj,key) in Json"  :key="key">
                    <th>{{obj.id}}</th>
                    <td>{{obj.nombre}}</td>
                    <td>{{obj.descripcion}}</td>                    
                    <td><img  v-bind:src="'https://proyecto-tweb.herokuapp.com/images/' + obj.foto" width="100" height="100"></td>
                    <td>
                        <button type="button" class="btn btn-warning" @click="registro(obj.id,obj.nombre,obj.descripcion,obj.costo,obj.foto)">Editar</button>
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
import router from '../../router';
import axios from 'axios';

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
            url: 'https://proyecto-tweb.herokuapp.com/medicamentos'
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
                url: 'https://proyecto-tweb.herokuapp.com/medicamentos'
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
                            url: 'https://proyecto-tweb.herokuapp.com/medicamentos/'+id
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
        registro:function(id=0,nombre="",descripcion="",costo="",foto=""){
            var funciones = this;
            var title;

            if(id!=0){
                title = "Actualizar medicamento"
            }
            else{
                title = "Nueva medicamento"
            }

            var content = 
                '<form action="" class="formName" enctype="multipart/form-data" >' +
                    '<div class="form-group">' +
                    '<label>Ingrese los datos del medicamento</label>' +
                        '<input name="nombre" type="text" placeholder="Nombre" class="nombre form-control" required value="'+nombre+'" />' +
                        '<input name="descripcion" type="text" placeholder="Descripción" class="descripcion form-control" required value="'+descripcion+'" />' +
                        '<input name="costo" type="text" placeholder="Costo" class="costo form-control" required value="'+costo+'" />' +
                        '<input name="foto" type="file" placeholder="Foto" class="foto form-control" required />';
            if(id!=0)
                content +=
                        '<img src="https://proyecto-tweb.herokuapp.com/images/'+foto+'"  width="300" height="300">';            
            content +=
                    '</div>' +
                '</form>';

            $.confirm({
                columnClass: 'l',
                title,
                content,
                buttons: {
                    formSubmit: {
                        text: 'Registrar',
                        btnClass: 'btn-blue',
                        action: function () {                            
                            descripcion = this.$content.find('.descripcion').val();
                            nombre = this.$content.find('.nombre').val();
                            costo = this.$content.find('.costo').val();
                            
                            var blobFile = this.$content.find('.foto')[0].files[0];

                            var formData = new FormData();
                            formData.append("nombre", nombre);
                            formData.append("descripcion", descripcion);
                            formData.append("costo", costo);
                            formData.append("foto", blobFile);
                            
                            if(id==0){
                                funciones.guardar(
                                    formData
                                );
                            }
                            else{
                                formData.id = id;
                                funciones.editar(
                                    formData
                                );
                            }
                            
                        }                      
                    },
                    cancel: function () {
                        //close
                    },
                }
            });
        },
        guardar: async function(data){
            console.log(data);
            await axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/medicamentos',
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
                url: 'https://proyecto-tweb.herokuapp.com/medicamentos/'+data.id,
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