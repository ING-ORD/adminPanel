
ajaxPULL()


function createEll_ID (vall) {
    defaultVall = vall || ""
    var save = CreateElementHTML("div","Save",{"class":"id__save"});
    var cancel = CreateElementHTML("div","Cancel",{"class":"id__cancel"});
    var input = CreateElementHTML("input","",{"class":"id__input"});
    input.defaultValue = defaultVall;
    var html = CreateElementHTML("div",save.outerHTML + input.outerHTML + cancel.outerHTML,{"class":"id"})
    return html.outerHTML
}

function createEll_IDText(vall){
    var text = CreateElementHTML("div",vall,{"class":"id__text"})
    return text.outerHTML
}

function ajaxPUSH(e,del){
    var is_del = del || false;
    var who_html = findAncestorTarget(e,"item__items");
    var who = who_html.getAttribute("data-who-is");
    if (e.path[1].querySelector(".id__input")){
        var what = e.path[1].querySelector(".id__input").value;
    }else {
        var what = e.target.innerText;
    }
    console.log(what);
    // $.ajax({
    //     url: "bin/php/ajaxPUSH.php",
    //     type:"POST",
    //     data: {
    //         who:who,
    //         what:what,
    //         is_del:is_del
    //     } ,
    //     datatype: "json",
    //     success:answer
    // });
}

function ajaxPULL(){
    var id = document.querySelectorAll(".item__items")
    id.forEach( items =>{
        var who = items.getAttribute("data-who-is");
        $.ajax({
            url: "bin/php/ajaxPULL.php",
            type:"POST",
            data: {
                who:who
            } ,
            datatype: "json",
            success:answer
        });
    })
}

function answer(data){
    var data = JSON.parse(data);
    for (var i = 0;i<data.length;i++){
        alert(data[i])
    }
    // alert(JSON.parse(data).length);
}

document.querySelector(".content-block").addEventListener("click",function(e){
    if (e.target.classList.contains("item__add")){
        if (!e.path[1].querySelector(".id")){
            e.path[1].querySelector(".item__items").innerHTML += createEll_ID();
        }
    }

    if(e.target.classList.contains("id__save")){
        if(e.path[1].querySelector(".id__input").value != ""){
            vall = e.path[1].querySelector(".id__input").value
            e.path[1].outerHTML = createEll_IDText(vall);
            ajaxPUSH(e);
        }
    }

    if (e.target.classList.contains("id__cancel")){
        e.path[1].outerHTML = "";
    }
});

document.querySelector(".content-block").addEventListener("dblclick",function(e){
    if (e.target.classList.contains("id__text")){
        ajaxPUSH(e,true)
        vall = e.target.innerText;
        e.target.outerHTML = createEll_ID(vall)
    }
});
