<template>
  <div class="clout-wrapper">
    <div class="column">
      <h2>Give</h2>
      <div class="members">
        <div class="member"
             v-for="member in members"
             :key="member.eth_address">
          <div class="member-pic" />
          <div class="member-info">
            <h4>{{ member.alias }}</h4>
            <h5 style="color: var(--s4)">{{ member.eth_address }}</h5>
          </div>
          <div class="member-weight">
            <h4 style="opacity: 0.75">{{ member.weight }}</h4>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <h2>Get</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Clout',
  data() {
    return {
      members: [
        { eth_address: '0xeADf09...57b2', alias: 'Soma', weight: 5 },
        { eth_address: '0xeADf09...57b3', alias: 'fullyAllocated', weight: 5 },
        { eth_address: '0xeADf09...57b4', alias: 'Zaz', weight: 4 },
        { eth_address: '0xeADf09...57b5', alias: 'Scott', weight: 4 },
      ],
    }
  },
}
</script>

<style scoped>

.clout-wrapper {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
}

.column {
  width: 360px;
  margin: 32px 96px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.members {
  width: 100%;
  margin-top: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.member {
  width: 100%;
  height: 80px;
  margin-bottom: 24px;

  background-color: var(--s3);
  box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);

  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.member-pic {
  width: 48px;
  height: 48px;

  border-radius: 48px;

  background-color: var(--s5);
}

.member-info {
  height: 100%;

  margin: 0px 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;

  flex-grow: 1;
}

.member-weight {
  width: 56px;
  height: 100%;

  background-color: var(--s1);

  border-radius: 8px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
