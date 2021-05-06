<template>
  <br>
  <div class="container">
    <div class="row">
      <div class="col-md-5">
        <div class="form-group">
          <label>Pais</label>
          <select class="custom-select"  style="width:100%" v-model="pais" @change="state()">  
            <option v-for="(obj,key) in JsonPaises"  :key="key" v-bind:value="{id: key, nombre: obj.name, codigo:obj.alpha2Code}">{{obj.name}}</option>
          </select>
        </div>
      </div>     
      <div class="col-md-5">
          <div class="form-group">
            <label>Estado</label>
            <select class="custom-select"  style="width:100%" v-model="estado" @change="muni()" >
              <option v-for="(obj,key) in JsonEstados"  :key="key" :value="obj.name">{{obj.name}}</option>      
            </select>
          </div> 
      </div>
      <div class="col-md-2">
          <div class="form-group">
            <label>Reiniciar mundo</label>            
            <button  class="btn btn-primary" @click="recargar()">Recargar</button>
          </div> 
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">        
      <div id="geochart-colors" style="width: 700px; "></div>
      </div>
      <div class="col-md-4">        
        <div id="accordion">
          <div class="card"  v-for="(obj,key) in JsonEstadisticas"  :key="key">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link" data-toggle="collapse" v-bind:data-target="'#collapse'+obj.string" aria-expanded="true" aria-controls="collapseOne">
                  {{obj.string}}
                </button>
              </h5>
            </div>
            <div v-bind:id="'collapse'+obj.string" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body">
                Total: {{obj.total}} <br>
                Curados: {{obj.curados}}<br>
                Sospechosos: {{obj.sospechosos}}<br>
                Confirmados: {{obj.confirmados}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
import router from '../router';
  
  export default {
    async mounted(){   
      this.recargar();
    },
    async beforeCreate(){
      const lista = await axios.get('https://restcountries.eu/rest/v2/all')
      this.JsonPaises = lista.data; 
      const lista2 = await axios.get('https://countriesnow.space/api/v0.1/countries/states')
      this.JsonPaises2 = lista2.data.data; 

    },
    data() {
      return {
        JsonPaises: [],
        JsonPaises2: [],
        JsonEstados: [],  
        JsonEstadisticas: [],      
        estado: null,
        pais: null
      }
    },
    methods:{
      recargar: async function (){
        try {          
        const lista = await axios.get('https://proyecto-tweb.herokuapp.com/covide/')
        this.JsonEstadisticas = lista.data; 
        } catch (error) {             
        this.JsonEstadisticas = [{'string':'No hay registros'}];         
        }
        this.estado = null,
        this.pais = null,
        this.remapear();
      },
      muni: async function () {    
        var pais = this.pais.nombre;  
        var estado = this.estado; 
        try {          
        const lista = await axios.get('https://proyecto-tweb.herokuapp.com/covide/'+pais+'/'+estado)
        this.JsonEstadisticas = lista.data; 
        } catch (error) {     
        this.JsonEstadisticas = [{'string':'No hay registros'}];       
        }
      },
      state: async function(){
        var dato = this.pais;
        this.JsonPaises2.forEach(element => {
          if(dato.nombre == element.name)
            this.JsonEstados = element.states;
        });       
        try {          
        const lista = await axios.get('https://proyecto-tweb.herokuapp.com/covide/'+dato.nombre)
        this.JsonEstadisticas = lista.data; 
        } catch (error) {            
        this.JsonEstadisticas = [{'string':'No hay registros'}];         
        }
        this.remapear(dato);
      },
      remapear(p=null){
        document.getElementById('geochart-colors')
        google.charts.load('upcoming', {
        'packages': ['geochart'],
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        async function drawRegionsMap() {
          var options = {
            backgroundColor: '#81d4fa',
            datalessRegionColor: '#eeeeee',
            defaultColor: '#f5f5f5',
          };

          var info = [];
          info.data = [];
          if(p){
            options.region = p.codigo
            options.resolution = 'provinces'   
            try {
              info = await axios.get('https://proyecto-tweb.herokuapp.com/covide/'+p.nombre)                
            } catch (error) {
            }                   
          }
          else{           
            options.resolution = 'world'
            try {              
            info = await axios.get('https://proyecto-tweb.herokuapp.com/covide')  
            } catch (error) {              
            }
          }

          var array = [
            ['State', 'Total'],
            ['Ejemplo',0]
          ];               
          const infoarray = info.data; 
          var max=1;     
          infoarray.forEach(element => {            
           array.push([element.string,element.total])
           if(element.total > max)
            max = element.total 
          });


          options.colorAxis= {
              values: [0, max/3, 2*max/3,max],
              colors: ['green', 'yellow', 'orange','red']
            }
          
          var data = google.visualization.arrayToDataTable(array);
          var chart = new google.visualization.GeoChart(document.getElementById('geochart-colors'));
          chart.draw(data, options);
        };
      }
    }
  }

 
</script>

<style></style>