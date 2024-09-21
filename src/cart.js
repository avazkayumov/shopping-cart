let label = document.querySelector('#label')
let shoppingCart = document.querySelector('#shopping-cart')

let basket = JSON.parse(localStorage.getItem("data")) || []

let calculation  = () => {
    let cartIcon = document.getElementById('cartAmount')

    cartIcon.innerHTML = basket.map((x) => x.item).reduce((acc, x) => acc + x, 0)
}
calculation()

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (shoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x
            let search = shopItemsData.find((y) => y.id === id)
            return `
                <div class="cart-item">
                    <img width='100px' src=${search.img} />
                    <div class='details'>
                        <div class="title-price-x">
                            <h4 class='title-price'>
                                <p>${search.name}<p/>
                                <p class='cart-item-price'>$ ${search.price}<p/>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                        </div>
                        
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id="${id}" class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>

                        <h3>$ ${item * search.price}</h3>
                    </div>
                </div>
            `
        }).join(''))
    }
    else {
        shoppingCart.innerHTML = ''
        label.innerHTML = `
            <h2>Cart is empty</h2>
            <a href='index.html'>
                <button class="homeBtn">Back to Home</button>
            </a>
        `
    }
}

generateCartItems()

const increment = (id) => {
    let selectedItem = id
    let search = basket.find((x) => x.id === selectedItem.id)
    
    if(!search) {
        basket.push({
            id: selectedItem.id,
            item: 1
        })
    }else {
        search.item += 1
    }
    
    update(selectedItem.id)
    generateCartItems()
    localStorage.setItem('data', JSON.stringify(basket))
}

const decrement = (id) => {
    let selectedItem = id
    let search = basket.find((basketItem) => basketItem.id === selectedItem.id)
    
    if (search === undefined) return

    else if(search.item === 0) return
    else {
        search.item -= 1
    }
    update(selectedItem.id)
    basket = basket.filter((x) => x.item !== 0)
    generateCartItems()
    localStorage.setItem('data', JSON.stringify(basket))
} 

const update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item

    calculation()
    totalAmount()
}

const removeItem = (id) => {
    let selectedItem = id

    basket = basket.filter((x) => x.id !== selectedItem.id)
    localStorage.setItem('data', JSON.stringify(basket))
    generateCartItems()
    totalAmount()
    calculation()
}

const clearCart = () => {
    basket = []
    generateCartItems()
    localStorage.setItem('data', JSON.stringify(basket))
    calculation()
}

const totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let {item, id} = x
            let search = shopItemsData.find((y) => y.id === id) || []
            return item * search.price
        }).reduce((x, y) => x + y, 0)
        label.innerHTML = `
            <h2>Total Bill: ${amount} $</h2>
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Clear cart</button>
        `
    }else return
}

totalAmount()