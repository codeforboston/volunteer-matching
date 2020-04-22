<template>
  <div class="donation-list">
    <ul>
      <li v-for="donation in donations" :key="donation.id" @click="focusOnDonation(donation)">
        <div>{{donation.category}}</div>
        <div>{{donation.subCategory}}</div>
        <div>{{donation.donorName}}</div>
      </li>
    </ul>
    <div class="donation-details" v-if="focusedDonation">
      {{focusedDonation.details}}
    </div>
    <div></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'donation-list',
  data() {
    return {
      focusedDonation: undefined,
    };
  },
  computed: mapState(['donations']),
  methods: {
    focusOnDonation(donation) {
      this.focusedDonation = donation;
    },
  },
};
</script>

<style lang="scss" scoped>
.donation-list {
  display: grid;
  grid-template-columns: 2fr 5fr 5fr;
}
</style>
