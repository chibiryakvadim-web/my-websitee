document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("app")) {
        new Vue({
            el: "#app",
            data: {
                products: [
                    {
                        id: 1,
                        title: "Radish Cherry Belle",
                        short_text: "Early round red radish",
                        image: "img/radish1.jpg",
                        desc: "Cherry Belle is an early radish variety with round bright-red roots, juicy white flesh and mild pleasant taste."
                    },
                    {
                        id: 2,
                        title: "Radish French Breakfast",
                        short_text: "Elongated red-white roots",
                        image: "img/radish2.jpg",
                        desc: "French Breakfast is a famous elongated radish variety with crisp flesh, attractive color and delicate flavor."
                    },
                    {
                        id: 3,
                        title: "Radish White Icicle",
                        short_text: "Long white fresh roots",
                        image: "img/radish3.jpg",
                        desc: "White Icicle forms long white roots with refreshing taste, tender texture and stable productivity."
                    },
                    {
                        id: 4,
                        title: "Radish Red Giant",
                        short_text: "Large productive variety",
                        image: "img/radish4.jpg",
                        desc: "Red Giant is a productive radish with large roots, rich color and excellent market quality."
                    },
                    {
                        id: 5,
                        title: "Radish Sparkler",
                        short_text: "Bright color and crisp taste",
                        image: "img/radish5.jpg",
                        desc: "Sparkler is a decorative radish with attractive skin, crunchy flesh and pleasant fresh flavor."
                    }
                ],
                product: {},
                cart: [],
                btnVisible: 0,
                contactFields: {
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: ""
                },
                orderDone: false
            },

            mounted: function () {
                this.getProduct();
                this.checkInCart();
                this.getCart();
            },

            methods: {
                getProduct: function () {
                    if (window.location.hash) {
                        var id = window.location.hash.replace("#", "");
                        for (var i = 0; i < this.products.length; i++) {
                            if (this.products[i].id == id) {
                                this.product = this.products[i];
                            }
                        }
                    }
                },

                addToCart: function (id) {
                    var cartIds = [];
                    if (window.localStorage.getItem("cart")) {
                        cartIds = window.localStorage.getItem("cart").split(",");
                    }

                    if (cartIds.indexOf(String(id)) === -1) {
                        cartIds.push(String(id));
                        window.localStorage.setItem("cart", cartIds.join(","));
                    }

                    this.btnVisible = 1;
                },

                checkInCart: function () {
                    if (
                        this.product &&
                        this.product.id &&
                        window.localStorage.getItem("cart") &&
                        window.localStorage.getItem("cart").split(",").indexOf(String(this.product.id)) !== -1
                    ) {
                        this.btnVisible = 1;
                    }
                },

                getCart: function () {
                    this.cart = [];

                    if (!window.localStorage.getItem("cart")) {
                        return;
                    }

                    var cartIds = window.localStorage.getItem("cart").split(",");

                    for (var i = 0; i < cartIds.length; i++) {
                        for (var j = 0; j < this.products.length; j++) {
                            if (String(this.products[j].id) === String(cartIds[i])) {
                                this.cart.push(this.products[j]);
                            }
                        }
                    }
                },

                removeFromCart: function (id) {
                    this.cart = this.cart.filter(function (item) {
                        return item.id !== id;
                    });

                    var cartIds = [];
                    if (window.localStorage.getItem("cart")) {
                        cartIds = window.localStorage.getItem("cart").split(",");
                    }

                    cartIds = cartIds.filter(function (itemId) {
                        return String(itemId) !== String(id);
                    });

                    if (cartIds.length > 0) {
                        window.localStorage.setItem("cart", cartIds.join(","));
                    } else {
                        window.localStorage.removeItem("cart");
                    }
                },

                makeOrder: function () {
                    this.orderDone = true;
                    this.cart = [];
                    window.localStorage.removeItem("cart");
                }
            }
        });
    }
});