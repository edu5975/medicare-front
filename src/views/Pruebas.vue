<template>
  <div>
    <Multiselect
      v-model="alergias.value"
      v-bind="alergias"
    >
    </Multiselect>
    <Multiselect
      v-model="enfermedades.value"
      v-bind="enfermedades"
    >
    </Multiselect>
    <Multiselect
      v-model="cirugias.value"
      v-bind="cirugias"
    >
    </Multiselect>    
    <button @click="imprime()">prueba</button>
  </div>


  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <label>Pais</label>
          <select class="custom-select"  style="width:100%" v-model="pais" @change="state()">  
            <option v-for="(obj,key) in JsonPaises"  :key="key" v-bind:value="{id: key, nombre: obj.name, codigo:obj.alpha2Code}">{{obj.name}}</option>
          </select>
        </div>
      </div>     
      <div class="col-md-4">
          <div class="form-group">
            <label>Estado</label>
            <select class="custom-select"  style="width:100%" v-model="estado"  @change="cmunicipio()">
              <option v-for="(obj,key) in JsonEstados"  :key="key" :value="obj.name">{{obj.name}}</option>      
            </select>
          </div> 
      </div>
      <div class="col-md-4">
          <div class="form-group">
            <label>Municipio</label>
            <select class="custom-select"  style="width:100%" v-model="municipio">
              <option v-for="(obj,key) in JsonMunicipio"  :key="key" :value="obj.municipio">{{obj.municipio}}</option>      
            </select>
          </div> 
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">        
      <div id="geochart-colors" style="width: 100%; "></div>
      </div>
      <div class="col-md-4">
          <div class="form-group">
            <label>Municipio</label>
            <select class="custom-select"  style="width:100%" v-model="municipio">
              <option v-for="(obj,key) in JsonMunicipio"  :key="key" :value="obj.municipio">{{obj.municipio}}</option>      
            </select>
          </div> 
      </div>
    </div>
  </div>
</template>

<script>
  import Multiselect from '@vueform/multiselect'
  import axios from 'axios';
  import jsPDF from '../assets/js/jspdf';
  
  
var doc = new jsPDF()

doc.text(20, 20, 'This is the default font.')

doc.setFont('courier')
doc.setFontType('normal')
doc.text(20, 30, 'This is courier normal.')

doc.setFont('times')
doc.setFontType('italic')
doc.text(20, 40, 'This is times italic.')

doc.setFont('helvetica')
doc.setFontType('bold')
doc.text(20, 50, 'This is helvetica bold.')

doc.setFont('courier')
doc.setFontType('bolditalic')
doc.text(20, 60, 'This is courier bolditalic.')

//doc.save('mipdf.pdf');

  export default {
    components: {
      Multiselect,
    },
    async mounted(){
      const lista1 = await axios.get('https://proyecto-tweb.herokuapp.com/alergias')
      this.alergias.options = lista1.data;      
      const lista2 = await axios.get('https://proyecto-tweb.herokuapp.com/enfermedades')
      this.enfermedades.options = lista2.data;      
      const lista3 = await axios.get('https://proyecto-tweb.herokuapp.com/cirugias')
      this.cirugias.options = lista3.data;      
    },
    async beforeCreate(){
      const lista = await axios.get('https://restcountries.eu/rest/v2/all')
      this.JsonPaises = lista.data; 
      const lista2 = await axios.get('https://countriesnow.space/api/v0.1/countries/states')
      this.JsonPaises2 = lista2.data.data; 
    },
    data() {
      return {
        alergias: {
          mode: 'tags',
          value: [],
          placeholder: 'Si tienes una o más alergias elige a continuación',
          label:'descripcion',
          valueProp: 'id',
          trackBy:'descripcion',
          hideSelected: true,
          filterResults: true,
          minChars: 1,
          resolveOnLoad: false,
          delay: 0,
          searchable: true,
          options: []
        },
        enfermedades: {
          mode: 'tags',
          value: [],
          placeholder: 'Si tienes una o más enfermedades cronicas elige a continuación',
          label:'descripcion',
          valueProp: 'id',
          trackBy:'descripcion',
          hideSelected: true,
          filterResults: true,
          minChars: 1,
          resolveOnLoad: false,
          delay: 0,
          searchable: true,
          options: []
        },
        cirugias: {
          mode: 'tags',
          value: [],
          placeholder: 'Si te han realizado una o más cirugias elige a continuación',
          label:'descripcion',
          valueProp: 'id',
          trackBy:'descripcion',
          hideSelected: true,
          filterResults: true,
          minChars: 1,
          resolveOnLoad: false,
          delay: 0,
          searchable: true,
          options: []
        },
        JsonPaises: [],
        JsonPaises2: [],
        JsonEstados: null,  
        JsonMunicipio: null,      
        estado: null,
        pais: null,
        municipio: null
      }
    },
    methods:{
      async imprime(){        
        console.log(this.alergias.value)        
        console.log(this.alergias.value.length)        
        console.log(this.alergias.value[0])
        console.log(this.alergias.options)
        console.log(this.enfermedades.value)
        console.log(this.enfermedades.options)
        console.log(this.cirugias.value)
        console.log(this.cirugias.options)
      },   
      cmunicipio: async function(){         
        const pais = this.pais.nombre;
        const estado = this.estado;
        console.log(pais + " " + estado)
        const lista = await axios.get('https://proyecto-tweb.herokuapp.com/mundo/'+pais+'/'+estado)
        this.JsonMunicipio = lista.data;     
      },  
      state: async function(){
        var dato = this.pais;
        this.JsonPaises2.forEach(element => {
          if(dato.nombre == element.name)
            this.JsonEstados = element.states;
        });

        document.getElementById('geochart-colors')
        google.charts.load('upcoming', {
        'packages': ['geochart']
        });

        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
          var data = google.visualization.arrayToDataTable([
            ['State', 'Accent'],
            ['Baja California', 100],
            ['Sonora', '100'],
            ['Chihuahua', '100'],
            ['Coahuila', '100'],
            ['Nuevo León', '100'],
            ['Tamaulipas', '100'],
            ['Sinaloa', '100'],
            ['Nayarit', '100'],
            ['Durango', '100'],
            ['Zacatecas', '400'],
            ['Jalisco', '400'],
            ['Colima', '400'],
            ['Tlaxcala', '400'],
            ['Aguascalientes', '400'],
            ['Zacatecas', '400'],
            ['San Luis Potosí', '400'],
            ['Puebla', '400'],
            ['Guanajuato', '400'],
            ['Querétaro', '400'],
            ['Hidalgo', '400'],
            ['Morelos', '400'],
            ['Estado de México', 400],
            ['Distrito Federal', 400],
            ['Baja California Sur', '200'],
            ['Michoacán', '200'],
            ['Guerrero', '200'],
            ['Oaxaca', '200'],
            ['Veracruz', '200'],
            ['Tabasco', '200'],
            ['Campeche', '300'],
            ['Chiapas', '200'],
            ['Quintana Roo', '300'],
            ['Yucatán', '300']
          ]);

          var options = {
            region: dato.codigo,
            resolution: 'provinces',
            colorAxis: {
              values: [0, 200, 300, 400],
              colors: ['green', 'yellow', 'orange','red']
            },
            backgroundColor: '#81d4fa',
            datalessRegionColor: '#eeeeee',
            defaultColor: '#f5f5f5',
          };

          var chart = new google.visualization.GeoChart(document.getElementById('geochart-colors'));
          chart.draw(data, options);
        };
      }
    }
  }

 
</script>

<style src="@vueform/multiselect/themes/default.css"></style>