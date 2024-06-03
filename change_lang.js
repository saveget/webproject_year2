
const data ={
    "Thai":
    {
        "dessert":"ของหวาน",
        "rice":"ข้าว",
        "main":"จานหลัก",
        "appi":"อาหารทานเล่น",
        "side_dishes":"เครื่องเคียง",
        "cartItem" : "ไม่มีสินค้าในกล่องข้าว",
        "headcart" : "กล่องข้าวของฉัน",
        "home" : "หน้าหลัก",
        "pro" : "โปรโมชั่น",
        "rec" : "เมนูแนะนำ",
        "contact" : "ติดต่อเรา",
        "total" : "ยอดรวม",
        "jprice" : "ข้าวญี่ปุ่น",
        "choose_r" : "เลือกข้าว",
        "choose_m" : "เลือกจานหลัก"
    },
    "Eng":{
        "dessert":"DESSERT",
        "rice":"RICE",
        "main":"MAIN",
        "appi":"APPITIZER",
        "side_dishes":"SIDE DISHES",
        "cartItem" : "Your Bento is empty",
        "headcart" : "My Bento",
        "home" : "HOME",
        "pro" : "PROMOTION",
        "rec" : "RECCOMMENT",
        "contact" : "CONTACT",
        "total" : "Total",
        "jprice" : "japanese rice",
        "choose_r" : "CHOOSE YOUR RICE",
        "choose_m" : "CHOOSE YOUR MAIN"

    }
}

function changeLanguage(language) {
    var lang = data[language];
    document.getElementById('dessert').innerText = lang.dessert;
    document.getElementById('rice').innerText = lang.rice;
    document.getElementById('main').innerText = lang.main;
    document.getElementById('appi').innerText = lang.appi;
    document.getElementById('side_dishes').innerText = lang.side_dishes;
    document.getElementById('home').innerText = lang.home;
    document.getElementById('pro').innerText = lang.pro;
    document.getElementById('rec').innerText = lang.rec;
    document.getElementById('contact').innerText = lang.contact;
    document.getElementById('cartItem').innerText = lang.cartItem;
    document.getElementById('headcart').innerText = lang.headcart;
    document.getElementById('totalhead').innerText = lang.total;

    document.getElementById('choose_r').innerText = lang.choose_r;

    document.getElementById('choose_m').innerText = lang.choose_m;
}
