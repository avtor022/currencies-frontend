<template>
  <div>
    <h3> Коррекция курса валют </h3>
    <div>
      <form class='currency_forcing' @submit.prevent='addCurrencyForcingData'>
        <table id='currency_input_table'>
          <tr>
            <td><label> Выберите валюту </label></td>
            <td>
              <input type='radio' id='dollar' value='dollar' v-model='currencyType'>
              <label for='dollar'> $ </label>
              </br>
              <input type='radio' id='euro' value='euro' v-model='currencyType'>
              <label for='euro'> € </label>
            </td>
          </tr>
          <tr>
            <td><label> Введите значение курса выбранной валюты к рублю </label></td>
            <td><input class='number-input' type='number' step='0.01' placeholder='Введите значение' v-model='currencyValue' id='currencyValue'></td>
          </tr>
          <tr>
            <td><label> Введите дату действия курса </label></td>
            <td><input class='date-input' id='dateInput' type='date' v-model='forcingDate'></td>
          </tr>
          <tr>
            <td></td>
            <td><button class='btn btn-light enter' type='submit' > Применить </button></td>
          </tr>
        </table>
      </form>
      <errorMsg v-if="success == false" v-bind:message='msg' data-test="error"></errorMsg>
      <table id='currency_forcing_table' v-if='currencyForcingDataList.length != 0' data-test='forcingTable'>
        <tr>
          <th>Валюта</th>
          <th>Курс к рублю</th>
          <th>Дата действия курса</th>
          <th></th>
        </tr>
        <tr v-for='(currencyForcingData, n) in currencyForcingDataList'>
          <td v-if="currencyForcingData.currency_type==='dollar'"> $ </td>
          <td v-else> € </td>
          <td> {{ currencyForcingData.currency_value }} </td>
          <td> {{ currencyForcingData.forcing_date }} </td>
          <td> <button @click='removeCurrencyForcingData(n)' data-test='removeForcingBtn'>Удалить</button></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import errorMsg from '@/components/errorMsg'

  export default {
    data () {
      return {
        currencyType: '',
        currencyValue: '',
        forcingDate: null,
        currencyForcingData: null,
        currencyForcingDataList: [],
        success: null,
        msg: 'There are no data!'
      }
    },
    components: {
      errorMsg: errorMsg
    },
    mounted () {
      this.apiRequest('get', this.$root.$options.settings.api.currencyForcing())
    },
    methods: {
      addCurrencyForcingData () {
        this.currencyForcingData = { currency_type: this.currencyType, currency_value: this.currencyValue, forcing_date: this.forcingDate };
        if (!this.currencyForcingData) {
          return
        };
        this.apiRequest('post', this.$root.$options.settings.api.currencyForcing(), {currency_forcing_data: this.currencyForcingData})
        this.currencyForcingData = '';
        this.currencyType = '';
        this.currencyValue = '';
        this.forcingDate = null;
      },
      removeCurrencyForcingData (x) {
        let id = this.currencyForcingDataList[x].id;
        this.apiRequest('delete', `${this.$root.$options.settings.api.currencyForcing()}/${id}`)
      },
      apiRequest (httpMethod, url, data = '') {
        this.$http[httpMethod](url, data)
        .then(response => {
          this.success = response.data.success;
          if (this.success) {
            this.currencyForcingDataList = response.data.currencies;
          }
          else {
            this.msg = response.data.msg;
          }
        })
        .catch(() => {
          this.currencyForcingData = null;
          this.success = false
        })
      }
    }
  }

</script>

<style>
  #currency_input_table td button{
    margin-top: 20px;
    height: 30px;
    width: 100%;
  }
</style>
