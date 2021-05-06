<template>
  <div class="login-wrapper">
    <h1>Ðefault.</h1>

    <div class="button-p"
         @click="$bus.$emit('connectWallet')"
         v-if="userState == USER_STATE.ghost">
      <h4>Connect Wallet</h4>
    </div>

    <h4 v-if="userState == USER_STATE.not_whitelisted"><br>
      Sorry, you're not whitelisted.
    </h4>


    <input class="alias-input"
           type="text"
           placeholder="Enter alias"
           v-model="aliasInput"
           v-if="userState == USER_STATE.pending"
           v-on:keyup.enter="$store.dispatch('claimMembership', aliasInput)" />
    <div class="button-p"
         :class="{ 'button-disabled': aliasInput == '' }"
         @click="$store.dispatch('claimMembership', aliasInput)"
         v-if="userState == USER_STATE.pending">
      <h4>Claim</h4>
    </div>

    <div class="button-p"
         @click="$router.push('stake')"
         v-if="userState == USER_STATE.claimed">
      <h4>Enter App</h4>
    </div>
  </div>
</template>

<script>
import { USER_STATE } from '@/constants';

export default {
  name: 'Register',
  data() {
    return {
      aliasInput: '',
    }
  },
  computed: {
    userState() { return this.$store.getters.userState; },
    USER_STATE() { return USER_STATE },
  },
}
</script>

<style scoped>

.login-wrapper {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.button-p {
  width: 360px;
  height: 64px;

  margin: 24px 0px 192px 0px;
}

.button-disabled {
  opacity: 50%;
  pointer-events: none;
}

.alias-input {
  width: 360px;
  height: 56px;
  margin-top: 32px;
  padding: 16px;

  color: white;
  background: var(--s1);

  box-sizing: border-box;
  border-radius: 8px;
  border: 2px solid var(--s3);
}

</style>
