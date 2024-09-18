const shop = document.getElementById('shop')

let shopItemsData = [
    {
        id: "jfhgbvnscs",
        name: "Casual Shirt",
        price: 45,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        img: "images/img-1.jpg",
    },
    {
        id: "ioytrhndcv",
        name: "Office Shirt",
        price: 100,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        img: "images/img-2.jpg",
    },
    {
        id: "wuefbncxbsn",
        name: "T Shirt",
        price: 25,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        img: "images/img-3.jpg",
    },
    {
        id: "thyfhcbcv",
        name: "Mens Suit",
        price: 300,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        img: "images/img-4.jpg",
    }
]

let basket = JSON.parse(localStorage.getItem("data")) || []

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((item) => {
        let {img, name, price, desc, id} = item
        let search = basket.find((x) => x.id === id ) || [];
    return `
        <div class="item" id="product-id-${id}">
            <img width="200" src="./${img}" alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
            </div>
            <div class="price-quantity">
                <h2 class="price">$ ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id="${id}" class="quantity">${search.item === undefined ? 0 : search.item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
        `
    }).join(""))
}
generateShop()


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
    localStorage.setItem('data', JSON.stringify(basket))

    update(selectedItem.id)
}

const decrement = (id) => {
    let selectedItem = id
    let search = basket.find((basketItem) => basketItem.id === selectedItem.id)
    
    if(search.item === 0) return
    else {
        search.item -= 1
    }
    // console.log(basket)

    localStorage.setItem('data', JSON.stringify(basket))

    update(selectedItem.id)
} 

const update = (id) => {
    let search = basket.find((x) => x.id === id)
    document.getElementById(id).innerHTML = search.item

    calculation()
}

let calculation  = () => {
    let cartIcon = document.getElementById('cartAmount')

    cartIcon.innerHTML = basket.map((x) => x.item).reduce((acc, x) => acc + x, 0)
}

calculation()