
//=====Загрузка страницы==
var GROUPNAME = "";
ajaxPULL();
//============END=============

//=========================BLOCK-HEADER=========================
//Клик
document.querySelector(".block-header").addEventListener("click",function(e){
    if(e.target.classList.contains("block-header__add")){
        $(".wrap-pop-up").append(createEll_popUP());
        onClickPopUP();
    }
})
//==============================END=============================

//===================WRAP-CONTENT-BLOCK=========================
//Клик
document.querySelector(".wrap-content-block").addEventListener("click",function(e){
  if(e.target.classList.contains("days-items__tool")){
      if (this.parentElement.querySelector(".days-items__input").value != ""){
          this.parentElement.querySelector(".days-items__input").outerHTML =
                            CreateElementHTML("div",this.parentElement.querySelector(".days-items__input")
                            .value,{"class":"days-items__text"}).outerHTML;
          this.parentElement.querySelector(".days-items__tool").outerHTML = "";
          ajaxPUSH(findAncestorTarget(e,"content-block"));
      }
  }

  if (e.target.classList.contains("content-block-day__tool")){

      if(!this.parentElement.querySelector(".days-items__input")){

          $(".wrap-pop-up").append( createEll_popUP( "",() => optionWeekButton(
              {"name":"День недели"},
              {"name":"Предмет"},
              {"name":"Препадаватель"},
              {"name":"Кабинет"}
          ) ) );
          onClickPopUP();
          // ell = findAncestorTarget(e,"content-block-day")
          //
          // ell.querySelector(".wrap-days-items").innerHTML += createEll_DaysItems().outerHTML;
      }
  }
});
//Двойной клик
document.querySelector(".wrap-content-block").addEventListener("dblclick",function(e){
  if(e.target.classList.contains("days-items__text")){
      if (!e.target.parentElement.querySelector(".days-items__input")){
        var input = CreateElementHTML("input","",{"class":"days-items__input"});
        input.defaultValue = e.target.innerText;
        var items__tool = CreateElementHTML("div","",{"class":"days-items__tool"});
        e.target.outerHTML = items__tool.outerHTML + input.outerHTML;
      }
  }
  if (e.target.classList.contains("content-block__text")){
      $(".wrap-pop-up").append(createEll_popUP(e.target.innerText));
      onClickPopUPEditor(e.target);
  }
});
//==============================END=============================

//==============CREATE-ELEMENT=================
function createEll_ContentBlock (){
    // var block__tool = CreateElementHTML("div","",{"class":"content-block__tool"})
    var day__tool = CreateElementHTML("div","",{ "class":"content-block-day__tool"});
    var block__text = CreateElementHTML("div",GROUPNAME,{"class":"content-block__text"});
    var contentBlock = CreateElementHTML("div",block__text.outerHTML,{"class":"content-block"});
    var daysItems = CreateElementHTML("div","",{"class":"wrap-days-items"});

    ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"].forEach(function(item) {
        var days__text = CreateElementHTML("div",item,{"class":"day-items"});
        contentBlock.innerHTML += CreateElementHTML("div",day__tool.outerHTML +
                                                    days__text.outerHTML + daysItems.outerHTML,{"class":"content-block-day"}).outerHTML;
    });

    return contentBlock;
};

function createEll_DaysItems(vall){
    var vall = vall || "";
    var input = CreateElementHTML("input","",{"class":"days-items__input"})
    input.defaultValue = vall
    var items__tool = CreateElementHTML("div","",{"class":"days-items__tool"})
    var items = CreateElementHTML("div",items__tool.outerHTML +
                                    input.outerHTML,{"class":"days-items"})
    return items
};
//====================END======================

//===========AJAX==============
function ajaxPUSHSeccess(data){
    alert(data);

    // var answer = data;
    // document.querySelector(".block-header__text").innerHTML ="(PHP REQUEST:"+answer+")"
};

