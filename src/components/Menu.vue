<template lang="pug">
b-tabs(expanded)
  b-tab-item(label="Alerts")
    b-tabs(expanded="expanded",size="is-small", position="is-left",vertical)
      b-tab-item(label="slack")
        section
          b-input(placeholder="Slack Url" v-model="url",size="is-small")
          b-button(size="is-small",@click="saveSlack()") Save
          b-button(size="is-small",@click="removeSlack()") Remove
          b-switch(v-model="activatedSlack",@input="changeSlackActive()") Active
      b-tab-item(label="telegram")
        section
          b-input(placeholder="Token" v-model="token",size="is-small")
          b-input(placeholder="ChatID" v-model="chatId",size="is-small")
          b-button(size="is-small",@click="saveTelegram()") Save
          b-button(size="is-small",@click="removeTelegram()") Remove
          b-switch(v-model="activatedTelegram",@input="changeTelegramActive()") Active
      b-tab-item(label="email")
  b-tab-item(label="Identification") erwewr

</template>

<script>
import {setSlackURL,getSlackURL,setSlackActive,getSlackActive,setTelegramActive,setTelegramConfig,getTelegramConfig,getTelegramActive} from "@/utils/configuration";
export default {
  name: 'Menu',
  data(){
    return {
      url : "",
      activatedSlack: false,
      activatedTelegram: false,
      chatId: "",
      token: ""
    }
  },
  mounted(){
    const initUrl = getSlackURL()
    const isActiveInit = getSlackActive()
    const isActiveTelegramInit = getTelegramActive()
    const telegramConfig = getTelegramConfig()
    if (initUrl != undefined) {
      this.url = initUrl
    }
    if (isActiveInit != undefined) {
      this.activatedSlack = isActiveInit
    }
    if (isActiveTelegramInit != undefined) {
      this.activatedTelegram = isActiveTelegramInit
    }
    if (telegramConfig != undefined) {
      this.token = telegramConfig.token
      this.chatId = telegramConfig.chatId
    }
  },
  methods:{
    changeTelegramActive() {
      setTelegramActive(this.activatedTelegram)
    },
    saveTelegram() {
      setTelegramConfig(this.token,this.chatId)
    },
    removeTelegram() {
      this.token=""
      this.chatId=""
      setTelegramConfig("","")
      this.activatedTelegram = false
      setTelegramActive(this.activatedTelegram)
    },
    changeSlackActive() {
      setSlackActive(this.activatedSlack)
    },
    saveSlack() {
      setSlackURL(this.url)
    },
    removeSlack() {
      this.url=""
      setSlackURL("")
      this.activatedSlack=false
      setSlackActive(this.activatedSlack)
    },
    identification() {
      console.log('identification')
    }

  }
}
</script>

<style lang="sass">

</style>
