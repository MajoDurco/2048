<template>
  <div class="board">
    <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
      <Cell v-for="(column, columnIndex) in row" :key="columnIndex" :value="column"/>
    </div>
    <div v-if="status !== 'ACTIVE'" class="overlay">
      <span v-if="status === 'LOSS'">You lost ;(</span>
      <span v-if="status === 'WIN'">You won!</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['board', 'status']
})
</script>

<style>
.board {
  user-select: none;
  cursor: default;
  position: relative;
  background: #766;
  border-radius: 5px;
  padding: 2.5px
}
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  opacity: 85%;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: grey;
  color: rgb(32, 32, 32);
  font-size: 1.8em;
}
.row {
  display: flex;
  flex-direction: row;
}
.cell {
  margin: 5px;
  background: grey;
  width: 60px;
  height: 60px;

  display: inline-block;
  font-size: 3em;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  border-radius: 7px;
  font-family: "Clear Sans";
  color: #766;
  background-color: #dcb;
}
</style>
