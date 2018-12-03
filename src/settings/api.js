class Config {
  constructor() {
    this.baseApiURL = 'http://172.26.95.173:3001'
  }

  currencyForcing () {
      return `${this.baseApiURL}/currency_forcing`
  }

  getCurrencies () {
    return `${this.baseApiURL}/`
  }
}

export default Config
