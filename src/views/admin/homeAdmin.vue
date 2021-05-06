<template>
    <div class="jumbotron" style="margin-top:100px;">
    <h1 class="display-3">Bienvenido!</h1>
        <p class="lead">Esta es la ventana de administrador donde podras gestionar toda la informacion!.</p>
        <hr class="my-4">
        <p>En la parte superior podras encontrar los diferentes campos existentes en el sistema. </p>

 </div>
</template>

<script>
import router from '../../router';

export default{
    beforeCreate(){
        if(window.localStorage.getItem('role')!=2){router.push('/lobby')}
    }
}
</script>