$(function(){
    $(".wx_xiaozu_width span").on("click",function(){
        if($(this).hasClass("wx_allfz")){
            $(".wx_xiaozu_width span").addClass("active");
            if($(this).hasClass("active")){
                $(".wx_xiaozu_width span").removeClass("active");
            }
        }else{
            $(this).toggleClass("active")
        }
    })
    
    $(document).on("click",".wx_div_width span",function(){
        $(this).addClass("active")
    })
    
})