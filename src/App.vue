<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/womens-clothing" class="nav-link">Women's Clothing</router-link>
      <router-link to="/mens-clothing" class="nav-link">Men's Clothing</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

#app {
  min-height: 100vh;
}

.navbar {
  background: #1E1E1E;
  padding: 15px 30px;
  display: flex;
  gap: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.nav-link {
  color: #DCDCDC;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: #3F3F3F;
  color: #FFFFFF;
}

.nav-link.router-link-active {
  background: #FFFFFF;
  color: #1E1E1E;
}
</style>
