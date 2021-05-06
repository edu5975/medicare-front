<template>
<div class="card border-info mb-3" style="max-width: 20rem;margin:auto;margin-top:100px">
 
  <div class="card-body">
    <form>
  <fieldset>
    <legend>Inicio de Sesión</legend>
    <div class="form-group">
      <label for="exampleInputEmail1">Usuario</label>
      <input type="text" class="form-control" v-model="user" aria-describedby="emailHelp" placeholder="Ingresa el usuario" v-on:keyup.enter="login()">
      <small id="emailHelp" class="form-text text-muted">Nunca compartiremos tus datos con nadie mas.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Contraseña</label>
      <input type="password" class="form-control" v-model="password" placeholder="Contraseña" v-on:keyup.enter="login()"> 
      <small v-if="msg" id="emailHelp" class="form-text" style="color:red">Correo o contraseña invalidos</small>
    </div>
    

  </fieldset>
</form>
<div v-if="load">
  <small  id="emailHelp" class="form-text" style="color: #158cba">Estamos cargando tu informacion</small>
<div class="progress" style="margin-bottom:10px">
  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%;"></div>
</div>
</div>
<button class="btn btn-primary" @click="login()"  >Iniciar Sesión</button>
    <small  id="emailHelp" class="form-text text-muted">¿No tienes una cuenta? <router-link to="Registro">Crea una.</router-link></small>
  </div>
</div>
  
</template>


<script>
import axios from 'axios';
import router from '../router';
export default {
    data(){
        return{
            user: null,
            password: null,
            msg: false,
            logged: false,
            load:false
        }
    },
    created(){
    if(window.localStorage.getItem('logged')=='true'){router.push("/lobby")}
  },
    methods:{
        
        login: function(){
            this.load=true;
            this.msg=false;
            var body={
                user: this.user,
                password: this.password
            }
            axios({
                method: 'post',
                url: 'https://proyecto-tweb.herokuapp.com/login',
                data: body
                })
            .then(response=>{
              
                console.log(this.logged)
                console.log(response.data);
                window.localStorage.setItem('logged',true);
                window.localStorage.setItem('id', response.data.id);
                window.localStorage.setItem('role', response.data.role);
                window.localStorage.setItem('refreshed',false);
                this.$forceUpdate();
                router.push('/lobby');
            })
            .catch(error=>{
                this.msg=true;
                this.load=false;
                console.log(error)
            })

            
            
        }
    } 
}
</script>