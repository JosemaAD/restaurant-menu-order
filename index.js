import { menuArray } from './data.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
let cart = []

const foodMenuList = document.getElementById('food-menu-list')
const orderDetails = document.getElementById('order-details')

document.addEventListener("click", function(e){
    if(e.target.dataset.add){
        handleAddToCartBtn(e.target.dataset.add)
    }
    else if(e.target.dataset.remove){
        handleRemoveFromCartBtn(e.target.dataset.remove)
    }
})

function handleAddToCartBtn(foodId){
    const itemAdded = menuArray.filter(function(food){
        return food.uuid === foodId
    })[0]

    cart.push(itemAdded) 

    renderCart(cart)
}

function handleRemoveFromCartBtn(foodId){

    const itemRemoved = cart.filter(function(food){
        return food.uuid === foodId
    })[0]

    let indexOfFood = cart.indexOf(itemRemoved)
    cart.splice(indexOfFood, 1)

    renderCart(cart)
}

function cartItems(cart){
    let cartHtml = ``
    if(cart.length > 0){

        cart.forEach(function(item,i = 0){
            cartHtml += `
                <div class="row align-items-center justify-content-center">
                    <div class="col-md-3">
                        <h3>${item.name}</h3>
                    </div>
                    <div class="col-md-3">
                    <i class="fa-solid fa-trash" data-remove="${item.uuid}"> Remove</i>
                    </div>
                    <div class="col-md-6 text-end">
                    ${item.price}
                    </div>
                </div>
            `
        })
    }
    return cartHtml 
}

function getFeedHtml(){
    let htmlMenu = ``
    menuArray.forEach(function(food){   
        htmlMenu += `
        <div class="row align-items-center">
            <div class="col-md-3">
                ${food.emoji}
            </div>
            <div class="col-md-3">
                <h3 class="food-name">${food.name}</h3>
                <p class="food-ingredients">${food.ingredients}</p>
                <p class="food-price">${food.price}</p>
            </div>
            <div class="col-md-6 text-end">
                <i class="fa-regular fa-plus" data-add="${food.uuid}"></i>
            </div>
        </div>
        `
    })
    return htmlMenu
}

function renderMenu(){
    foodMenuList.innerHTML = getFeedHtml()
}

function renderCart(cart){
    if(cart){
        orderDetails.innerHTML = cartItems(cart)
    }
    console.log(cart)
}

renderMenu()
