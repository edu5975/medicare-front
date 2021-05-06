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
                    <th>Especialidad</th>  
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
                    <td>{{obj.descripcion}}</td>
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
            url: 'https://proyecto-tweb.herokuapp.com/medicos'
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
                url: 'https://proyecto-tweb.herokuapp.com/medicos'
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
                            url: 'https://proyecto-tweb.herokuapp.com/medicos/'+id
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
            var medico = {
                "id": 0,
                "nombres": "",
                "apellidoPaterno": "",
                "apellidoMaterno": "",
                "cedula":"",
                "direccion": "",
                "municipio": "",
                "estado": "",
                "pais": "",
                "telefono": "",
                "email": "",
                "user": "",
                "password": "",
                "idEspecialidades":0
            }; 
            var especialidades;           
            var funciones = this;
            var title;

            if(id!=0){
                title = "Actualizar medico"
                await axios({
                    method: 'get',
                    url: 'https://proyecto-tweb.herokuapp.com/medicos/'+id
                })
                .then(response=>{
                    medico = response.data;
                    console.log(medico);
                })
                .catch(error=>{
                    console.log(error)
                })
            }
            else{
                title = "Nuevo "
            }

            await axios({
                method: 'get',
                url: 'https://proyecto-tweb.herokuapp.com/especialidades'
                })
                .then(response=>{
                    especialidades = response.data;
                })
                .catch(error=>{
                    console.log(error)
                })

            var content = 
                '<form action="" class="formName">' +
                    '<div class="form-group">' +
                    '<label>Ingrese los datos del medico</label>' +
                        '<input type="text" placeholder="Nombre(s)" class="nombres form-control" required value="'+medico.nombres+'" />' +
                        '<input type="text" placeholder="Apellido Paterno" class="apellidoPaterno form-control" required value="'+medico.apellidoPaterno+'" />' +
                        '<input type="text" placeholder="Apellido Materno" class="apellidoMaterno form-control" required value="'+medico.apellidoMaterno+'" />' +                        
                        '<input type="text" placeholder="Cedula" class="cedula form-control" required value="'+medico.cedula+'" />' +
                        '<input type="text" placeholder="Direccion" class="direccion form-control" required value="'+medico.direccion+'" />' +
                        '<input type="text" placeholder="Pais" class="pais form-control" required value="'+medico.pais+'" />' +
                        '<input type="text" placeholder="Estado" class="estado form-control" required value="'+medico.estado+'" />' +
                        '<input type="text" placeholder="Municipio" class="municipio form-control" required value="'+medico.municipio+'" />' +                                        
                        '<input type="text" placeholder="Telefono" class="telefono form-control" required value="'+medico.telefono+'" />' +
                        '<select class="idEspecialidades form-control">';
            
            especialidades.forEach(element => {
                if(element.id == medico.idEspecialidades)
                    content += '<option selected value="'+element.id+'" >'+element.descripcion+'</option>';
                else                    
                    content += '<option value="'+element.id+'" >'+element.descripcion+'</option>';
            });

            content +=
                        '</select>' +
                        '<input type="text" placeholder="Email" class="email form-control" required value="'+medico.email+'" />' +
                        '<input type="text" placeholder="Usuario" class="user form-control" required value="'+medico.user+'" />' +
                        '<input type="text" placeholder="Contraseña" class="password form-control" required value="" />' +                        
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
                            medico.nombres = this.$content.find('.nombres').val();                            
                            medico.apellidoMaterno = this.$content.find('.apellidoMaterno').val();
                            medico.apellidoPaterno = this.$content.find('.apellidoPaterno').val();                            
                            medico.cedula = this.$content.find('.cedula').val();
                            medico.direccion = this.$content.find('.direccion').val();
                            medico.pais = this.$content.find('.pais').val();
                            medico.estado = this.$content.find('.estado').val();
                            medico.municipio = this.$content.find('.municipio').val();
                            medico.telefono = this.$content.find('.telefono').val();
                            medico.email = this.$content.find('.email').val();
                            medico.user = this.$content.find('.user').val();
                            medico.password = this.$content.find('.password').val();
                            medico.idEspecialidades = this.$content.find('.idEspecialidades').val();
                            
                            if(id==0){
                                funciones.guardar(
                                    medico
                                );
                            }
                            else{
                                funciones.editar(
                                    medico
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
                url: 'https://proyecto-tweb.herokuapp.com/medicos',
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
                url: 'https://proyecto-tweb.herokuapp.com/medicos/'+data.id,
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