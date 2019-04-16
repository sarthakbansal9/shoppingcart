$(() => {
    
    function refreshList() {
      $.get('/vendor', (data) => {
        $('#vendors').empty()
  
        function deletevendor(id)
    {
        // $.delete('/vendor/:${id}')
        alert("U called delete function")
    }
  
        for (let vendor of data) {
          $('#vendors').append(
            `<li> ${vendor.name} <button id = ${vendor.id} >delete </button>  </li>`  
          )
          $("button").click(function(){
            jQuery.ajax({
                url: '/vendor/'+this.id,
                type: 'DELETE',
                success: function(data) {
                   refreshList();
                }
            });
            
        })
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
    $('#addvendor').click(function(){
        
        if(check($('#vendor').val()))
         {
            $.post('/vendor',
            {
                name:$('#vendor').val()
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