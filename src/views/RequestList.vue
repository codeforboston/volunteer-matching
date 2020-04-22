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
import { mapState } from 'vuex';

export default {
  name: 'request-list',
  computed: mapState(['requests']),
};
</script>
