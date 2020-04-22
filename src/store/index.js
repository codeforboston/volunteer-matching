import Vue from 'vue';
import Vuex from 'vuex';
import configuration from './configuration';

Vue.use(Vuex);

export default new Vuex.Store(configuration());
