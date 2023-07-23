import { ref, onMounted, computed } from 'vue'

export default function useCripto(){

    const criptomonedas = ref([])
    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'ARS', texto: 'Peso Argentino'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
    ])
    // ref para api porque si fuera reactive habria que poner todos los campos y son muchos
    const cotizacion = ref({})
    const spinner = ref(false)
    
    // precargar datos con Promises
    onMounted(()=>{
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(data => {
            criptomonedas.value = data.Data
        })
    })

    // traer dato especifico con AsyncAwait
    // muestro spinner, oculto cotizacion al ponerlo vacio, se llena y oculto spinner
    const obtenerCotizacion = async (cotizar) => {
        spinner.value = true
        cotizacion.value = {}

        // el finally se ejecuta en ambas opciones
        try {
        const {moneda, criptomoneda} = cotizar
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    
        const respuesta = await fetch(url)
        const data = await respuesta.json()
    
        cotizacion.value = data.DISPLAY[criptomoneda][moneda]
        } catch (error) {
            console.log(error)
        } finally {
        spinner.value = false 
        }
    }

    // ver si el objeto esta vacio, y mostrar o no en base a eso
    const mostrarResultados = computed(()=>{
        return Object.values(cotizacion.value).length > 0
    })

    return{
        monedas,
        criptomonedas,
        spinner,
        cotizacion,
        obtenerCotizacion,
        mostrarResultados
    }
}