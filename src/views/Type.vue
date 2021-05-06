<template>
    <div style="margin-top:100px">
        <fieldset>
            <legend>¿Como deseas registrarte?</legend>
            <div class="form-group" style="width: 30%; margin:auto">
    <select class="custom-select" v-model="type">
      <option value="1">Paciente</option>
      <option value="2">Medico</option>
    </select>
  </div>
        </fieldset>
        <button class="btn btn-primary" @click="types()" style="margin-top:20px">Continuar</button>
        
    </div>
</template>

<script>
import router from '../router'
export default {
    
    data(){
        return{
            type: null
        }
    },
    methods:{ 
        types: function(){
            
            if(this.type==1){
                router.push('Registropaciente');
            }else if(this.type==2){
                router.push('Registromedico');
            }
        }

    }
}
</script>