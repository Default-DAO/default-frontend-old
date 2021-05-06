<script>
export default {
  name: 'Web3Manager',
	render: () => null,
  computed: {
    account() { return this.$store.getters.account; },
  },
	created() {
		this.$bus.$on('connectWallet', this.connectWallet);
	},
	beforeDestroy() {
		this.$bus.$off('connectWallet', this.connectWallet);
	},
	mounted() {
		this.initWeb3();
	},
  methods: {
		async initWeb3() {
			const ethereum = window.ethereum;
			const provider = new this.$ethers.providers.Web3Provider(ethereum);
			this.$store.commit('updateProvider', provider);

			if (provider) {
				// Get MetaMask account if connected
				ethereum.request({ method: 'eth_accounts' }).then(this.accountsChanged);

				// Detect account changes
				ethereum.on('accountsChanged', this.accountsChanged);

				// Detect chain changes
				ethereum.on('chainChanged', this.chainChanged);
			} else {
				console.error('No web3 provider.');
			}
		},
    async accountsChanged(accounts) {
      // Store eth address
			const account = accounts[0];
			this.$store.commit('updateAccount', account);

      // Check for membership
      this.$store.dispatch('isMember');
    },
		chainChanged(chainId) {
			chainId = parseInt(chainId, 16); // hex to int
			this.$store.commit('updateChainId', chainId);
		},
		connectWallet() {
			window.ethereum.request({ method: 'eth_requestAccounts' });
		},
  },
}
</script>
