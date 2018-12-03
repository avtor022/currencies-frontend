<template>
  <div id="app">
    <div id="nav">
      <table id='links'>
        <tr>
          <td>
            <router-link to='/'> Главная </router-link>
          </td>
          <td>
           <router-link to='/admin'> Админка </router-link>
          </td>
        </tr>
      </table>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
table {
  margin-left:auto;
  margin-right:auto;
  border-collapse: separate;
  border-spacing: 20px;
}
</style>
