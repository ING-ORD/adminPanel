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
    var day__tool = CreateElementHTML("div","",{ "class":"content-block-day__tool"});
    var block__text = CreateElementHTML("div","Группа",{"class":"content-block__text"});
    var contentBlock = CreateElementHTML("div",block__text.outerHTML,{"class":"content-block"});
    var daysItems = CreateElementHTML("div","",{"class":"wrap-days-items"});

    ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"].forEach(function(item) {
        var days__text = CreateElementHTML("div",item,{"class":"day-items"});
        contentBlock.innerHTML += CreateElementHTML("div",day__tool.outerHTML + days__text.outerHTML + daysItems.outerHTML,{"class":"content-block-day"}).outerHTML;
    });

    return contentBlock;
}

function createEll_DaysItems(){
    items = CreateElementHTML("div","1",{"class":"days-items"})
    return items
}

function ajaxSeccess(data){
    var answer = data;
    document.querySelector(".block-header__text").innerHTML ="(PHP REQUEST:"+answer+")"
}

function ajaxRequest(){
			$.ajax({
				url: "bin/php/ajaxAnswer.php",
				type:"POST",
				data: "REQUEST1" ,
				datatype: "html",
				success: ajaxSeccess
			});
			// console.log(parametrs);
		}

/*$(document).ready(function () {*/
    $(".block-header__adder-bd").click(function(){
        $(".wrap-content-block").append(createEll_ContentBlock());
        onClickDayTool()
        ajaxRequest()
    });
function onClickDayTool(){
    $(".content-block-day__tool").off("click");
    $(".content-block-day__tool").click(function(){
        this.parentElement.querySelector(".wrap-days-items").innerHTML += createEll_DaysItems().outerHTML;
        ajaxRequest()
    });
  }
/*});*/
