function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
};

function findAncestorTarget(el,cls){
    for (var i = 0;i<el.path.length;i++){
        var ell = el.path[i];
        if (ell.classList.contains(cls)){
            return ell;
        }
    }
    return el;
};

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
