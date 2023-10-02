
function expand(lbl){
    const getID = lbl.getAttribute("for");
    const elem = document.getElementById(getID);
    document.getElementById(getID).classList.add("newFormat");
    elem.style.height = "45px";
    elem.style.transition = "all .65s";
}