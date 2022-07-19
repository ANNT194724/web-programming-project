document.addEventListener("DOMContentLoaded", function() {
	cat();
	brand();
	product();
	//cat() is a funtion fetching category record from database whenever page is load
	function cat(){
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "../Controller/action.php", true);
            ajax.onreadystatechange = function () {
                if (ajax.readyState !== 4) // check to see if we're done
                    { return; }
                else if (ajax.status !== 200) // check to see if successful
                {
                    alert("Request failed: " + ajax.statusText);
                }
            };
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
            ajax.onreadystatechange = function () {
                if (ajax.readyState !== 4) // check to see if we're done
                    { return; }
                else if (ajax.status !== 200) // check to see if successful
                {
                    alert("Request failed: " + ajax.statusText);
                }
            };
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
            ajax.onreadystatechange = function () {
                if (ajax.readyState !== 4) // check to see if we're done
                    { return; }
                else if (ajax.status !== 200) // check to see if successful
                {
                    alert("Request failed: " + ajax.statusText);
                }
            };
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
                catList[i].addEventListener('click', e => {
                    catList[i].addEventListener("click", function(event){
                        document.getElementById("get_product").innerHTML = "<h3>Loading</h3>";
                        event.preventDefault();
                        var cid = catList[i].getAttribute("cid");
                        var ajax = new XMLHttpRequest();
                        ajax.open("POST", "../Controller/action.php", true);
                        ajax.onreadystatechange = function () {
                                if (ajax.readyState !== 4) // check to see if we're done
                                        { return; }
                                else if (ajax.status !== 200) // check to see if successful
                                {
                                        alert("Request failed: " + ajax.statusText);
                                }
                        };
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
                        addButton();
                    });
                });
            }
        }, 30);
	/*	when page is load successfully then there is a list of brands when user click on brand we will get brand id and 
		according to brand id we will show products
	*/
        setTimeout(() => {
            let brandList = document.querySelectorAll('.selectBrand');
            for (let i = 0; i < brandList.length; i++){
		brandList[i].addEventListener('click', e => {
                    brandList[i].addEventListener("click", function(event){
                        document.getElementById("get_product").innerHTML = "<h3>Loading</h3>";
                        event.preventDefault();
                        var bid = brandList[i].getAttribute("bid");
                        var ajax = new XMLHttpRequest();
                        ajax.open("POST", "../Controller/action.php", true);
                        ajax.onreadystatechange = function () {
                                if (ajax.readyState !== 4) // check to see if we're done
                                        { return; }
                                else if (ajax.status !== 200) // check to see if successful
                                {
                                        alert("Request failed: " + ajax.statusText);
                                }
                        };
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
                        addButton();
                        });
                    });
                }
            }, 50);
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
                ajax.onreadystatechange = function () {
                    if (ajax.readyState !== 4) // check to see if we're done
                            { return; }
                    else if (ajax.status !== 200) // check to see if successful
                    {
                            alert("Request failed: " + ajax.statusText);
                    }
                };
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
	$("#login").on("submit",function(event){
		event.preventDefault();
		$(".overlay").show();
		$.ajax({
			url	:	"../Controller/login.php",
			method  :	"POST",
			data	:$("#login").serialize(),
			success	:function(data){
				if(data == "login_success"){
					window.location.href = "profile.php";
				}else if(data == "cart_login"){
					window.location.href = "cart.php";
				}else{
					$("#e_msg").html(data);
					$(".overlay").hide();
				}
			}
		})
	})
	//end
        
	//Get User Information before checkout
	$("#signup_form").on("submit",function(event){
		event.preventDefault();
		$(".overlay").show();
		$.ajax({
			url : "../Controller/register.php",
			method : "POST",
			data : $("#signup_form").serialize(),
			success : function(data){
				$(".overlay").hide();
				if (data == "register_success") {
					window.location.href = "cart.php";
				}else{
					$("#signup_msg").html(data);
				}
				
			}
		})
                });
	//Get User Information before checkout end here

	//Add Product into Cart
    addButton();
    function addButton(){
        setTimeout(() => {
            prodList = document.querySelectorAll("#product");
            for (let i = 0; i < prodList.length; i++){
                prodList[i].addEventListener("click", function(event){
                    var pid = prodList[i].getAttribute("pid");
                    event.preventDefault();
                    var element = document.getElementsByClassName("overlay");
                    if(element[0]) {
                        element[0].style.display = 'block';
                    }
                    var ajax = new XMLHttpRequest();
                    ajax.open("POST", "../Controller/action.php", true);
                    ajax.onreadystatechange = function () {
                        if (ajax.readyState !== 4) // check to see if we're done
                            { return; }
                        else if (ajax.status !== 200) // check to see if successful
                        {
                            alert("Request failed: " + ajax.statusText);
                        }
                    };
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
            ajax.onreadystatechange = function () {
                if (ajax.readyState !== 4) // check to see if we're done
                    { return; }
                else if (ajax.status !== 200) // check to see if successful
                {
                    alert("Request failed: " + ajax.statusText);
                }
            };
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
            ajax.onreadystatechange = function () {
                if (ajax.readyState !== 4) // check to see if we're done
                    { return; }
                else if (ajax.status !== 200) // check to see if successful
                {
                    alert("Request failed: " + ajax.statusText);
                }
            };
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
	$("body").delegate(".qty","keyup",function(event){
		event.preventDefault();
		var row = $(this).parent().parent();
		var price = row.find('.price').val();
		var qty = row.find('.qty').val();
		if (isNaN(qty)) {
			qty = 1;
		};
		if (qty < 1) {
			qty = 1;
		};
		var total = price * qty;
		row.find('.total').val(total);
		var net_total=0;
		$('.total').each(function(){
			net_total += ($(this).val()-0);
		})
		$('.net_total').html("Total : $ " +net_total);

	})
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
                ajax.onreadystatechange = function () {
                    if (ajax.readyState !== 4) // check to see if we're done
                        { return; }
                    else if (ajax.status !== 200) // check to see if successful
                    {
                        alert("Request failed: " + ajax.statusText);
                    }
                };
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
                ajax.onreadystatechange = function () {
                    if (ajax.readyState !== 4) // check to see if we're done
                        { return; }
                    else if (ajax.status !== 200) // check to see if successful
                    {
                        alert("Request failed: " + ajax.statusText);
                    }
                };
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
            ajax.onreadystatechange = function () {
                if (ajax.readyState !== 4) // check to see if we're done
                    { return; }
                else if (ajax.status !== 200) // check to see if successful
                {
                    alert("Request failed: " + ajax.statusText);
                }
            };
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
                var CURRENCY = "Rs";
		$('.qty').each(function(){
			var row = $(this).parent().parent();
			var price  = row.find('.price').val();
			var total = price * $(this).val()-0;
			row.find('.total').val(total);
		})
		$('.total').each(function(){
			net_total += ($(this).val()-0);
		})
		$('.net_total').html("Total : "+ CURRENCY + " " +net_total);
	}

	//remove product from cart

	page();
	function page(){
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "../Controller/action.php", true);
            ajax.onreadystatechange = function () {
                if (ajax.readyState !== 4) // check to see if we're done
                    { return; }
                else if (ajax.status !== 200) // check to see if successful
                {
                    alert("Request failed: " + ajax.statusText);
                }
            };
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
	$("body").delegate("#page","click",function(){
            var pn = $(this).attr("page");
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "../Controller/action.php", true);
            ajax.onreadystatechange = function () {
                if (ajax.readyState !== 4) // check to see if we're done
                    { return; }
                else if (ajax.status !== 200) // check to see if successful
                {
                    alert("Request failed: " + ajax.statusText);
                }
            };
            ajax.onload = function () {
                var element = document.getElementById("get_product");
                if(element) {
                    element.innerHTML = ajax.responseText;
                }
                checkOutDetails();
            };
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send("getProduct=1&setPage=1&Pagenumber="+pn.toString());
	})
});