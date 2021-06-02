<template>
  <div class="status">
    <span>Server status:</span>
    <div :class="{
      dot: true,
      green: connected,
      red: disconnected,
    }">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ServerStatus } from '../types'

export default Vue.extend({
  props: ['serverStatus'],
  computed: {
    connected() {
      return this.serverStatus === ServerStatus.CONNECTED
    },
    disconnected() {
      return this.serverStatus === ServerStatus.DISCONNECTED
    }
  }
})
</script>

<style>
.status {
  position: absolute;
  bottom: 0;
  left: 0;
}
.dot {
  width: 15px;
  height: 15px;
  border-radius: 100%;
  display: inline-block;
}
.green {
  background: green;
}
.red {
  background: red;
}
</style>
