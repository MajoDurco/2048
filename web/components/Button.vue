<template>
  <div @click="$emit('click')" class="button" type="type">
    <slot/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ["type"]
})
</script>

<style>
.button {
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: #766;
  border-radius: 5px;
  min-width: 150px;
  min-height: 40px;
  border-style: none;

  color: #eee;
  font-weight: bold;
  font-size: 1.5em;
}
</style>
