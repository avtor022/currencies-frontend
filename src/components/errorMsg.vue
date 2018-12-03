<template>
  <div id='message'>
    <font size=4> {{ message }} </font>
  </div>
</template>

<script>
  export default {
    props: {
      message: String
    }
  }
</script>

<style>
  font {
    color: red;
  }
</style>
