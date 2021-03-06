document.addEventListener("DOMContentLoaded", function() {
    function checkReady(ajax) {
        if (ajax.readyState !== 4) // check to see if we're done
            { return; }
        else if (ajax.status !== 200) // check to see if successful
        {
            alert("Request failed: " + ajax.statusText);
        }
    }
	cat();
	brand();
	product();
	//cat() is a funtion fetching category record from database whenever page is load
	function cat(){
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "../Controller/action.php", true);
            ajax.onreadystatechange = checkReady(ajax);
            ajax.onload = function () {
                var element = document.getElementById("get_category");
                if(element) {
                    element.innerHTML = ajax.responseText;
                }
            };
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send("category=1");
	}
	//brand() is a funtion fetching brand record from database whenever page is load
	function brand(){
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "../Controller/action.php", true);
            ajax.onreadystatechange = checkReady(ajax);
            ajax.onload = function () {
                var element = document.getElementById("get_brand");
                if(element) {
                    element.innerHTML = ajax.responseText;
                }
            };
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send("brand=1");
	}
	//product() is a funtion fetching product record from database whenever page is load
        function product(){
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "../Controller/action.php", true);
            ajax.onreadystatechange = checkReady(ajax);
            ajax.onload = function () {
                var element = document.getElementById("get_product");
                if(element) {
                    element.innerHTML = ajax.responseText;
                }
            };
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send("getProduct=1");
        }
	/*	when page is load successfully then there is a list of categories when user click on category we will get category id and 
		according to id we will show products
	*/
        setTimeout(() => {
            let catList = document.querySelectorAll('.category');
            for (let i = 0; i < catList.length; i++){
                catList[i].addEventListener("click", function(event){
                    document.getElementById("get_product").innerHTML = "<h3>Loading</h3>";
                    event.preventDefault();
                    var cid = catList.item(i).getAttribute("cid");
                    var ajax = new XMLHttpRequest();
                    ajax.open("POST", "../Controller/action.php", true);
                    ajax.onreadystatechange = checkReady(ajax);
                    ajax.onload = function () {
                        var element = document.getElementById("get_product");
                        if(element) {
                            element.innerHTML = ajax.responseText;
                            if(document.body.clientWidth < 480) {
                                    document.body.scrollTop = 683;
                            }
                        }
                    };
                    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    ajax.send("get_selected_Category=1&cat_id="+cid.toString());
                    });
                }
            }, 50);
	/*	when page is load successfully then there is a list of brands when user click on brand we will get brand id and 
		according to brand id we will show products
	*/
        setTimeout(() => {
            let brandList = document.querySelectorAll('.selectBrand');
            for (let i = 0; i < brandList.length; i++){
                brandList[i].addEventListener("click", function(event){
                    document.getElementById("get_product").innerHTML = "<h3>Loading</h3>";
                    event.preventDefault();
                    var bid = brandList.item(i).getAttribute("bid");
                    var ajax = new XMLHttpRequest();
                    ajax.open("POST", "../Controller/action.php", true);
                    ajax.onreadystatechange = checkReady(ajax);
                    ajax.onload = function () {
                        var element = document.getElementById("get_product");
                        if(element) {
                            element.innerHTML = ajax.responseText;
                            if(document.body.clientWidth < 480) {
                                    document.body.scrollTop = 683;
                            }
                        }
                    };
                    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    ajax.send("selectBrand=1&brand_id="+bid.toString());
                });
            }
	}, 150);
	/*
		At the top of page there is a search box with search button when user put name of product then we will take the user 
		given string and with the help of sql query we will match user given string to our database keywords column then matched product 
		we will show 
	*/
    var searchButton = document.getElementById("search_btn");
    if(searchButton){
        searchButton.addEventListener("click", function(){
        document.getElementById("get_product").innerHTML = "<h3>Loading</h3>";
            var keyword = document.getElementById("search").value;
            if(keyword !== "") {
                var ajax = new XMLHttpRequest();
                ajax.open("POST", "../Controller/action.php", true);
                ajax.onreadystatechange = checkReady(ajax);
                ajax.onload = function () {
                    var element = document.getElementById("get_product");
                    if(element) {
                        element.innerHTML = ajax.responseText;
                        if(document.body.clientWidth < 480) {
                                document.body.scrollTop = 683;
                        }
                    }
                };
                ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                ajax.send("search=1&keyword="+keyword);
            }
            addButton();
        });
    } 
    //end
	/*
		Here #login is login form id and this form is available in index.php page
		from here input data is sent to login.php page
		if you get login_success string from login.php page means user is logged in successfully and window.location is 
		used to redirect user from home page to profile.php page
	*/
    //Show an element
    var show = function (elem) {
        elem.style.display = 'block';
    };
	
    // Hide an element
    var hide = function (elem) {
        elem.style.display = 'none';
    };
    //turn FormData return into an object
    var serializeForm = function (form) {
        var obj = {};
        var formData = new FormData(form);
        for (var key of formData.keys()) {
            obj[key] = formData.get(key);
        }
        return obj;
    }; 
    
    let loginForm = document.getElementById("login");
    if (loginForm) {
        loginForm.addEventListener("submit", event => {
            event.preventDefault();
            show(document.querySelector(".overlay"));
            var data = serializeForm(loginForm);
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "../Controller/login.php", true);
            ajax.onreadystatechange = checkReady(ajax);
            ajax.onload = function () {
                    var res = ajax.responseText;
                    if(res == "login_success"){
                        window.location.href = "profile.php";
                    }else if(res == "cart_login"){
                        window.location.href = "cart.php";
                    }else{
                        document.getElementById("e_msg").innerHTML = res;
                        hide(document.querySelector(".overlay"));
                    }
            };
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send("email="+encodeURIComponent(data.email)+"&password="+data.password);
        });
    }
    //end
        
	//Get User Information before checkout
	let signupForm = document.getElementById("signup_form");
	if (signupForm) {
            signupForm.addEventListener("submit", event => {
                event.preventDefault();
                // document.getElementByClassName(".overlay").style.display = "block";
                show(document.querySelector(".overlay"));
                // var data = new FormData(signupForm);
                var data = serializeForm(signupForm);
                var ajax = new XMLHttpRequest();
                ajax.open("POST", "../Controller/register.php", true);
                ajax.onreadystatechange = checkReady(ajax);
                ajax.onload = function () {
                    hide(document.querySelector(".overlay"));
                    var res = ajax.responseText;
                    if (res === "register_success") {
                        window.location.href = "cart.php";
                    }else{
                        document.getElementById("signup_msg").innerHTML = res;
                        window.location.href = "profile.php";
                    }
                };
                ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                ajax.send("f_name="+data.f_name+"&l_name="+data.l_name+"&email="+encodeURIComponent(data.email)+"&password="+data.password+"&repassword="+data.repassword+"&mobile="+data.mobile+"&address1="+data.address1+"&address2="+data.address2);
            });
	}
	//Get User Information before checkout end here

	//Add Product into Cart
    addButton();
    function addButton(){
        setTimeout(() => {
            var prodList = document.querySelectorAll("#product");
            for (let i = 0; i < prodList.length; i++){
                prodList[i].addEventListener("click", function(event){
                    var pid = this.getAttribute("pid");
                    event.preventDefault();
                    var element = document.getElementsByClassName("overlay");
                    if(element[0]) {
                        element[0].style.display = 'block';
                    }
                    var ajax = new XMLHttpRequest();
                    ajax.open("POST", "../Controller/action.php", true);
                    ajax.onreadystatechange = checkReady(ajax);
                    ajax.onload = function () {
                        count_item();
                        getCartItem();
                        element = document.getElementById("product_msg");
                        if(element) {
                            element.innerHTML = ajax.responseText;
                        }
                        element = document.getElementsByClassName("overlay");
                        if(element[0]) {
                            element[0].style.display = 'none';
                        }
                    };
                    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    ajax.send("addToCart=1&&proId="+pid.toString());
                });
            }
        },200);
    }
	//Add Product into Cart End Here
	//Count user cart items funtion
	count_item();
	function count_item(){
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "../Controller/action.php", true);
            ajax.onreadystatechange = checkReady(ajax);
            ajax.onload = function () {
                var badge = document.getElementsByClassName("badge");
                if(badge[0]) {
                    badge[0].innerHTML = ajax.responseText;
                }
            };
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send("count_item=1");
	}
	//Count user cart items funtion end

	//Fetch Cart item from Database to dropdown menu
	getCartItem();
	function getCartItem(){
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "../Controller/action.php", true);
            ajax.onreadystatechange = checkReady(ajax);
            ajax.onload = function () {
                var element = document.getElementById("cart_product");
                if(element) {
                    element.innerHTML = ajax.responseText;
                }
            };
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send("Common=1&getCartItem=1");
	}

	//Fetch Cart item from Database to dropdown menu

	/*
		Whenever user change qty we will immediate update their total amount by using keyup funtion
		but whenever user put something(such as ?''"",.()''etc) other than number then we will make qty=1
		if user put qty 0 or less than 0 then we will again make it 1 qty=1
		('.total').each() this is loop funtion repeat for class .total and in every repetation we will perform sum operation of class .total value 
		and then show the result into class .net_total
	*/
	setInterval(() => {
		let quantityList = document.querySelectorAll(".qty");
		for (let i=0; i<quantityList.length; i++){
                    quantityList[i].addEventListener("keyup", function(event) {
                        event.preventDefault();
                        var row = this.parentElement.parentElement;
                        var price = row.querySelector(".price").value;
                        var qty = row.querySelector(".qty").value;
                        if (isNaN(qty)) {
                                qty = 1;
                        };
                        var total = price * qty;
                        row.querySelector(".total").value = total;
                        net_total();
                    });
		}
	}, 1000);
	//Change Quantity end here 

	/*
		whenever user click on .remove class we will take product id of that row 
		and send it to action.php to perform product removal operation
	*/
    setInterval(() => {
        var removeList = document.getElementsByClassName("remove");
        for(var i = 0; i < removeList.length; i++) {
            removeList[i].addEventListener("click", function() {
                var remove_id = this.getAttribute("remove_id");
                var ajax = new XMLHttpRequest();
                ajax.open("POST", "../Controller/action.php", true);
                ajax.onreadystatechange = checkReady(ajax);
                ajax.onload = function () {
                    var element = document.getElementById("cart_msg");
                    if(element) {
                        element.innerHTML = ajax.responseText;
                    }
                    checkOutDetails();
                };
                ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                ajax.send("removeItemFromCart=1&rid="+remove_id.toString());
            });
        }
    },1000);
	/*
		whenever user click on .update class we will take product id of that row 
		and send it to action.php to perform product qty updation operation
	*/
    setInterval(() => {
//	$("body").delegate(".update","click",function(event){
        var updateList = document.getElementsByClassName("update");
        for(var i = 0; i < updateList.length; i++) {
            updateList[i].addEventListener("click", function() {
                var update_id = this.getAttribute("update_id");
                var update = this.parentNode.parentNode.parentNode;
                var qty = update.querySelector(".qty").value;
                var ajax = new XMLHttpRequest();
                ajax.open("POST", "../Controller/action.php", true);
                ajax.onreadystatechange = checkReady(ajax);
                ajax.onload = function () {
                    var element = document.getElementById("cart_msg");
                    if(element) {
                        element.innerHTML = ajax.responseText;
                    }
                    checkOutDetails();
                };
                ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                ajax.send("updateCartItem=1&update_id="+update_id.toString()+"&qty="+qty.toString());
            });
        }
    },1000);
