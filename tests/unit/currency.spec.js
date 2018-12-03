import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';
import Currency from '@/components/currency.vue';
import errorMsg from '@/components/errorMsg.vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import ApiSettings from '@/settings/api.js';

describe('Currency', () => {
  it('shows currencies', () => {
    const localVue = createLocalVue()
    localVue.use(VueAxios, axios)

    const msg = 'Error message!!'
    const wrapper = mount(Currency, {
      localVue,
      propsData: {
        success: false,
        msg: msg
      },
      sync: false
    })
    expect(wrapper.find('font').text()).to.equal('Error message!!')
    // expect(msg).to.equal('Error message!!')
  })
})
