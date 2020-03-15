import moment from 'moment';

export default class Order {
    constructor(id, items, totalPrice, date) {
        this.id = id;
        this.items = items;
        this.totalPrice = totalPrice;
        this.orderDate = new Date(date);
    }

    get price() { return this.totalPrice; }

    get date() {
        /*return this.orderDate.toLocaleString('en-EN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });*/
        return moment(this.orderDate).format('MMMM Do YYYY, hh:mm')
    }
}
