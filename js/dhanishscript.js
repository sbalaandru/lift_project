// JavaScript Document
$('select[name="option"]').change(function(){
    $('.hidden').hide();
    if(this.value == 1){
        $('select[name="name"]').toggle();
    }
    else if(this.value == 2){
        $('select[name="class"]').toggle();
    }
});
$('select[name="name"]').change(function(){

  if(this.value == 11)
  {
       $('select[name="mohd"]').toggle();
  }
    else
    {
         $('select[name="mohd"]').hide();
    }
        
});

$('select[name="class"]').change(function(){

  if(this.value == 21)
  {
       $('select[name="dhanu"]').toggle();
  }
    else
    {
         $('select[name="dhanu"]').hide();
    }
        
});