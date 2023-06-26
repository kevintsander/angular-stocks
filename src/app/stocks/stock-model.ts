export interface Stock {
  abbreviation: string,
  date: string,
  price: [{
    time: string,
    value: number
  }]
}
