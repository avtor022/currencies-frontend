<template>
  <div>
    <h3> Коррекция курса валют </h3>
    <div>
      <form class='currency_forcing' @submit.prevent='addCurrencyForsingData'>
        <table id='currency_input_table'>
          <tr>
            <td><label> Выберите валюту </label></td>
            <td>
              <input type='radio' id='dollar' value='dollar' v-model='currency_type'>
              <label for='dollar'> $ </label>
              </br>
              <input type='radio' id='euro' value='euro' v-model='currency_type'>
              <label for='euro'> € </label>
            </td>
          </tr>
          <tr>
            <td><label> Введите значение курса выбранной валюты к рублю </label></td>
            <td><input class='number-input' type='number' step='0.01' placeholder='Введите значение' v-model='currency_value'></td>
          </tr>
          <tr>
            <td><label> Введите дату действия курса </label></td>
            <td><input class='date-input' id= 'date_input' type='date' v-model='forcing_date'></td>
          </tr>
          <tr>
            <td></td>
            <td><button class='btn btn-light enter' type='submit' > Применить </button></td>
          </tr>
        </table>
      </form>
      <errorMsg v-if="success == false" v-bind:message='msg'></errorMsg>
      <table id='currency_forcing_table' v-if='currencyForcingDataList.length != 0'>
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
          <td> <button @click='removeCurrencyForcingData(n)'>Удалить</button></td>
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
        currency_type: '',
        currency_value: '',
        forcing_date: null,
        currencyForcingData: null,
        currencyForcingDataList: [],
        success: null,
        msg: null
      }
    },
    components: {
      errorMsg: errorMsg
    },
    mounted () {
      this.apiRequest('get', this.$root.$options.settings.api.currencyForcing())
    },
    methods: {
      addCurrencyForsingData () {
        this.currencyForcingData = { currency_type: this.currency_type, currency_value: this.currency_value, forcing_date: this.forcing_date };
        if (!this.currencyForcingData) {
          return
        };
        this.apiRequest('post', this.$root.$options.settings.api.currencyForcing(), {currency_forcing_data: this.currencyForcingData})
        this.currencyForcingData = '';
        this.currency_type = '';
        this.currency_value = '';
        this.forcing_date = null;
      },
      removeCurrencyForcingData (x) {
        let id = this.currencyForcingDataList[x].id;
        this.apiRequest('delete', `${this.$root.$options.settings.api.currencyForcing()}/${id}`)
      },
      apiRequest (httpMethod, url, data = '') {
        this.$http({
          method: httpMethod,
          url: url,
          data: data
        })
        .then(response => {
          this.success = response.data.success
          if (this.success) {
            this.currencyForcingDataList = response.data.currencies;
          }
          else {
            this.msg = response.data.msg;
          }
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