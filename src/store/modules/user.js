import { USER_STATE, ERROR_CODES } from '@/constants';

export default {
  state: () => ({
		profile: null,
    userState: USER_STATE.ghost,

    ready: false,
  }),

	getters: {
    profile (state) {
      return state.profile;
    },
    userState (state) {
      return state.userState;
    },
    ready (state) {
      return state.ready;
    },
	},

	actions: {
    async isMember ({ getters, commit }) {
      try {
        if (getters.account == null) { return; }

        const ethAddress = this.$ethers.utils.getAddress(getters.account);
        const urlParams = new URLSearchParams({ ethAddress });

        const { data: { result } } = await this.$http.get('/profile?' + urlParams);
        if (result.error) { throw result.errorCode; }

        const profile = result.apiMember;
        commit('updateProfile', profile);

        if (!profile.claimed) {
          console.log('unclaimed!')
          commit('updateUserState', USER_STATE.pending);
        } else {
          console.log('claimed!')
          commit('updateUserState', USER_STATE.claimed);
        }
      } catch (error) {
        if (error === ERROR_CODES.not_whitelisted) {
          console.log('not whitelisted!')
          commit('updateUserState', USER_STATE.not_whitelisted);
        } else {
          console.error(error);
        }
      } finally {
        commit('updateReady', true);
      }
    },
    async claimMembership ({ dispatch, commit }, alias) {
      try {
        const { signature, ethAddress, chainId } = await dispatch('generateSignedMessage');

        const { data: { result } } = await this.$http.post('/profile/claim', { ethAddress, signature, chainId, alias });
        if (result.error) { throw result.errorCode; }

        console.log(result)
        console.log('claimed!')

        const profile = result.apiMember;
        commit('updateProfile', profile);
        commit('updateUserState', USER_STATE.claimed);
      } catch (error) {
        if (error === ERROR_CODES.already_claimed) {
          console.log('already claimed!');
        } else {
          console.error(error);
        }
      }
    },
	},

  mutations: {
    updateProfile (state, profile) {
      state.profile = profile;
    },
    updateUserState (state, userState) {
      state.userState = userState;
    },
    updateReady (state, ready) {
      state.ready = ready;
    },
  },
}
