import { menuArray } from './data.js';
const foodMenuList = document.getElementById('food-menu-list')
const orderDetails = document.getElementById('order-details')

document.addEventListener("click", function(e){
    if(e.target.dataset.add){
        handleAddToCartBtn(e.target.dataset.add)
    }
})

function handleAddToCartBtn(foodId){
    const itemAdded = menuArray.filter(function(food){
        return food.uuid === foodId
    })[0]

    const cart = []
    cart.push(itemAdded)
    handleCart(cart)
}

function handleCart(cart){
    console.log(cart)
    // if(cart.length > 0){
    //     let cartHtml = ``
    //         cart.forEach(function(item){
    //             cartHtml += `
    //                 <div class="row">
    //                     <div class="col-md-3">
    //                         ${item.name}
    //                     </div>
    //                     <div class="col-md-3">
    //                     </div>
    //                     <div class="col-md-6 text-end">
    //                     ${item.price}
    //                     </div>
    //                 </div>
    //             `
    //         })
    // renderCart(cartHtml)
    // }

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
    orderDetails.innerHTML = handleCart(cart)
}

renderMenu()
