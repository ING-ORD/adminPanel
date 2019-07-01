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
function createEll_ContentBlock (){
    // var block__tool = CreateElementHTML("div","",{"class":"content-block__tool"})
    var day__tool = CreateElementHTML("div","",{ "class":"content-block-day__tool"});
    var block__text = CreateElementHTML("div",GROUPNAME,{"class":"content-block__text"});
    var contentBlock = CreateElementHTML("div",block__text.outerHTML,{"class":"content-block"});
    var daysItems = CreateElementHTML("div","",{"class":"wrap-days-items"});

    ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"].forEach(function(item) {
        var days__text = CreateElementHTML("div",item,{"class":"day-items"});
        contentBlock.innerHTML += CreateElementHTML("div",day__tool.outerHTML + days__text.outerHTML + daysItems.outerHTML,{"class":"content-block-day"}).outerHTML;
    });

    return contentBlock;
}


function createEll_DaysItems(vall){
    var vall = vall || ""
    var input = CreateElementHTML("input","",{"class":"days-items__input"})
    input.defaultValue = vall
    var items__tool = CreateElementHTML("div","",{"class":"days-items__tool"})
    var items = CreateElementHTML("div",items__tool.outerHTML + input.outerHTML,{"class":"days-items"})
    return items
}

function ajaxPUSHSeccess(data){
    alert(data);
    
    // var answer = data;
    // document.querySelector(".block-header__text").innerHTML ="(PHP REQUEST:"+answer+")"
}

function ajaxPULLSeccess(data){
    data = JSON.parse(data);
    GROUPNAME = data["group"];
    $(".wrap-content-block").append(createEll_ContentBlock());
    onClickDayTool();
    onClickDayItemsTool();
    lesson = document.querySelectorAll(".content-block-day")
    for (var i = 0;i<lesson.length;i++){
        // for (var j = 0;j<Object.keys(data).length;j++){
            if (i in data){
                // alert(i +" "+ data)
                alert(data[i])
                lesson[i].innerHTML = CreateElementHTML("div",data[i],{"class":"days-items__text"}).outerHTML
            }
            // alert(i in data)
        // }
    }
}

//ajax push request in the server
function ajaxPUSH(){
    var PUSH = {};
    var group = document.querySelectorAll(".content-block")
    for (var i = 0; i<group.length; i++){
        var nameGroup = group[i].querySelector(".content-block__text").innerText;
        PUSH["group"] = nameGroup;
        var day = group[i].querySelectorAll(".content-block-day")
        for (var j = 0;j<day.length; j++){
            var lessons = day[j].querySelectorAll(".days-items__text");
            var lesson = [];
            for (var k = 0;k<lessons.length; k++){
                
                lesson[k] = lessons[k].innerText;
            }
            PUSH[j] = lesson;
        }
        
        $.ajax({
            url: "bin/php/ajaxPUSH.php",
            type:"POST",
            data: PUSH ,
            datatype: "json",
            success: ajaxPUSHSeccess
        });
    }

    
    // console.log(parametrs);
};

function ajaxPULL(){
    $.ajax({
        url: "bin/php/ajaxPULL.php",
        type:"POST",
        success: ajaxPULLSeccess
    });
};
/*$(document).ready(function () {*/
// ajaxPULL()
var GROUPNAME = "ССА 18-11-2"
function onClickPopUP(){
    $(".pop-up__blur").click(function(){
        GROUPNAME = document.querySelector(".pop-up__input").value
        document.querySelector(".wrap-pop-up").innerHTML = "";
        $(".wrap-content-block").append(createEll_ContentBlock());
        onClickDayTool();
    });
}

function createEll_popUP(){
    var blur = CreateElementHTML("div","",{"class":"pop-up__blur"});
    var text = CreateElementHTML("div","Группа",{"class":"pop-up__text"});
    var input = CreateElementHTML("input","",{"class":"pop-up__input"}); 
    var inner_popUP = CreateElementHTML("div",text.outerHTML + input.outerHTML,{"class":"inner-pop-up"});
    var html = CreateElementHTML("div",blur.outerHTML + inner_popUP.outerHTML,{"class":"pop-up"});
    return html
}


$(".block-header__add").click(function(){
    $(".wrap-pop-up").append(createEll_popUP());
    onClickPopUP();
    
});

$(".block-header__save").click(function(){
    ajaxPUSH()
});

ajaxPULL()
function onClickDayTool(){
    $(".content-block-day__tool").off("click");
    $(".content-block-day__tool").click(function(){
        if(!this.parentElement.querySelector(".days-items__input")){
            this.parentElement.querySelector(".wrap-days-items").innerHTML += createEll_DaysItems().outerHTML;
            onClickDayItemsTool()
        }
        
    });
};

function onClickDayItemsTool(){
    $(".days-items__tool").off("click");
    $(".days-items__tool").click(function(){
        if (this.parentElement.querySelector(".days-items__input").value != ""){
            this.parentElement.innerHTML = CreateElementHTML("div",this.parentElement.querySelector(".days-items__input").value,{"class":"days-items__text"}).outerHTML;
            onClickDayItemsText()
        }
    });
};

function onClickDayItemsText(){
    $(".days-items__text").off("click");
    $(".days-items__text").dblclick(function(){
        this.parentElement.innerHTML = createEll_DaysItems(this.innerText).outerHTML;
        onClickDayItemsTool()
    });
    
}