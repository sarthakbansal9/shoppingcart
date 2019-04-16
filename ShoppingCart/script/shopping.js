
    function refreshList() {
        $.post('/usershopping',
        {
            name:$("#user").val()
        },(userdata)=>{
            
            if(userdata.success===true)
            {
               
                $.get('/product',(data)=>{
                    console.log(data)
                    $("#shopcardlist").empty();
                    console.log(userdata);
                  for (let product of data) {
                      console.log(product);
                     
                      $('#shopcardlist').append(
                        `<div class="card">
                    <label>Product name  : ${product.name}</label>
                    <br>
                    <label>Product price  : ${product.price}</label>

                        <div class='btns'>
                            <button id = ${product.id} onclick="addToCart(${userdata.id},${product.id})" class="glyphicon glyphicon-plus">add to cart </button>
                        </div>
                    </div>`
                     )
                }
                $("#goto").attr("href","/cart/"+userdata.id)
            })
            }
            else
        {
            alert("we dont get data");
        }})
        
      }
    function check(inp)
    {
        if(inp ==='')
        return false;
        else
        return true;
    }
    function addToCart(userId,productId)
    {
        $.post('/addcart',{
            UserId : userId,
            ProductId : productId
        })
    }

    $("#adduser").click(function(){
      

          if(check($("#user").val()))
          {
                refreshList();
          }
          else
          {
              alert('Please give input for the name of user');
          }
      })

    
