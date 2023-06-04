import { menuArray } from './data.js';

const foodMenuList = document.getElementById('food-menu-list')
const orderDetails = document.getElementById('order-details')
const completeOrderBtn = document.getElementById('complete-order-btn')
const checkoutForm = document.getElementById('checkout-form')
const totalPrice = document.getElementById('total-price')
const payOrderBtn = document.getElementById('pay-order-btn')
const cartSummary = document.getElementById('cart-summary')
const thankYouMsg = document.getElementById('thank-you-msg')
let cart = []

// Event listener for add to cart and remove from cart
document.addEventListener("click", function(e){
    if(e.target.dataset.add){
        handleAddToCartBtn(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        handleRemoveFromCartBtn(e.target.dataset.remove)
    }
})

// event listener for complete order button
completeOrderBtn.addEventListener('click', function(){
    if(cart.length > 0){
        checkoutForm.classList.remove('d-none')
    }
})

// Event listener for payment and order completed state
payOrderBtn.addEventListener('click', function(e){
    if(document.getElementById('name-checkout').value && document.getElementById('card-number-checkout').value && document.getElementById('card-cvv-checkout').value){
        e.preventDefault()
        setTimeout(function(){
            cartSummary.classList.add('d-none')
            checkoutForm.classList.add('d-none')
            thankYouMsg.textContent = `Thanks ${document.getElementById('name-checkout').value} Your order is on its way!`
            thankYouMsg.classList.toggle('d-none')
        }, 1000);
    }
})

// Handle add to cart array
function handleAddToCartBtn(foodId){
    const itemAdded = menuArray.filter(function(food){
        return food.uuid === foodId
    })[0]

    cart.push(itemAdded) 
    completeOrderBtn.disabled = false
    renderCart(cart)
}

//Handle remove from cart array
function handleRemoveFromCartBtn(foodId){
    const itemRemoved = cart.filter(function(food){
        return food.uuid === foodId
    })[0]

    let indexOfFood = cart.indexOf(itemRemoved)
    cart.splice(indexOfFood, 1)
    if(cart.length === 0){
        completeOrderBtn.disabled = true
    }
    renderCart(cart)
}

// Print on UI the carts items 
function cartItems(cart){
    let cartHtml = ``
    if(cart.length > 0){

        cart.forEach(function(item){
            cartHtml += `
                <div class="row align-items-center justify-content-center my-2">
                    <div class="col-md-3">
                        <h4 class="mb-0">${item.name}</h3>
                    </div>
                    <div class="col-md-3">
                    <i class="fa-solid fa-trash remove" data-remove="${item.uuid}"> Remove</i>
                    </div>
                    <div class="col-md-6 text-end">
                    ${item.price}$
                    </div>
                </div>
            `
        })
    }

    return cartHtml
}

// Manage and print on UI the total cart
function cartTotal(cart){
    let cartTotalHtml = ``
    let cartTotalPrice = 0

    cart.forEach(function(item){
        cartTotalPrice += item.price
    })

    cartTotalHtml = `
    <div class="row align-items-center">
        <div class="col-md-6"><h2>Total Price:</h2> </div>
        <div class="col-md-6"><h4>${cartTotalPrice}$</h4></div>
    </div>
    `

    return cartTotalHtml
}

// Print menu on UI
function getFeedHtml(){
    let htmlMenu = ``
    menuArray.forEach(function(food){   
        htmlMenu += `
        <div class="row align-items-center border-bottom my-4">
            <div class="col-md-3">
                <p class="text-center h1">${food.emoji}</p>
            </div>
            <div class="col-md-3">
                <h3 class="food-name">${food.name}</h3>
                <p class="food-ingredients">${food.ingredients}</p>
                <p class="food-price h3">${food.price}</p>
            </div>
            <div class="col-md-6 text-end">
                <i class="fa-regular fa-plus add" data-add="${food.uuid}"></i>
            </div>
        </div>
        `
    })
    return htmlMenu
}

// Render menu function
function renderMenu(){
    foodMenuList.innerHTML = getFeedHtml()
}

// Render cart function
function renderCart(cart){
    if(cart){
        orderDetails.innerHTML = cartItems(cart)
        totalPrice.innerHTML = cartTotal(cart)
    }
    
}

renderMenu()
