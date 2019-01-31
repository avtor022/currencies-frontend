class Config {
  constructor() {
    this.baseApiURL = 'http://localhost:3001'
  }

  currencyForcing () {
      return `${this.baseApiURL}/currency_forcing`
  }

  getCurrencies () {
    return `${this.baseApiURL}/`
  }
}

export default Config
