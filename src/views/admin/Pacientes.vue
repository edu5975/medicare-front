<template>
    <br>
    <div class="container fluid" >
        <table id="table" class="display">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombres</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>  
                    <th>Telefono</th> 
                    <th>Email</th>
                    <th>Usuario</th>                 
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj,key) in Json"  :key="key">
                    <th>{{obj.id}}</th>
                    <td>{{obj.nombres}}</td>
                    <td>{{obj.apellidoPaterno}}</td>
                    <td>{{obj.apellidoMaterno}}</td>
                    <td>{{obj.telefono}}</td>
                    <td>{{obj.email}}</td>
                    <td>{{obj.user}}</td>
                    <td>
                        <button type="button" class="btn btn-warning" @click="registro(obj.id)">Editar</button>
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

export default {
    data: ()=>({
        Json: null,
        descripcion:null
    }),
    created(){
        var funciones = this;     
        axios({
            method: 'get',
            url: 'https://proyecto-tweb.herokuapp.com/pacientes'
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
        iniciar:async function () {  
            await axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes'
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
                            url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+id
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
        registro: async function(id=0){
            var paciente = {
                "id": 0,
                "nombres": "",
                "apellidoPaterno": "",
                "apellidoMaterno": "",
                "direccion": "",
                "municipio": "",
                "estado": "",
                "pais": "",
                "nacimiento": "",
                "telefono": "",
                "email": "",
                "user": "",
                "password": "",
                "enfermedades": [],
                "alergias": [],
                "cirugias": []
            };            
            var funciones = this;
            var title;

            if(id!=0){
                title = "Actualizar paciente"
                await axios({
                    method: 'get',
                    url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+id
                })
                .then(response=>{
                    paciente = response.data;
                    console.log(paciente);
                })
                .catch(error=>{
                    console.log(error)
                })
            }
            else{
                title = "Nuevo "
            }
            $.confirm({
                columnClass: 'l',
                title,
                content: '' +
                '<form action="" class="formName" enctype="multipart/form-data" >' +
                    '<div class="form-group">' +
                    '<label>Ingrese los datos del paciente</label>' +
                        '<input type="text" placeholder="Nombre(s)" class="nombres form-control" required value="'+paciente.nombres+'" />' +
                        '<input type="text" placeholder="Apellido Paterno" class="apellidoPaterno form-control" required value="'+paciente.apellidoPaterno+'" />' +
                        '<input type="text" placeholder="Apellido Materno" class="apellidoMaterno form-control" required value="'+paciente.apellidoMaterno+'" />' +                        
                        '<input type="text" placeholder="Direccion" class="direccion form-control" required value="'+paciente.direccion+'" />' +
                        '<input type="text" placeholder="Pais" class="pais form-control" required value="'+paciente.pais+'" />' +
                        '<input type="text" placeholder="Estado" class="estado form-control" required value="'+paciente.estado+'" />' +
                        '<input type="text" placeholder="Municipio" class="municipio form-control" required value="'+paciente.municipio+'" />' +                        
                        '<input type="date" placeholder="Nacimiento" class="nacimiento form-control" required value="'+paciente.nacimiento.substr(0,10)+'" />' +                        
                        '<input type="text" placeholder="Telefono" class="telefono form-control" required value="'+paciente.telefono+'" />' +
                        '<input type="text" placeholder="Email" class="email form-control" required value="'+paciente.email+'" />' +
                        '<input type="text" placeholder="Usuario" class="user form-control" required value="'+paciente.user+'" />' +
                        '<input type="text" placeholder="Contraseña" class="password form-control" required value="" />' +                        
                    '</div>' +
                '</form>',
                buttons: {
                    formSubmit: {
                        text: 'Registrar',
                        btnClass: 'btn-blue',
                        action: function () {                            
                            paciente.nombres = this.$content.find('.nombres').val();                            
                            paciente.apellidoMaterno = this.$content.find('.apellidoMaterno').val();
                            paciente.apellidoPaterno = this.$content.find('.apellidoPaterno').val();
                            paciente.direccion = this.$content.find('.direccion').val();
                            paciente.pais = this.$content.find('.pais').val();
                            paciente.estado = this.$content.find('.estado').val();
                            paciente.municipio = this.$content.find('.municipio').val();
                            paciente.nacimiento = this.$content.find('.nacimiento').val();
                            paciente.telefono = this.$content.find('.telefono').val();
                            paciente.email = this.$content.find('.email').val();
                            paciente.user = this.$content.find('.user').val();
                            paciente.password = this.$content.find('.password').val();
                            
                            if(id==0){
                                funciones.guardar(
                                    paciente
                                );
                            }
                            else{
                                funciones.editar(
                                    paciente
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
        guardar:async function(data){
            console.log(data);
            await axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes',
                data
                })
            .then(response=>{
                this.iniciar();
            })
            .catch(error=>{                                
                console.log(error)
            })                            
        },
        editar:async function(data){
            console.log(data);
            await axios({
                method: 'put',
                url: 'https://proyecto-tweb.herokuapp.com/pacientes/'+data.id,
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