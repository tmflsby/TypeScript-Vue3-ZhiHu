<template>
  <div id="app">
    <img src="./assets/logo.png" alt="Vue Logo">
    <h1>{{count}}</h1>
    <h1>{{double}}</h1>
    <ul>
      <li v-for="number in numbers" :key="number">
        <h1>{{number}}</h1>
      </li>
    </ul>
    <h1>{{person.name}}</h1>
    <h1>{{greetings}}</h1>
<!--    <h1 v-if="loading">Loading...</h1>-->
<!--    <img v-if="loaded" :src="result.message" alt="">-->
    <h1 v-if="loading">Loading...</h1>
    <img v-if="loaded" :src="result[0].url" alt="">
    <h1>X: {{x}}, Y: {{y}}</h1>
    <button @click="openModal">Open Modal</button>
    <Modal :is-open="modalIsOpen" @close-modal="onModalClose">
      my Modal
    </Modal>
    <Suspense>
      <template #default>
        <div>
          <AsyncShow/>
          <DogShow/>
        </div>
      </template>
      <template #fallback>
        <h1>Loading...</h1>
      </template>
    </Suspense>
    <p>{{error}}</p>
    <button @click="increase">👍+1</button>
    <button @click="updateGreeting">Update Title</button>
  </div>
</template>

<script lang="ts">
import {
  ref, computed, reactive, toRefs, watch,
  onMounted, onUpdated, onRenderTriggered, onErrorCaptured
} from 'vue'
import Modal from '@/components/Modal.vue'
import AsyncShow from '@/components/AsyncShow.vue'
import DogShow from '@/components/DogShow.vue'
import useMousePosition from '@/hooks/useMousePosition'
import useURLLoader from '@/hooks/useURLLoader'
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: { name?: string };
}
interface DogResult {
  message: string;
  status: string;
}
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
export default {
  name: 'App',
  components: { Modal, AsyncShow, DogShow },
  setup() {
    // const count = ref(0)
    // const double = computed(() => {
    //   return count.value * 2
    // })
    // const increase = () => {
    //   count.value++
    // }
    // return {
    //   count,
    //   double,
    //   increase
    // }

    const data: DataProps = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      increase: () => { data.count++ },
      numbers: [0, 1, 2],
      person: {}
    })
    data.numbers[0] = 5
    data.person.name = 'Curry'
    const refData = toRefs(data)

    onMounted(() => {
      console.log('mounted')
    })

    onUpdated(() => {
      console.log('updated')
    })

    onRenderTriggered(event => {
      console.log(event)
    })

    const greetings = ref('')
    const updateGreeting = () => {
      greetings.value += 'hello!'
    }
    watch([greetings, () => data.count], (newValue, oldValue) => {
      console.log('old', oldValue)
      console.log('new', newValue)
      document.title = 'updated' + greetings.value + data.count
    })

    const { x, y } = useMousePosition()

    // const { result, loading, loaded } = useURLLoader<DogResult>('https://dog.ceo/api/breeds/image/random')
    // watch(result, () => {
    //   if (result.value) {
    //     console.log('value', result.value.message)
    //   }
    // })
    const { result, loading, loaded } = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')
    watch(result, () => {
      if (result.value) {
        console.log('value', result.value[0].url)
      }
    })

    const modalIsOpen = ref(false)
    const openModal = () => {
      modalIsOpen.value = true
    }
    const onModalClose = () => {
      modalIsOpen.value = false
    }

    const error = ref(null)
    onErrorCaptured((e: any) => {
      error.value = e
      return true
    })
    return {
      ...refData,
      greetings,
      updateGreeting,
      x,
      y,
      result,
      loading,
      loaded,
      modalIsOpen,
      openModal,
      onModalClose,
      error
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
