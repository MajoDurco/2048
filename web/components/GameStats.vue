<template>
  <div class="stats">
    <div class="box">
      <div class="key">
        Score
      </div>
      <div class="value">
        {{ score }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['score'],
})
</script>

<style>
.stats {
  display: flex;
  flex-direction: row-reverse;
}
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  min-height: 50px;
  background: #766;
  border-radius: 10px;
}
.key {
  color: #dcb;
  font-weight: bold;
  font-size: 1em;
}
.value {
  color: #eee;
  font-weight: bold;
  font-size: 1.2em;
}
</style>
