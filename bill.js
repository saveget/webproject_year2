
var order = [];

function displaycart() {
    let total = 0;
    const cartItemElement = document.getElementById("cartItem");
    const totalElement = document.getElementById("total");
    const confirmButtonElement = document.getElementById("confirmButton");

    if (cart.length === 0) {
        cartItemElement.innerHTML = "Your cart is empty";
        totalElement.innerHTML = "฿ 0.00";
        confirmButtonElement.style.display = "none";
    } else {
        cartItemElement.innerHTML = cart.map((item, index) => {
            const { image, title,title1,title2, price,id } = item;
            total += price;
            return (
                `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src=${image}>
                    </div>
                    <p style='font-size:15px;'>${title}</p>
                    <p style='font-size:15px;'>${title1}</p>
                    <p style='font-size:15px;'>${title2}</p>
                    <h2 style='font-size: 15px;'>฿ ${price}.00</h2>
                </div>`
            );
        }).join('');

        totalElement.innerHTML = "฿ " + total.toFixed(2);
        confirmButtonElement.style.display = "block";
    }
}


    window.onload = function() {
        retrieveCartFromLocalStorage();

    const confirmButtonElement = document.createElement("button");
    confirmButtonElement.textContent = "Confirm Order";
    confirmButtonElement.onclick = confirmOrder;
    confirmButtonElement.id = "confirmButton";
    document.getElementById("root").appendChild(confirmButtonElement);
    displaycart();
    };

    function sendID() {
        // Extracting only the id values from the cart array
        const ids = cart.map(item => item.id);
    
        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();
    
        // Configure the request
        xhr.open("POST", "save_ids.php", true);
        xhr.setRequestHeader("Content-Type", "application/json");
    
        // Define the callback function when the request is complete
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Request was successful
                console.log("Ids saved successfully!");
            } else {
                // Error handling
                console.error("Error saving ids:", xhr.statusText);
            }
        };
    
        // Send the request with the data
        xhr.send(JSON.stringify(ids));
    }