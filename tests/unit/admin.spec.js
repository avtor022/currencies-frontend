import { createLocalVue, mount } from '@vue/test-utils';
import Admin from '@/components/admin.vue';

import mockAxios from 'axios';
import VueAxios from 'vue-axios';
import ApiSettings from '@/settings/api.js';

const config = new ApiSettings();

describe('Admin valid data', () => {
  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: {
        success: true,
        currencies: [
          {
            currency_type: 'dollar',
            currency_value: 1.2,
            forcing_date: new Date()
          },
          {
            currency_type: 'euro',
            currency_value: 2.3,
            forcing_date: new Date()
          }
        ]
      }
    })
  )
  const localVue = createLocalVue();
  localVue.use(VueAxios, mockAxios);
  localVue.options.settings = { api: config };
  const wrapper = mount(Admin, {
          localVue
        });
  it('requests data', (done) => {
    wrapper.vm.$nextTick(() => {
      expect(mockAxios.get).toBeCalledWith(config.currencyForcing(), '');
      done()
    })
  });
  it('shows right data', (done) => {
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.success).toEqual(true);
      expect(wrapper.vm.currencyForcingDataList[0].currency_value).toEqual(1.2);
      expect(wrapper.vm.currencyForcingDataList[1].currency_value).toEqual(2.3);
      done()
    })
  })
})

describe('Admin error', () => {
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
  localVue.options.settings = { api: config };
  const wrapper = mount(Admin, {
          localVue
        });
  it('shows error', (done) => {
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.success).toEqual(false);
      expect(wrapper.vm.msg).toEqual('Error: there are no data!');
      done()
    })
  })
})

describe('create currency forcing', () => {
  const timeNow = new Date(),
    localVue = createLocalVue();
  mockAxios.post.mockImplementationOnce(() =>
    Promise.resolve({
      data: {}
    })
  )
  localVue.use(VueAxios, mockAxios);
  localVue.options.settings = { api: config };
  const wrapper = mount(Admin, {
          localVue,
          data () {
            return {
              currencyType: 'dollar',
              currencyValue: 1.2,
              forcingDate: timeNow
            }
          }
        });
  it('sends a post request', (done) => {
    wrapper.vm.addCurrencyForcingData()
    wrapper.vm.$nextTick(() => {
      expect(mockAxios.post).toBeCalledWith(config.currencyForcing(), {
        currency_forcing_data: {
          currency_type: 'dollar',
          currency_value: 1.2,
          forcing_date: timeNow
        }
      });
      done()
    })
  })
})

describe('delete currency forcing', () => {
  const timeNow = new Date(),
    localVue = createLocalVue();
  mockAxios.delete.mockImplementationOnce(() =>
    Promise.resolve({
      data: {}
    })
  )
  localVue.use(VueAxios, mockAxios);
  localVue.options.settings = { api: config };
  const wrapper = mount(Admin, {
          localVue,
          data () {
            return {
              currencyForcingDataList: [{
                id: 1,
                currency_type: 'dollar',
                currency_value: 1.2,
                forcing_date: timeNow
              }]
            }
          }
        });
  it('sends a delete request', (done) => {
    wrapper.vm.removeCurrencyForcingData(0)
    wrapper.vm.$nextTick(() => {
      expect(mockAxios.delete).toBeCalledWith(config.currencyForcing() + '/' + wrapper.vm.currencyForcingDataList[0].id, '');
      done()
    })
  })
})
