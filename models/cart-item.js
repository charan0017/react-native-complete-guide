export default class CartItem {
    constructor(quantity, productPrice, productTitle) {
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productTitle = productTitle;
        this.sum = this.quantity * this.productPrice;
    }

    get title() { return this.productTitle; }

    get price() { return this.productPrice; }
}
