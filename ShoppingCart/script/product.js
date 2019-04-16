$(() => {
    
    function refreshList() {
      $.get('/vendor', (data) => {        
        $("#productlist").empty();
        $('#vendors').empty()
        for (let vendor of data) {
          $('#vendors').append(
            `<option id = "${vendor.id}"> ${vendor.name}   </option>`  
          ) 
        }  
      })
      $.get('/product',(data)=>{
        for (let product of data) {
            $('#productlist').append(
              `<li> ${product.name}  </li>`  
            )
        }
      })
    }
    refreshList();
    
    function check(inp)
    {
        if(inp ==='')
        return false;
        else
        return true;
    }
    $('#addproduct').click(function(){
        
        if(check($('#product').val()))
         {
            $.post('/product',
            {
                name:$('#product').val(),
                vendorId : $('#vendors option:selected').attr("id"),
                price:$("#price").val()
            },
            (data) => {
                if (data.success) {
                  refreshList();
                } else {
                  alert('Some error occurred')
                }
            })
         }
         else
         {
             alert("please give some input");
         }
        
    })
})