if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() { // removes an item from the cart
    var removeCartItemButton = document.getElementsByClassName("close");
    for (var i = 0; i < removeCartItemButton.length; i++) {
        var button = removeCartItemButton[i]
        button.addEventListener('click', removeCartItem)
    }
}

function removeCartItem() {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function updateCartTotal() { // updates the total amount summary in the cart
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('product')
    var total = 0
    var shippingFee = 100
    var grandTotal = 0
    var subTotal = 0
    var none = cartItemContainer.getElementsByClassName('none')[0];

    // getting the subtotal for each product
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('subtitle')[0]
        var quantityElement = cartRow.getElementsByClassName('quantity-menu')[0]
        var price = parseFloat(priceElement.innerText)
        var quantity = quantityElement.value
        subTotal = price * quantity

        subTotal = Number(subTotal).toFixed(2)
        document.getElementsByClassName('amount')[i].innerText = subTotal
    }

    // getting the total
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('subtitle')[0]
        var quantityElement = cartRow.getElementsByClassName('quantity-menu')[0]
        var price = parseFloat(priceElement.innerText)
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Number(total).toFixed(2)
    document.getElementsByClassName('final-total')[0].innerText = total

    // displaying the grand total
    if (total > 0)
        grandTotal = parseFloat(total) + shippingFee
    else{
        none.style.display = "block";
        grandTotal = parseFloat(total)
        document.getElementsByClassName('grand-total')[0].innerText = grandTotal
        document.getElementsByClassName('ship-total')[0].innerText = "0.00"
    }
    grandTotal = Number(grandTotal).toFixed(2)
    document.getElementsByClassName('grand-total')[0].innerText = grandTotal
}