class Product {
    constructor(name, code, price, Vat, priceVat, category, optionals, rating, image) {
        this.name = name;
        this.code = code;
        this.price = price;
        this.Vat = Vat;
        this.priceVat = priceVat;
        this.category = category;
        this.optionals = optionals;
        this.rating = rating;
        this.image = image;
    }
}
class CartItem {
    constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
    }
}
//# sourceMappingURL=product.js.map