var startCounter = false;
document.getElementById("newUrl").href = newUrl;
setTimeout(function() {document.getElementById("overlay").style.opacity = 1; startCounter = true;}, 500);


var interval = setInterval(function() {
    if (!startCounter) {return;}
    var div = document.querySelector("#countdown");
    var count = div.textContent * 1 - 1;
    div.textContent = count;
    if (count <= 0) {
        redirect();
    }
}, 1000);

function redirect() {
    window.location.replace(newUrl);
}

function cancelRedirect() {
    clearInterval(interval);
    document.getElementById("redirectNotice").textContent = "Redirect cancelled.";
    document.getElementById("overlay").style.opacity = 0;
    setTimeout(function() {document.getElementById("overlay").style.display = "none";}, 2000)
}