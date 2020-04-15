<template>
  <div>
    <ul>
      <li v-for="donation in donations" :key="donation.id">
        {{donation.donorName}}
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
    ...mapActions(['fetchDonations']),
  },
};
</script>
