
import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';
import Currency from '@/components/currency.vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import ApiSettings from '@/settings/api.js';

describe('Currency', () => {
  it('shows currencies', (done) => {
    const localVue = createLocalVue();
    localVue.use(VueAxios, axios);
    localVue.options.settings = { api: new ApiSettings() };

    const wrapper = mount(Currency, {
            localVue
          });
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.success).to.be.true
      done()
    })
  })
})
