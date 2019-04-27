<template>
  <div id="app">
    <a-button>按钮</a-button>
    <div id="nav">
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/form">Form</router-link>
    </div>
    <router-view />
  </div>
</template>
