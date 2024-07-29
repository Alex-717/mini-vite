<script>
import { ref } from 'vue'
export default {
  setup() {
    const msg = ref('mini-vite')
    console.log('我是vue script部分')

    function changeMsg () {
      msg.value = 'hello，哈哈哈'
    }

    return {
      msg,
      changeMsg
    }
  }
}
</script>

<template>
  <div>
    <div class="haha">
      <span @click="changeMsg">{{ msg }}</span>
    </div>
    <div class="ad">
       <a href="https://vitejs.dev" target="_blank">
        <h1>vite</h1>
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <h1>vue</h1>
      </a>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.ad{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.ad a + a {
  margin-left: 50px;  
}

.haha{
  margin-top: 200px;
  margin-bottom: 100px;
  text-align: center;
  color: red;
  font-size: 30px;
  font-weight: bold;
}
.haha span {
  cursor: pointer;
}
</style>
