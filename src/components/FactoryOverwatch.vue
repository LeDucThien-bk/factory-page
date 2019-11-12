<template>
  <v-container>
    <iframe id="screen" src="https://192.168.11.182/" importance="high"></iframe>
  </v-container>
</template>

<script>
export default {
  name: 'FactoryOverwatch',

  data: () => ({
    
  }),
};
</script>
<style scoped>
#screen {
  height: calc(100vh - 60px);
  width: 100%;
  z-index: 2;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
