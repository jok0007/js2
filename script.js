/* const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const $goodsList = document.querySelector('.goods-list');

const renderGoodsItem = ({ title, price }) => {
    return `<div class="goods-item"><h3>${title}</h3><p>${price} руб.</p></div>`;
};

const renderGoodsList = (list = goods) => {
    let goodsList = list.map(
        (item) => {
            return renderGoodsItem(item)
        }
    ).join('');

    $goodsList.insertAdjacentHTML('beforeend', goodsList);
}

renderGoodsList(); */



/* function getCounter() {
    let last = 0;

    return () => ++last;
}

const stackIDGenrator = getCounter();


class Good {
    constructor({ id, title, price }) {
        this.id = id;
        this.title = title;
        this.price = price;
    }

    getId() {
        return this.id;
    }

    getPrice() {
        return this.price;
    }

    getTitle() {
        return this.title;
    }
}

class GoodStack {
    constructor(good) {
        this.id = stackIDGenrator();
        this.good = good;
        this.count = 1;
    }

    getGoodId() {
        return this.good.id;
    }

    getGood() {
        return this.good;
    }

    getCount() {
        return this.count;
    }

    add() {
        this.count++;
        return this.count;
    }

    remove() {
        this.count--;
        return this.count;
    }
}

class Cart {
    constructor() {
        this.list = [];
    }

    add(good) {
        const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id);

        if (idx >= 0) {
            this.list[idx].add();
        } else {
            this.list.push(new GoodStack(good));
        }

    }

    remove(id) {
        const idx = this.list.findIndex((stack) => stack.getGoodId() == id);

        if (idx >= 0) {
            this.list[idx].remove();

            if (this.list[idx].getCount() <= 0) {
                this.list.splice(idx, 1);
            }
        }

    }
}

class Showcase {
    constructor(cart) {
        this.list = [];
        this.cart = cart;
    }

    fetchGoods() {
        this.list = [
            new Good({ id: 1, title: 'Футболка', price: 140 }),
            new Good({ id: 2, title: 'Брюки', price: 320 }),
            new Good({ id: 3, title: 'Галстук', price: 24 })
        ];
    }

    addToCart(id) {
        const idx = this.list.findIndex((good) => id == good.id);

        if (idx >= 0) {
            this.cart.add(this.list[idx]);
        }
    }
}


const cart = new Cart();
const showcase = new Showcase(cart);

showcase.fetchGoods();

showcase.addToCart(1);
showcase.addToCart(1);
showcase.addToCart(1);
showcase.addToCart(3);

cart.remove(1);


console.log(showcase.list);
console.log(cart);

class RenderGoodCart {
    constructor({ title, price }) {
        this.title = title;
        this.price = price;
    }

    renderGoodsItem({ title, price }) {
        return `<div class="goods-item"><h3>${title}</h3><p>${price} руб.</p></div>`;
    }


} */


const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';

function send(onError, onSuccess, url, method = 'GET', data = '', headers = {}, timeout = 60000) {

    let xhr;

    if (window.XMLHttpRequest) {
        // Chrome, Mozilla, Opera, Safari
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        // Internet Explorer
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    for ([key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value);
    }

    xhr.timeout = timeout;

    xhr.ontimeout = onError;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status < 400) {
                onSuccess(xhr.responseText)
            } else if (xhr.status >= 400) {
                onError(xhr.status);
            }
        }
    };

    xhr.open(method, url, true);

    xhr.send(data);
}

function getCounter() {
    let last = 0;

    return () => ++last;
}

const stackIDGenrator = getCounter();


class Good {
    constructor({ id, title, price }) {
        this.id = id;
        this.title = title;
        this.price = price;
    }

    getId() {
        return this.id;
    }

    getPrice() {
        return this.price;
    }

    getTitle() {
        return this.title;
    }
}

class GoodStack {
    constructor(good) {
        this.id = stackIDGenrator();
        this.good = good;
        this.count = 1;
    }

    getGoodId() {
        return this.good.id;
    }

    getGood() {
        return this.good;
    }

    getCount() {
        return this.count;
    }

    getPrice() {
        return this.good.price * this.count;
    }

    add() {
        this.count++;
        return this.count;
    }

    remove() {
        this.count--;
        return this.count;
    }
}

class Cart {
    constructor() {
        this.list = [];
    }

    add(good) {
        const idx = this.list.findIndex((stack) => stack.getGoodId() == good.id);

        if (idx >= 0) {
            this.list[idx].add();
        } else {
            this.list.push(new GoodStack(good));
        }

    }

    remove(id) {
        const idx = this.list.findIndex((stack) => stack.getGoodId() == id);

        if (idx >= 0) {
            this.list[idx].remove();

            if (this.list[idx].getCount() <= 0) {
                this.list.splice(idx, 1);
            }
        }

    }
}

class Showcase {
    constructor(cart) {
        this.list = [];
        this.cart = cart;
    }

    _onSuccess(response) {
        const data = JSON.parse(response);
        data.forEach(product => {
            this.list.push(
                new Good({ id: product.id_product, title: product.product_name, price: product.price })
            );
        });
    }

    _onError(err) {
        console.log(err);
    }

    fetchGoods() {
        send(this._onError, this._onSuccess.bind(this), `${API_URL}catalogData.json`);
    }

    addToCart(id) {
        const idx = this.list.findIndex((good) => id == good.id);

        if (idx >= 0) {
            this.cart.add(this.list[idx]);
        }
    }
}


const cart = new Cart();
const showcase = new Showcase(cart);

showcase.fetchGoods();

setTimeout(() => {
    showcase.addToCart(123);
    showcase.addToCart(123);
    showcase.addToCart(123);
    showcase.addToCart(456);

    cart.remove(123);


    console.log(showcase.list);
    console.log(cart);
}, 1000);




// Создать класс для отрисовки каточки товара на витрине, и класс отрисовки карточки товара в корзине, класс отрисовки корзины, и класс отрисовки витрины

class RenderGoodCart {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price} руб.</p></div>`;
    }
}

class RenderGoodsList {
    constructor(container, list) {
        this.goods = [];
        this.container = container;
        this.list = list;
    }

    fetchGoods() {
        this.goods = this.list;
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new RenderGoodCart(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector(this.container).innerHTML = listHtml;
    }
}

setTimeout(() => {
    const list = new RenderGoodsList('.goods-list', showcase.list);
    const listCart = new RenderGoodsList('.cart__content', showcase.list);
    list.fetchGoods();
    list.render();
    listCart.fetchGoods();
    listCart.render();

}, 1000);

const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll('[data-modal]'),
            scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
            });
        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });

            modal.style.display = "none";
            document.body.style.overflow = "";
            document.body.style.marginRight = `0px`;
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
            }
        });
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    bindModal('.cart-button', '.cart', '.cart__close');
};

modals();