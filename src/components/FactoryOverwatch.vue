<template>
  <iframe id="screen" src="https://factory.aquasoft.vn/" importance="high"></iframe>
</template>

<script>
export default {
  name: "FactoryOverwatch",

  data: () => ({})
};
</script>
<style scoped>
#screen {
  height: calc(100vh - 60px);
  width: 100%;
  z-index: 2;
  display: block;
  margin-left: 0;
  margin-right: 0;
}
</style>
