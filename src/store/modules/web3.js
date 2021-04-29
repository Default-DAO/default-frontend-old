export default {
  state: () => ({
    account: null,
    chainId: null,
    provider: null,
  }),

  getters: {
    account (state) {
      return state.account;
    },
    chainId (state) {
      return state.chainId;
    },
    provider (state) {
      return state.provider;
    },
  },

	actions: {
		async generateSignedMessage ({ getters, commit }) {
      // Get ethAddress, provider, and chainId
      const ethAddress = this.$ethers.utils.getAddress(getters.account);
      const provider = getters.provider;

      const chainId = getters.chainId || (await provider.getNetwork()).chainId;
      commit('updateChainId', chainId);

			// Retrieve nonce from backend
      let authMsg;
      const urlParams = new URLSearchParams({ ethAddress });
      const { data: { result } } = await this.$http.get('/auth?' + urlParams);
      if (result.error) { throw result.errorCode; }

      authMsg = result.authMsg;
      authMsg.domain.chainId = chainId;

      const signature = await window.ethereum.request({
        method: 'eth_signTypedData_v4',
        params: [ethAddress, JSON.stringify(authMsg)],
      });

      return { signature, ethAddress, chainId };
    }
	},

  mutations: {
    updateAccount (state, account) {
      state.account = account;
    },
    updateChainId (state, chainId) {
      state.chainId = chainId;
    },
    updateProvider (state, provider) {
      state.provider = provider;
    }
  },
}
