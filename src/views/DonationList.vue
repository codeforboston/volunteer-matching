<template>
  <div>
    <ul>
      <li v-for="donation in donations" :key="donation.id">
        {{donation.donorName}}
        <button @click="matchDonationToRequest">Match Donation to Request</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'donation-list',
  mounted() {
    this.fetchDonations();
  },
  computed: mapState(['donations']),
  methods: {
    ...mapActions(['fetchDonations', 'matchDonationToRequest']),
  },
};
</script>
