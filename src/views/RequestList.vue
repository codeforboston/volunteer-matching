<template>
  <div>
    <ul>
      <li v-for="request in requests" :key="request.id">
        {{request.requesterName}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'request-list',
  mounted() {
    this.fetchRequests();
  },
  computed: mapState(['requests']),
  methods: {
    ...mapActions(['fetchRequests']),
  },
};
</script>
