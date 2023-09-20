var socket = io.connect("128.101.166.39:7777");

function daySlide(){
    if(document.getElementById('dayI').value != null && document.getElementById('dayI').value > 0 && document.getElementById('dayI').value <= 42) {
        document.getElementById("slide1").style.marginLeft = "-10vw";
        document.getElementById("slide2").style.marginLeft = "0";
        document.getElementById("recipesCont").innerHTML = "";
        for(var i=0;i<document.getElementById('dayI').value;i++) {
            document.getElementById("recipesCont").innerHTML += `<div class="recipeCont">
                                                                    <button onclick="addRecipe(${i})" class="addRecipe" id="addRecipe${i}">Add  Recipe ${i+1}</button>
                                                                    <div id="singleRecipeCont${i}" style="display: none">
                                                                        <input type="text" placeholder="Search Recipe" onfocus="showRecipes(${i});" onfocusout="hideRecipes(${i});" onkeyup="filterFunction(${i})" class="recipeSearchBox" id="recipeSearchBox${i}">
                                                                        <ul id="loadRecipeCont${i}" class="recipeList" style="display: none;">
                                                                        </ul>
                                                                    </div>
                                                                </div>`
        }
    }
}

function backSlide1() {
    document.getElementById("slide1").style.marginLeft = "0";
    document.getElementById("slide2").style.marginLeft = "100vw";
}

function backSlide2() {
    document.getElementById("slide2").style.marginLeft = "0";
    document.getElementById("slide3").style.marginLeft = "100vw";
}

function addRecipe(boxNum) {
    recipeCont = document.getElementById("singleRecipeCont" + boxNum);
    document.getElementById("addRecipe" + boxNum).style.display = "none";
    recipeCont.style.display = "block"; 
    recipeCont.focus();
}

function filterFunction(boxNum) {
    var input = document.getElementById("recipeSearchBox"+boxNum).value.toUpperCase();
    var availableRecipes = document.getElementsByClassName("recipeOpL"+boxNum);
    for(var i = 0; i<availableRecipes.length;i++){
        var txtValue = availableRecipes[i].textContent || availableRecipes[i].innerText;
        if (txtValue.toUpperCase().indexOf(input) > -1) {
            availableRecipes[i].style.display = "";
          } else {
            availableRecipes[i].style.display = "none";
          }
    }

}

function showRecipes(boxNum) {
    socket.emit("getRecipes", boxNum);
}

socket.on("recieveRecipes", function(recipes, boxNum) {
    var recipeList = document.getElementById("loadRecipeCont"+boxNum);
    recipeList.innerHTML = "";
    for(var i = 0;i<recipes.length;i++) {
        recipeList.innerHTML += `<li class="recipeOpL${boxNum}" onclick="fillSearch('${recipes[i]}', ${boxNum});">${recipes[i]}</li>`
    }
    recipeList.style.display = "block";
});

function fillSearch(foodName, boxNum) {
    document.getElementById("recipeSearchBox"+boxNum).value = foodName;
    hideRecipes(boxNum);
}

function hideRecipes(boxNum) {
    setTimeout(function(){
        document.getElementById("loadRecipeCont"+boxNum).style.display = "none";
    }, 200);
}

function generateLists(){
    document.getElementById("slide2").style.marginLeft = "-10vw";
    document.getElementById("slide3").style.marginLeft = "0";
}