//	})
	checkOutDetails();
	net_total();
	/*
		checkOutDetails() function work for two purposes
		First it will enable php isset($_POST["Common"]) in action.php page and inside that
		there is two isset funtion which is isset($_POST["getCartItem"]) and another one is isset($_POST["checkOutDetials"])
		getCartItem is used to show the cart item into dropdown menu 
		checkOutDetails is used to show cart item into Cart.php page
	*/
	function checkOutDetails(){
            var element = document.getElementsByClassName("overlay");
            if(element[0]) {
                element[0].style.display = 'block';
            }
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "../Controller/action.php", true);
            ajax.onreadystatechange = checkReady(ajax);
            ajax.onload = function () {
                if(element[0]) {
                    element[0].style.display = 'none';
                }
                element = document.getElementById("cart_checkout");
                if(element) {
                    element.innerHTML = ajax.responseText;
                }
                net_total();
            };
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send("Common=1&checkOutDetails=1");
	}
	/*
		net_total function is used to calcuate total amount of cart item
	*/
	function net_total(){
		var net_total = 0;
        var CURRENCY = "USD";

            var quantity = document.querySelectorAll(".qty");
            for (let item of quantity){
                var row = item.parentElement.parentElement;
                var price = row.querySelector(".price").value;
                var total = price * item.value-0;
                row.querySelector(".total").value = total;
            }
            var total = document.querySelectorAll(".total");
            for (let item of total){
                net_total += ((item.value)-0);
            }

            setTimeout(() => {
            if(document.querySelector(".net_total")){
                document.querySelector(".net_total").innerHTML = "Total : "+net_total + " " + CURRENCY;
            }
            }, 150);
	}

	//remove product from cart

	page();
	function page(){
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "../Controller/action.php", true);
            ajax.onreadystatechange = checkReady(ajax);
            ajax.onload = function () {
                var element = document.getElementById("pageno");
                if(element) {
                    element.innerHTML = ajax.responseText;
                }
                checkOutDetails();
            };
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send("page=1");
	}
        
    setTimeout(() => {
        var pageList = document.querySelectorAll("#page");
        for(var i = 0; i < pageList.length; i++) {
            pageList[i].addEventListener("click", function() {
            var pn = this.getAttribute("page");
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "../Controller/action.php", true);
            ajax.onreadystatechange = checkReady(ajax);
            ajax.onload = function () {
                var element = document.getElementById("get_product");
                if(element) {
                    element.innerHTML = ajax.responseText;
                    addButton();
                }
                checkOutDetails();
            };
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send("getProduct=1&setPage=1&pageNumber="+pn.toString());
            });
        }
    }, 300);
});