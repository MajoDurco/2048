<template>
  <div :class="cellClasses">
    {{ value > 0 ? value : ""}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['value'],
  computed: {
    cellClasses() {
      return {
        "cell": true,
        "empty": this.value === 0,
        "stone": this.value < 0,
        "number": this.value > 0,
        "value2": this.value === 2,
        "value4": this.value === 4,
        "value8": this.value === 8,
        "value16": this.value === 16,
        "value32": this.value === 32,
        "value64": this.value === 64,
        "value128": this.value === 128,
        "value256": this.value === 256,
        "value512": this.value === 512,
        "value1024": this.value === 1024,
        "value2048": this.value === 2048,
      }
    }
  }
})
</script>

<style>
.cell {
  margin: 2px;
  width: 60px;
  height: 60px;
  line-height: 60px;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  border-radius: 10%;
  color: #766;
  background-color: #dcb;
  user-select: none;
  cursor: default;
}

.empty {
  background-color: #dcb;
}

.stone {
  background: url('/stone.png');
  background-size: 200%;
  background-position: center;
}

.value2 {
  background-color: #eee;
}

.value4 {
  background-color: #eec;
}

.value8 {
  color: #ffe;
  background-color: #fb8;
}

.value16 {
  color: #ffe;
  background-color: #f96;
}

.value32 {
  color: #ffe;
  background-color: #f75;
}

.value64 {
  color: #ffe;
  background-color: #f53;
}

.value128 {
  color: #ffe;
  background-color: #ec7;
}

.value256 {
  color: #ffe;
  background-color: #ec6;
}

.value512 {
  color: #ffe;
  background-color: #ec5;
}

.value1024 {
  color: #fff;
  background-color: #ec3;
  font-size: 1.5em;
}

.value2048 {
  color: #fff;
  background-color: #ec2;
  font-size: 1.5em;
}

</style>
