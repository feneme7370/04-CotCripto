<script setup>
  import { ref, reactive } from 'vue';
  import Alerta from './components/Alerta.vue'
  import Spinner from './components/Spinner.vue'
  import Cotizacion from './components/Cotizacion.vue'

  import useCripto from './composables/useCripto.js'

  const { monedas, criptomonedas, spinner, obtenerCotizacion, cotizacion, mostrarResultados } = useCripto()

  const error = ref('')
  const cotizar = reactive({
    moneda: '',
    criptomoneda: ''
  })

  // validar que este lleno
  const cotizarCripto = () => {
    if(Object.values(cotizar).includes('')){
      error.value = 'Todos los campos son obligatorios'
      return
    }
    error.value = ''
    obtenerCotizacion(cotizar)
  }
</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>

    <div class="contenido">

      <Alerta
        v-if="error"
      >{{error}}</Alerta>

      <form class="formulario" @submit.prevent="cotizarCripto">
        <div class="campo">
          <label for="moneda">Moneda: </label>
          <select 
            id="moneda"
            v-model="cotizar.moneda"
          >
            <option value="">-- Selecciona --</option>
            <option v-for="moneda in monedas" :value="moneda.codigo">{{moneda.texto}}</option>
          </select>
        </div>
        <div class="campo">
          <label for="cripto">Criptomoneda: </label>
          <select 
            id="cripto"
            v-model="cotizar.criptomoneda"
          >
            <option value="">-- Selecciona --</option>
            <option v-for="criptomoneda in criptomonedas" :value="criptomoneda.CoinInfo.Name">{{criptomoneda.CoinInfo.FullName}}</option>
          </select>
        </div>

        <input type="submit" value="Cotizar" @click="obtenerCotizacion">
      </form>

      <Spinner
        v-if="spinner"
      />

      <Cotizacion
        v-if="mostrarResultados"
        :cotizacion="cotizacion"
      />

    </div>
  </div>
</template>

<style scoped>

</style>
