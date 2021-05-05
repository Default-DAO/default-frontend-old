<template>
  <div class="stake-wrapper">
    <div class="column">
      <h2>Give</h2>
      <input class="search-input"
             type="text"
             placeholder="Search alias"
             v-model="searchInput" />
      <div class="members">
        <div class="members-delegations">
          <h3 class="member-search-heading"
              v-if="searchInput.length > 0">
              My Network
          </h3>
          <div class="member"
               v-for="member in newDelegations"

               :key="member.ethAddress">
            <div class="member-pic" />
            <div class="member-info">
              <h4>{{ member.alias }}</h4>
            </div>
            <input class="member-weight"
                   type="text"
                   onClick="this.select();"
                   v-model="member.weight"
                   v-if="userState == USER_STATE.claimed" />
          </div>
        </div>

        <div class="members-search">
          <h3 class="member-search-heading"
              v-if="searchInput.length > 0">
              Members
          </h3>
          <div class="member"
               v-for="member in searchedMembers"
               :key="member.ethAddress">
            <div class="member-pic" />
            <div class="member-info">
              <h4>{{ member.alias }}</h4>
            </div>
            <div class="member-add button-p"
                 @click="addMember(member)">
              <h5>Add</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="save-changes-wrapper" v-if="changesMade">
        <div class="save-changes-button button-s"
             @click="discardChanges">
          <h5 style="color: var(--s6)">Discard</h5>
        </div>
        <div class="save-changes-button button-p"
             @click="saveChanges">
          <h5>Save</h5>
        </div>
      </div>
    </div>
    <div class="column">
      <h2>Get</h2>
    </div>
  </div>
</template>

<script>
import { USER_STATE } from '@/constants';

export default {
  name: 'Stake',
  data() {
    return {
      members: [],
      initialDelegations: [],
      newDelegations: [],

      searchInput: '',
    }
  },
  computed: {
    ready() { return this.$store.getters.ready; },

    userState() { return this.$store.getters.userState; },
    USER_STATE() { return USER_STATE },

    /* Delegations */
    searchedMembers() {
      if (this.searchInput.length == 0) { return []; }

      let searchedMembers = this.members.filter(member => member.alias.toLowerCase().startsWith(this.searchInput.toLowerCase()));
      // searchedMembers = searchedMembers.filter(member => this.newDelegations.find(delegation => delegation.alias != member.alias))
      return searchedMembers;
    },

    changesMade() {
      return !(this.initialDelegations.length === this.newDelegations.length &&
              this.initialDelegations.every((value, index) => value === this.newDelegations[index]))
    }
  },
  watch: {
    ready() { this.init(); },
  },
  methods: {
    init() {
      this.getMembers();
      this.getStakeDelegations();
    },
    async getMembers() {
      try {
        const urlParams = new URLSearchParams({ page: 0 });

        const { data: { result } } = await this.$http.get('/ctMember/getMembers?' + urlParams);
        if (result.error) { throw result.errorCode; }

        this.members = result.members;
        console.log(this.members);
      } catch (err) {
        console.error(err)
      }
    },
    async getStakeDelegations() {
      try {
        const fromEthAddress = this.$ethers.utils.getAddress(this.$store.getters.account);
        const urlParams = new URLSearchParams({ fromEthAddress, page: 0 });

        const { data: { result } } = await this.$http.get('/txStakeDelegation?' + urlParams);
        if (result.error) { throw result.errorCode; }

        this.initialDelegations = this.copy(result.stakeDelegations);
        this.newDelegations = this.copy(result.stakeDelegations);
        console.log(this.initialDelegations, this.newDelegations)
      } catch (err) {
        console.error(err)
      }
    },
    addMember(member) {
      console.log(member);
      this.searchInput = '';
      this.newDelegations.unshift(member);
    },
    saveChanges() {
      console.log('save!')
    },
    discardChanges() {
      console.log('discard!')
    },
  },
}
</script>

<style scoped>

.stake-wrapper {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
}

.column {
  width: 360px;
  margin: 32px 96px 0px 96px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
}

.search-input {
  width: 100%;
  height: 56px;
  margin-top: 24px;
  padding: 16px;

  color: white;
  background: var(--s1);

  box-sizing: border-box;
  border-radius: 8px;
  border: 2px solid var(--s3);
}

.members {
  width: 100%;
  margin-top: 32px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.members-delegations {
  width: 100%;
}

.members-search {
  width: 100%;
}

.member-search-heading {
  margin-bottom: 24px;
  text-align: left;
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
  min-width: 48px;
  width: 48px;
  height: 48px;

  border-radius: 48px;

  background-color: var(--s5);
}

.member-info {
  min-width: 0px;
  height: 100%;
  margin: 0px 16px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;

  flex-grow: 1;
}

.member-info > h4 {
  width: 100%;
  text-align: left;
}

.member-weight {
  width: 56px;
  height: 100%;

  background-color: var(--s1);

  border-radius: 8px;
  box-sizing: border-box;

  font-size: 18px;
  text-align: center;
  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;
}

.member-add {
  width: 112px;
  height: 100%;
}

.save-changes-wrapper {
  width: calc(100% + 32px);
  height: 160px;
  bottom: 0;
  left: -16px;

  background-image: linear-gradient(rgba(17,17,17,0), rgba(17,17,17,1));

  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  position: absolute;
}

.save-changes-button {
  width: 50%;
  height: 56px;
  margin: 32px 8px;
}

</style>
