
// ===============================
// SELECT ELEMENTS
// ===============================

const modal = document.getElementById("productModal");
const closeBtn = document.getElementById("closeModal");

const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");

const modalAction = document.getElementById("modalAction");
const cartMessage = document.getElementById("cartMessage");

const cartModal = document.getElementById("cartModal");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");

const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

const checkoutBtn = document.getElementById("checkoutBtn");

const discoverButtons = document.querySelectorAll(".discover-btn");


// ===============================
// SHOPPING CART DATA
// ===============================

let cart = [];

let selectedProduct = null;


// ===============================
// OPEN PRODUCT DETAILS
// ===============================

discoverButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        selectedProduct = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: Number(button.dataset.price),
            image: button.dataset.image,
            description: button.dataset.description
        };

        modalName.textContent = selectedProduct.name;

        modalPrice.textContent =
            "$" + selectedProduct.price.toFixed(2);

        modalImage.src = selectedProduct.image;

        modalImage.alt = selectedProduct.name;

        modalDescription.textContent =
            selectedProduct.description;

        cartMessage.textContent = "";

        modal.hidden = false;

        document.body.style.overflow = "hidden";

    });

});


// ===============================
// ADD PRODUCT TO CART
// ===============================

modalAction.addEventListener("click", function() {

    if (!selectedProduct) return;

    const existingProduct = cart.find(function(item) {
        return item.id === selectedProduct.id;
    });

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...selectedProduct,
            quantity: 1
        });

    }

    updateCart();

    cartMessage.textContent = "✓ Successfully added to your bag!";

    modalAction.textContent = "ADDED TO BAG";

});


// ===============================
// UPDATE CART
// ===============================

function updateCart() {

    const totalItems = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalItems;

    renderCart();

}


// ===============================
// DISPLAY CART ITEMS
// ===============================

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your shopping bag is empty.</p>';

    }

    cart.forEach(function(item) {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;

        const info = document.createElement("div");
        info.className = "cart-item-info";

        const name = document.createElement("h3");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = "$" + item.price.toFixed(2);

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const decrease = document.createElement("button");
        decrease.textContent = "-";
        decrease.setAttribute("aria-label", "Decrease quantity");

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const increase = document.createElement("button");
        increase.textContent = "+";
        increase.setAttribute("aria-label", "Increase quantity");

        const remove = document.createElement("button");
        remove.className = "remove-item";
        remove.textContent = "Remove";

        decrease.addEventListener("click", function() {
            changeQuantity(item.id, -1);
        });

        increase.addEventListener("click", function() {
            changeQuantity(item.id, 1);
        });

        remove.addEventListener("click", function() {
            removeProduct(item.id);
        });

        controls.append(decrease, quantity, increase);

        info.append(name, price, controls);

        cartItem.append(image, info, remove);

        cartItems.appendChild(cartItem);

    });


    // Calculate total price

    const total = cart.reduce(function(sum, item) {

        return sum + (item.price * item.quantity);

    }, 0);


    cartTotal.textContent = "$" + total.toFixed(2);

    checkoutBtn.disabled = cart.length === 0;

}


// ===============================
// CHANGE PRODUCT QUANTITY
// ===============================

function changeQuantity(id, amount) {

    const product = cart.find(function(item) {
        return item.id === id;
    });

    if (!product) return;

    product.quantity += amount;

    if (product.quantity <= 0) {

        removeProduct(id);

    } else {

        updateCart();

    }

}


// ===============================
// REMOVE PRODUCT
// ===============================

function removeProduct(id) {

    cart = cart.filter(function(item) {

        return item.id !== id;

    });

    updateCart();

}


// ===============================
// OPEN SHOPPING CART
// ===============================

openCart.addEventListener("click", function() {

    modal.hidden = true;

    cartModal.hidden = false;

    document.body.style.overflow = "hidden";

    renderCart();

});


// ===============================
// CLOSE MODALS
// ===============================

function closeModal() {

    modal.hidden = true;

    cartModal.hidden = true;

    document.body.style.overflow = "";

}

closeBtn.addEventListener("click", closeModal);

closeCart.addEventListener("click", closeModal);


// Close when clicking outside

modal.addEventListener("click", function(event) {

    if (event.target === modal) {
        closeModal();
    }

});

cartModal.addEventListener("click", function(event) {

    if (event.target === cartModal) {
        closeModal();
    }

});


// Close using Escape key

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeModal();
    }

});


// ===============================
// CHECKOUT DEMO
// ===============================

checkoutBtn.addEventListener("click", function() {

    if (cart.length === 0) return;

    alert(
        "Thank you for shopping with ÉLORA SKIN! " +
        "This is a demo checkout. No real order has been placed."
    );

});
