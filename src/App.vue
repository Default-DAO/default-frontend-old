<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Web3Manager />
  </div>
</template>

<script>
import { Header, Web3Manager } from '@/components';

export default {
  name: 'App',
  components: {
    Header,
    Web3Manager
  },
}
</script>

<style>

/* Fonts */
@font-face {
  font-family: "CircularXX TT";
  src: url("~@/assets/fonts/CircularXXTT-Regular.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "CircularXX TT";
  src: url("~@/assets/fonts/CircularXXTT-Book.ttf") format("truetype");
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: "CircularXX TT";
  src: url("~@/assets/fonts/CircularXXTT-Medium.ttf") format("truetype");
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: "CircularXX TT";
  src: url("~@/assets/fonts/CircularXXTT-Bold.ttf") format("truetype");
  font-weight: 800;
  font-style: normal;
}

@font-face {
  font-family: "CircularXX TT";
  src: url("~@/assets/fonts/CircularXXTT-Black.ttf") format("truetype");
  font-weight: 900;
  font-style: normal;
}


/* Headings */
h1 {
  font-size: 32px;
  font-weight: 800;
}

h2 {
  font-size: 24px;
  font-weight: 800;
}

h3 {
  font-size: 18px;
  font-weight: 800;
}

h4 {
  font-size: 18px;
  font-weight: 700;
}

h5 {
  font-size: 15px;
  font-weight: 700;
}

h1, h2, h3, h4, h5 {
  color: #ffffff;
  margin: 0;
}

/* Buttons */
.button-p {
  border-radius: 8px;
  background-color: var(--p1);
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
}

/* Colors */
:root {
  /* Primary colors */
  --p1: #4F44CE;

  /* Secondary colors */
  --s1: #000000;
  --s2: #111111;
  --s3: #222222;
  --s4: #505050;
  --s5: #505050;
  --s6: #505050;
}

/* App */
#app, body {
  margin: 0;
  height: 100vh;
  background-color: var(--s2);

  box-sizing: border-box;
  overflow-x: hidden;

  text-align: center;
  font-family: "CircularXX TT";

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
