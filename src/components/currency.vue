<template>
  <div>
    <h4> Курс валют (на {{ getDay }}) </h4>
    <div id='currency_unit'>
      <errorMsg v-if="success == false" v-bind:message='msg' data-test="error"></errorMsg>
      <table id='currency_table' data-test='currencyTable'>
        <tr v-if='dollar!=null'>
          <td>
            $
          </td>
          <td> {{ dollar }} </td>
        </tr>
        <tr v-if='euro!=null'>
          <td>
            €
          </td>
          <td> {{ euro }} </td>
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
        dollar: null,
        euro: null,
        interval: null,
        msg: '',
        success: false
      }
    },
    created () {
      this.getCurrencies();
    },
    mounted () {
      this.interval = setInterval(function () {
        this.getCurrencies();
      }.bind(this), 10000)
    },
    components: {
      errorMsg: errorMsg
    },
    computed: {
      getDay () {
        let d = new Date();
        let dd = d.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = d.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = d.getFullYear()
        return dd + '.' + mm + '.' + yy;
      }
    },
    methods: {
      getCurrencies () {
        this.$http.get(this.$root.$options.settings.api.getCurrencies())
        .then(response => {
          this.success = response.data.success
          if (this.success) {
            this.dollar = response.data.currencies.dollar
            this.euro = response.data.currencies.euro
          }
          else {
            this.showError(response.data.msg)
          }
        })
        .catch( () => {
          this.showError()
        })
      },
      showError (msg = 'There are no data!') {
        this.msg = msg;
        this.success = false;
        this.dollar = null;
        this.euro = null
      }
    },
    beforeDestroy () {
    clearInterval(this.interval);
    }
  }

</script>

<style>
  #currency_table {
      margin-left:auto;
      margin-right:auto;
      border-collapse: separate;
      border-spacing: 20px;
    }
</style>
