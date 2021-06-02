<template>
  <div class="flex-row flex-center margin-top-bottom">
    <div class="flex-right stones-name">
      Stones:
    </div>
    <div>
      <input
        id='zero'
        type="radio"
        value="0"
        :checked="stones === '0'"
        @change="$emit('update:stones', $event.target.value)"
        class="radio-stone"
      >
      <label class="radio-stone-label" for="zero">0</label>
    </div>
    <div>
      <input
        id='one'
        type="radio"
        value="1"
        :checked="stones === '1'"
        @change="$emit('update:stones', $event.target.value)"
        class="radio-stone"
      >
      <label class="radio-stone-label" for="one">1</label>
    </div>
    <div>
      <input
        id='two'
        type="radio"
        value="2"
        :checked="stones === '2'"
        @change="$emit('update:stones', $event.target.value)"
        class="radio-stone"
      >
      <label class="radio-stone-label" for="two">2</label>
    </div>
    <div>
      <input
        id='three'
        type="radio"
        value="3"
        :checked="stones === '3'"
        @change="$emit('update:stones', $event.target.value)"
        class="radio-stone"
      >
      <label class="radio-stone-label" for="three">3</label>
    </div>
    <div>
      <input
        id='four'
        type="radio"
        value="4"
        :checked="stones === '4'"
        @change="$emit('update:stones', $event.target.value)"
        class="radio-stone"
      >
      <label class="radio-stone-label" for="four">4</label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['stones']
})
</script>

<style>
.margin-top-bottom {
  margin: 10px;
}
.flex-center {
  justify-content: center;
}
.flex-row {
  flex-direction: row;
  display: flex;
}
.radio-stone {
  display: none;
}
.radio-stone:checked + label {
  background: #dcb;
  border-radius: 5px;
  font-weight: bold;
}
.radio-stone-label {
  display: inline-block;
  font-size: 1.5em;
  width: 40px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  color: #766;
}
.stones-name {
  color: #766;
  font-weight: bold;
  font-size: 2em;
}
</style>
