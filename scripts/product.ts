class Product {
  constructor(
    public name: string,
    public code: string,
    public price: number,
    public Vat: number,
    public priceVat: number,
    public category: string,
    public optionals: string[],
    public rating: number,
    public image: string
  ) {}
}

class CartItem {
  constructor(public product: Product, public quantity = 1) {}
}
