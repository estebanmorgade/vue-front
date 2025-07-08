import { defineStore } from "pinia";
import { ref, computed} from "vue";

export const useCounterStore = defineStore('counter', () => {

    // Estado reactivo
    const count = ref(0)

    // Computado: derivacion del estado
    const double = computed(() => count.value *2)

    // Accion: funcion que modifica el estado
    function increment() {
        count.value++
    }

    // Se escporta todo lo que se quiere usar en los componentes
    return { count, double, increment }
})