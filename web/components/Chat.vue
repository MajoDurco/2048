<template>
  <div class="chat-box">
    <div class="messages">
      <div v-for="(message, messageIndex) in messages" :key="messageIndex" class="message">
        {{ message }}
      </div>
    </div>
    <div class="form-container">
      <form @submit.prevent="send">
        <div class="form-container">
          <input v-model="message" class="input" placeholder="Send a messsage" />
        </div>
        <div class="send-button">
          <Button @click="send" type="submit">Send</Button>
        </div>
      </form>
      <div class="game-modes">
        <input
          id='ANARCHY'
          type="radio"
          value="ANARCHY"
          :checked="gameMode === 'ANARCHY'"
          @change="$emit('changeGameMode', $event.target.value)"
          class="game-mode-radio"
        >
        <label class="anarchy game-mode-label" for="ANARCHY">Anarchy</label>
        <input
          id="DEMOCRACY"
          type="radio"
          value="DEMOCRACY"
          :checked="gameMode === 'DEMOCRACY'"
          @change="$emit('changeGameMode', $event.target.value)"
          class="game-mode-radio"
        >
        <label class="democracy game-mode-label" for="DEMOCRACY">Democracy</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      message: "",
    }
  },
  props: ["sendMessage", "messages", "gameMode"],
  methods: {
    send() {
      if (this.message.trim() !== "") {
        this.$emit('send', this.message)
        this.message = ""
      }
    }
  }
})

</script>

<style>
.chat-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  border-left: 1px solid #766;
  padding: 10px;
  max-width: 400px;
}
.messages {
  flex: 1;
  font-size: 1.1em;
  max-height: 90vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
.message {
  word-wrap: break-word;
  padding: 5px 0px 5px 0px;
}
.message:nth-child(even) {
  background: #eee;
}
.form-container {
  display: flex;
  flex-direction: column;
}
.input {
  border-style: none;
  border: 1px solid #766;
  border-radius: 5px;
  height: 30px;
  font-size: 1em;
}
.game-modes {
  display: flex;
}
.game-mode-radio {
  display: none;
}
.game-mode-label {
  padding: 10px;
  height: 100%;
  width: 100%;
  text-align: center;
  border-radius: 5px;
}
.anarchy {
  color: rgb(179, 2, 2)
}
.democracy {
  color: rgb(42, 42, 255);
}
.game-mode-radio:checked + label {
  background: #eee;
  font-weight: bold;
}
</style>
