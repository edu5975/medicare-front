<template>
    
</template>

<script>
import router from '../router';
export default {
    beforeCreate(){
        if(window.localStorage.getItem('logged')!='true'){
            router.push('login');
        }else{
            if(window.localStorage.getItem('role')=='1'){
                router.push("/medico")
            }else if(window.localStorage.getItem('role')=='0'){
                router.push("/paciente")
            }else if(window.localStorage.getItem('role')=='2'){
                router.push("/admin")
            }
        }


        if(window.localStorage.getItem('refreshed')!=null){
            localStorage.removeItem('refreshed');
            router.go(0);
        }
    }
}
</script>