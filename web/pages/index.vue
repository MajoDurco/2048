<template>
  <div class="page">
    <div class="game-chat-container">
      <div 
        class="game flex-center flex-row"
        tabindex="-1"
        @keyup.up="move('up')"
        @keyup.down="move('down')"
        @keyup.left="move('left')"
        @keyup.right="move('right')"
      >
        <div>
          <div class="game-name">2048</div>
          <GameStats :score="score" />
          <div class="flex-reverse-row game-controllers">
            <Button @click="newGame">New Game</Button>
          </div>
          <Stones :stones.sync="stones" />
          <Board :board="board" :status="status" />
        </div>
      </div>
      <div class="chat">
        <Chat
          @send="sendMessage"
          :messages="messages"
          :gameMode="gameMode"
          @changeGameMode="changeGameMode"
        />
      </div>
    </div>
    <ServerStatus :serverStatus="serverStatus" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { NuxtSocket } from 'nuxt-socket-io'
import { Game, GameMode } from '../types'

export default Vue.extend({
  data() {
    return {
      socket: null as NuxtSocket | null,
      stones: '0',
    }
  },
  computed: {
    board() {
      return this.$store.state.board
    },
    status() {
      return this.$store.state.status
    },
    score() {
      return this.$store.state.score
    },
    serverStatus() {
      return this.$store.state.serverStatus
    },
    messages() {
      return this.$store.state.messages
    },
    gameMode() {
      return this.$store.state.gameMode
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      name: 'server',
      reconnection: true,
      teardown: false,
    })
    this.socket.emit('get game', (game: Game) => {
      this.$store.commit('updateGame', game)
    })
    this.socket.emit('get game mode', (gameMode: GameMode) => {
      this.$store.commit('gameModeChange', gameMode)
    })
  },
  methods: {
    move(direction: string) {
      if (this.socket && this.status === 'ACTIVE') {
        this.socket.emit('move', direction)
      }
    },
    newGame() {
      if (this.socket) {
        this.socket.emit('new game', this.stones)
      }
    },
    sendMessage(message: string) {
      if (this.socket) {
        this.socket.emit('new message', message)
      }
    },
    changeGameMode(mode: GameMode) {
      if (this.socket) {
        this.socket.emit('game mode change', mode)
      }
    }
  }
})

</script>

<style>
.page {
  height: 100vh;
  width: 100vw;
}
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
.flex-reverse-row {
  display: flex;
  flex-direction: row-reverse;
}
.game-name {
  color: #766;
  font-weight: bold;
  font-size: 4em;
}
.game-controllers {
  margin: 20px 0px;
}
.game-chat-container {
  height: 100%;
  display: flex;
}
.game {
  flex: 4;
}
.game:focus {
  outline: none;
}
.chat {
  flex: 1;
}
</style>
