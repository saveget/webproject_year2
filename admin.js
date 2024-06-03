
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if(username == "admin" && password == 1234){
        window.location.href = "admin_order.php";
    }else{
        alert("Invalid Information");
    }
});