<template>
    
</template>
<script>
import router from '../router';
export default {
    created(){
        var status=window.localStorage.getItem('logged');
        console.log(status);
        if(status=='true'){
        console.log('in');
        window.localStorage.setItem('logged',false);
        localStorage.removeItem('id');
        localStorage.removeItem('role');
        router.go(0);
        }else{
            router.push('/');
        }
        
        
        
        
    }
}
</script>