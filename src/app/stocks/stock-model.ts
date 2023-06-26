export interface Stock {
  abbreviation: string,
  price: [{
    time: number,
    value: number
  }]
}
