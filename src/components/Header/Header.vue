<template>
  <div class="header-wrapper" v-show="currentPage != ''">
    <div class="separator" />

    <h2>Ðefault.</h2>

    <div class="nav-wrapper">
      <div class="nav-element"
           v-for="page in pages"
           :key="page.id"
           @click="$router.push(page.id)">

        <h3 :class="{'nav-title-disabled': page.id != currentPage}">{{ page.title }}</h3>
        <div class="nav-highlight" :class="{'nav-highlight-disabled': page.id != currentPage}" />

      </div>
    </div>

    <div class="button-p" v-if="userState == USER_STATE.ghost"> <h5>Connect Wallet</h5> </div>
  </div>
</template>

<script>
import { USER_STATE } from '@/constants';

export default {
  name: 'Header',
  data() {
    return {
      pages: [
        { id: '/stake', title: 'Stake' },
        { id: '/value', title: 'Value' },
        { id: '/pool', title: 'Pool' },
      ],
    }
  },
  computed: {
    userState() { return this.$store.getters.userState; },
    USER_STATE() { return USER_STATE },

    currentPage() { return this.$route.matched[0].path; },
  },
}
</script>

<style scoped>

.header-wrapper {
  width: 100%;
  height: 72px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 16px;
  box-sizing: border-box;

  background-color: var(--s2);

  z-index: 100;
  position: fixed;
}

/* Nav Bar */
.nav-wrapper {
  height: 100%;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;

  position: absolute;
}

.nav-element {
  width: 144px;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  position: relative;
}

.nav-title-disabled {
  opacity: 0.5;
  font-weight: 700;

  transition: opacity 0.1s ease-in-out;
}
.nav-element:hover .nav-title-disabled {
  opacity: 1;
}

.nav-highlight {
  width: 100%;
  height: 2px;
  bottom: 0;

  background-color: var(--p1);

  position: absolute;
}
.nav-highlight-disabled {
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
}
.nav-element:hover .nav-highlight-disabled {
  opacity: 1;
}


/* Wallet */
.button-p {
  width: 186px;
  height: 40px;

  z-index: 1;
}


/* Misc */
.separator {
  height: 1px;
  left: 0;
  right: 0;
  bottom: 0px;

  background-color: var(--s1);

  position: absolute;
}

</style>
