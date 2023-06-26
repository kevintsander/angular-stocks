export interface Stock {
  abbreviation: string,
  price: [{
    time: string,
    value: number
  }]
}
