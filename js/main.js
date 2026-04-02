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
                btnVisible: 0
            },

            mounted: function () {
                this.getProduct();
                this.checkInCart();
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
                    var cart = [];
                    if (window.localStorage.getItem("cart")) {
                        cart = window.localStorage.getItem("cart").split(",");
                    }

                    if (cart.indexOf(String(id)) === -1) {
                        cart.push(id);
                        window.localStorage.setItem("cart", cart.join(","));
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
                }
            }
        });
    }
});