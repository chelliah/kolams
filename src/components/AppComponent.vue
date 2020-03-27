
<template>
   <kolam id="kolam-1" :size="Number(7)" inputVal="000000000"/>
</template>
<script>
  import Kolam from './Kolam/Kolam.vue'
   export default {
     components: {
       Kolam
     }
   }
</script>
<style lang="css">
body, html {
  margin: 0;
  padding: 0;
}
</style>