function ajaxPULLSeccess(data){
    console.log(JSON.stringify(data));
    var data = JSON.parse(data);
    var data_text = "";
    GROUPNAME = data["group"]|| "ошибка";
    $(".wrap-content-block").append(createEll_ContentBlock());
    data = data || {};

    lesson = document.querySelectorAll(".content-block-day")
    for (var i = 0;i<lesson.length;i++){
        data_text = "";
        if (i in data){
            for (var j = 0;j<Object.keys(data[i]).length;j++){
                data_text += CreateElementHTML("div",data[i][j],{"class":"days-items__text"}).outerHTML;
            }
            lesson[i].querySelector(".wrap-days-items").innerHTML =
                                    CreateElementHTML("div",data_text,{"class":"days-items"}).outerHTML;
        }
    }
};

//ajax push request in the server
function ajaxPUSH(ancestor){
    var PUSH = {};
    var group = ancestor
    var nameGroup = group.querySelector(".content-block__text").innerText;
    PUSH["group"] = nameGroup;
    var day = group.querySelectorAll(".content-block-day")
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
    // console.log(parametrs);
};

function ajaxPULL(){
    $.ajax({
        url: "bin/php/ajaxPULL.php",
        type:"POST",
        data: {
            who:"all"
        } ,
        success: ajaxPULLSeccess
    });
};
//=============END=============
//======POP-UP=====
function onClickPopUP(){
    $(".pop-up__blur").click(function(){
        GROUPNAME = document.querySelector(".selector__input").value;
        document.querySelector(".wrap-pop-up").innerHTML = "";
        $(".wrap-content-block").append(createEll_ContentBlock());
    });
};

function onClickPopUPEditor(ell){
    $(".pop-up__blur").click(function(){
        GROUPNAME = document.querySelector(".selector__input").value
        document.querySelector(".wrap-pop-up").innerHTML = "";
        ell.innerText = GROUPNAME;
    });
};

// функция для создания pop up окна,
//     val - значение input'а (для изменений по двойному щелчку, по умолчанию ""),
//     func() - функция дял создания контента(по умалчанию создает один инпут + название{группа} + генерируемое содержимое(список групп совпавших с введенным текстом));
// Я решил внедрить функцию потому что контент может отличаться и тем саммым я делаю создание pop up окна более универсальным
function createEll_popUP(val,func){
    var val = val || "";

    var func = func || function (){

        var text = CreateElementHTML("div","Группа",{"class":"selector__text"});
        var input = CreateElementHTML("input","",{"class":"selector__input"});
        var inputId = CreateElementHTML("div","",{"class":"input-id"});

        // var text = CreateElementHTML("div","Группа",{"class":"pop-up__text"});
        // var input = CreateElementHTML("input","",{"class":"pop-up__input"});
        input.defaultValue = val;
        var selector = CreateElementHTML("div",text.outerHTML + input.outerHTML + inputId.outerHTML, {"class":"selector"});
        selector.setAttribute("data-who-is","group");
        return  selector.outerHTML;
    }

    var blur = CreateElementHTML("div", "", {"class" : "pop-up__blur"} );
    var selector = CreateElementHTML("div", func(), {"class":"pop-up-content"} );
    var html = CreateElementHTML("div",blur.outerHTML + selector.outerHTML,{"class":"pop-up"});

    return html;
}

function optionWeekButton (){
    var html = "";
    for ( var i = 0; i < arguments.length; i++ ){
        obj = arguments[i];
        // var text = CreateElementHTML("div",obj.name,{"class":"pop-up__text"});
        // var input = CreateElementHTML("input","",{"class":"pop-up__input"});

        var text = CreateElementHTML("div",obj.name,{"class":"selector__text"});
        var input = CreateElementHTML("input","",{"class":"selector__input"});
        var inputId = CreateElementHTML("div","",{"class":"input-id"});

        // var inner = text.outerHTML + input.outerHTML + inputId.outerHTML;
        html += CreateElementHTML("div",text.outerHTML + input.outerHTML +
                inputId.outerHTML,{"class":"selector"}).outerHTML;
    }

    return html;
}

//=======END=======
