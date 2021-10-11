var pageId=localStorage.getItem('pageId')
function clearFocus(a){
    let i=$('.pagePortal-links')
    
    i.css({
        'color': 'rgba(0,0,0,.8)',
        'border-bottom': 'none'
    })
    if(a==''){
        return
    }
    $(`.${a}`).css({
        'color': '#20b883',
        'border-bottom': '3px solid #20b883'
    })
}
$(document).ready(function() {
    let login=localStorage.getItem('loginStatus')
    let logout=$('#logOut')

    logout.click(()=>{
        localStorage.setItem('loginStatus',false)
        logout.css({"display":"none"})
        loginPage()
    })
    
    if(login==='false' || login==='null')
    {  
        loginPage()
    }
    else if(login=='true')
    {
        logout.css({"display":"inline-block"})
        console.log(' you just logged in dude..');
        
        if(pageId==undefined || pageId==1){
            orderlistPage()
        }
        else if(pageId==2){
            ProductsPage()
        }
        else if(pageId==3){
            userslistPage()
        }
    }
    $('.pagePortal-links').click((e)=>{
        login=localStorage.getItem('loginStatus')
            if(login!='true'){
                console.log('invalid click');
                return
            }
            let value=e.target.innerText
            console.log(value);
            clearFocus(value)
            if(value=='Orders'){ 
                orderlistPage()
            }
            else if(value=='Products'){
                ProductsPage()
            }
            else if(value=='Users'){
                userslistPage()
            }
        })

    function loginPage(){
        pageId=0
        clearFocus('')
        localStorage.setItem('pageId',pageId)
        let logout=$('#logOut')
        let login=localStorage.getItem('loginStatus')

        
        $('#main').html(`<div id="log-in__page">
                <form action="" id="log-in__form" autocomplete="off">
                    <h1>Sign In</h1>
                    <input class="input-text" type="text" name="username" id="username" placeholder="EnterUserName ">
                    <input class="input-text" type="password" name="userpassword" id="userpassword" placeholder="EnterUserPassword ">
                    <input type="submit" name="loginform-submit" id="login-submit" value="Log In">
                </form>
            </div>`)

        $('#log-in__form').submit(function(e) {
            e.preventDefault()
            if(($('#username').val()===$('#userpassword').val())|| login==true)
            {
                localStorage.setItem('loginStatus',true)
                logout.css({"display":"inline-block"})
                console.log('loged in successfully..');
                orderlistPage()
            }
            else{
                alert('Invalid attempt')
                loginPage()

            }
        });
    
    }
    function orderlistPage(){
        pageId=1
        clearFocus('Orders')
        localStorage.setItem('pageId',pageId)
        console.log('came to orders page ');

        $('#main').html(`<div id="Page--wrapper">
                <h1 class="pageHeadding">Orders</h1>
                <div class="content--wrapper">
                    <div class="leftSection">
                        <h3 class="">Filters</h3>
                        <div class="leftSection--content--wrapper" >
                            <p id="count">Count: 0</p>
                            <label for="Expired-product">
                                <input type="checkbox" name="new-orders" id="new-orders" checked>
                                New
                            </label>
                            <label for="packed-orders">
                                <input type="checkbox" name="packed-orders" id="packed-orders" checked>
                                Packed
                            </label>
                            <label for="inTransit-orders">
                                <input type="checkbox" name="inTransit-orders" id="inTransit-orders" checked>
                                InTransit
                            </label>
                            <label for="Delivered-orders">
                                <input type="checkbox" name="Delivered-orders" id="Delivered-orders" checked>
                                Delivered
                            </label>
                        
                        </div>
                    </div>
                    <div class="rightSection">
                        <table>
                            <tr>
                                <th>ID</th> 
                                <th>Customer</th> 
                                <th>Date</th> 
                                <th>Amount</th> 
                                <th>Status</th>  
                            </tr>
                            <tbody id="orderPage-data">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`)
            
        var a='New',b='Packed',c='InTransit',d='Delivered'

        $('#new-orders,#packed-orders,#inTransit-orders,#Delivered-orders').change(()=>{
            if($('#new-orders:checkbox')[0].checked){ a='New' } else { a='' }
            if($('#packed-orders')[0].checked){b='Packed'}else{b=''}
            if($('#inTransit-orders')[0].checked){c='InTransit'}else{c=''}
            if($('#Delivered-orders')[0].checked){d='Delivered'}else{d=''}
            orderPageData([a,b,c,d])
        })

        function orderPageData(arr){   
            document.getElementById('orderPage-data').innerHTML=``
            let count=0
            $.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders',function(data){
                for(let i of data){
                    if(arr.includes(i.orderStatus)){
                        count+=1
                        document.getElementById('count').innerText=`Count : ${count}`
                        document.getElementById('orderPage-data').innerHTML+=`<tr>
                                    <td class="lignt-color"> ${i.id} </td>
                                    <td class="dark-color"> ${i.customerName} </td>
                                    <td class="dark-color"> ${i.orderDate}
                                        <br>
                                        <span class="lignt-color"> ${i.orderTime} </span>
                                    </td>
                                    <td class="lignt-color"> $${i.amount} </td>
                                    <td class="dark-color"> ${i.orderStatus} </td>
                                </tr>`
                    }
                }
            })

        }
        orderPageData([a,b,c,d])

    }
    function ProductsPage(){
        pageId=2
        clearFocus('Products')
        localStorage.setItem('pageId',pageId)
        // console.clear()
        console.log('came to products page');
        
        let a=0,b='1000'
        $('#main').html(`<div id="Page--wrapper">
                <h1 class="pageHeadding">Products</h1>
                <div class="content--wrapper">
                    <div class="leftSection">
                        <h3 class="">Filters</h3>
                        <div class="leftSection--content--wrapper" >
                            <p id="count">Count: 0</p>
                            <label for="Expired-product">
                                <input type="checkbox" name="Expired-product" id="Expired-product" checked>
                                Expired
                            </label>
                            <label for="Low-Stock">
                                <input type="checkbox" name="Low-Stock" id="Low-Stock" checked>
                                Low Stock
                            </label>
                        
                        </div>
                    </div>
                    <div class="rightSection">
                        <table>
                            <tr>
                                <th>ID</th> 
                                <th>Product Name </th> 
                                <th>Brand Name</th> 
                                <th>Expiry Date</th> 
                                <th>Unit Price</th>  
                                <th>Stock</th>  
                            </tr>
                            <tbody id="productPage-data">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`)

        $('#Expired-product,#Low-Stock').change(()=>{
            if($('#Low-Stock')[0].checked){ a=0 } else { a=100}
            if($('#Expired-product:checkbox')[0].checked){
                b='1000'
            }else{
                b=2021
            }
            console.log(b);
            prodectPageData([a,b])
        })

        function prodectPageData(arr){
            // console.clear()
            document.getElementById('productPage-data').innerHTML=``
            let count=0,flag=true
            $.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products',function(data){
                for(let i of data){
                    
                    if(i.stock>arr[0] && arr[1]<parseInt(i.expiryDate.split("-")[2])){
                        console.log(i.stock,parseInt(i.expiryDate.split("-")[2]));
                        count+=1
                        document.getElementById('count').innerText=`Count : ${count}`
                        document.getElementById('productPage-data').innerHTML+=`<tr>
                                    <td class="lignt-color">${i.id}</td>
                                    <td class="dark-color">${i.medicineName}</td>
                                    <td class="lignt-color">${i.medicineBrand}</td>
                                    <td class="dark-color">${i.expiryDate.split("-").join(' ')}</td>
                                    <td class="lignt-color">$${i.unitPrice}</td>
                                    <td class="dark-color">${i.stock}</td>
                                </tr>`
                    }
                }
            })

        }
        prodectPageData([a,b])

    }
    function userslistPage(){
        pageId=3
        clearFocus('Users')
        localStorage.setItem('pageId',pageId)
        console.log('came to users page ');
        $('#main').html(``)
        $('#main').html(`<div id="Page--wrapper">
                <h1 class="pageHeadding">Users</h1>
                <div class='user-search-form' autocomplete="off">
                    <input type="text" name="" id="userSearch" placeholder="Search by name " >
                    <input type="button" name="" id="resetSearch" value="Reset" class='reset'>
                </div>
                <div class="content--wrapper">
                    <div class="rightSection">
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>User Avatar</th>
                                <th>Full Name</th>
                                <th>DoB</th>
                                <th>Gender</th>
                                <th>Current Location</th>
                            </tr>
                            <tbody id="usersPage-data">
            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`)
            

        $('#userSearch').change((e)=>{
            console.log(e.target.value);
            usersPageData(e.target.value);
        });
        $('#resetSearch').click(()=>resetData())
        function resetData(){
            $('#userSearch').val('');
            usersPageData('');
        }
        let a=''
        function usersPageData(name){
            // console.clear()
        
            document.getElementById('usersPage-data').innerHTML=``
            $.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${name}`,function(data){
                for(let i of data){
                    document.getElementById('usersPage-data').innerHTML+=`<tr>
                                <td class="lignt-color"> ${i.id} </td>
                                <td class="dark-color"><img src="${i.profilePic}" alt="profile pic">  </td>
                                <td class="dark-color"> ${i.fullName}</td>
                                <td class="lignt-color"> ${i.dob.split('-').join(' ')} </span>
                                <td class="lignt-color"> ${i.gender} </td>
                                <td class="dark-color"> ${i.currentCity+','+i.currentCountry} </td>
                            </tr>`

                }
            })

        }
        usersPageData(a)

    }


})

