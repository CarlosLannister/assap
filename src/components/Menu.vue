<template lang="pug">
b-tabs(expanded)
  b-tab-item(label="Alerts") werewrewr
  b-tab-item(label="Identification") erwewr
</template>

<script>
export default {
  name: 'Menu',
  data(){
    return {

    }
  },
  mounted(){
  },
  methods:{
    alerts() {
      console.log('alerts')
    },
    identification() {
      console.log('identification')
    }

  }
}
</script>

<style lang="sass">

</style>
