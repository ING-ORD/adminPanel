function CreateElementHTML(tag,text,attributes){
    var is_atr = ["class","id","name","src","alt"];
    var html = document.createElement(tag);
    html.innerHTML = text;
    for (var key in attributes){
        if(is_atr.indexOf(key)!=-1){
           html.setAttribute(key,attributes[key])
        }
    }
    return html;
};


$(document).ready(function () {
    $(".addDateBase").click(function(){
        $(this).slideUp(function(){
            $(".container").append(CreateElementHTML("div","new block",{"class":"dd"}))
        });
    });
});