
import { createLocalVue, mount } from '@vue/test-utils';
import Currency from '@/components/currency.vue';

import mockAxios from 'axios';
import VueAxios from 'vue-axios';
import ApiSettings from '@/settings/api.js';

const config = new ApiSettings();

describe('Currency valid data', () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        success: true,
        currencies: {
          dollar: 1.2,
          euro: 2.3
        }
      }
    })
  )
  const localVue = createLocalVue();
  localVue.use(VueAxios, mockAxios);
  localVue.options.settings = { api: config };
  const wrapper = mount(Currency, {
          localVue
        });
  it('requests data', (done) => {
    wrapper.vm.$nextTick(() => {
      expect(mockAxios.get).toBeCalledWith(config.getCurrencies());
      done()
    })
  })
  it('shows right data', (done) => {
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.success).toEqual(true);
      expect(wrapper.vm.dollar).toEqual(1.2);
      expect(wrapper.vm.euro).toEqual(2.3);
      done()
    })
  })
})

describe('Currency error', () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        success: false,
        msg: 'Error: there are no data!'
      }
    })
  )
  const localVue = createLocalVue();
  localVue.use(VueAxios, mockAxios);
  localVue.options.settings = { api: new ApiSettings() };
  const wrapper = mount(Currency, {
          localVue
        });
  it('shows error: no data', (done) => {
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.success).toEqual(false);
      expect(wrapper.vm.msg).toEqual('Error: there are no data!');
      done()
    })
  })
})


