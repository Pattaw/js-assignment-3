let siteName = document.getElementById("siteName");
let siteUrl = document.getElementById("siteUrl");
let tbody = document.getElementById("tableContent");
let submit = document.querySelector(".submit");
let update = document.querySelector(".update")
let clearAll = document.querySelector(".clearAll");
let search = document.querySelector("#search")

let arr = localStorage.getItem("website") ? JSON.parse(localStorage.getItem("website")) : [];

for(let i =0;i<arr.length;i++){
    displayProducts(arr);
}



submit.addEventListener("click",function(e){
    e.preventDefault()
    if(siteName.value !== "" && siteUrl.value !== ""){
        addElement();
        emptyInputs()
    }
   
})


function addElement(){
        if(validSiteName() && validSiteURL()){
            let item = {
                id : Date.now(),
                name : siteName.value,
                url :siteUrl.value
            }
            arr.push(item)
            displayProducts(arr)
            addItemsToLocalStorage(arr)
        }
}



function displayProducts(arr){
    let productContainer= "";
    for(let i = 0 ;i<arr.length;i++){
        productContainer+=`
        <tr class="text-center">
        <td>${i+1}</td>
        <td>${arr[i].name}</td>
        <td><button class="btn btn-outline-success update" onclick = updateProduct(${i})>update</button></td>
        <td><button class="btn btn-outline-danger delete" onclick = deleteProduct(${i})>delete</button></td>
        <td><button class="btn btn-outline-danger visit" onclick = visitProduct(${i})>visit</button></td>
    </tr>
        `
    }
    tbody.innerHTML = productContainer
    
}


function updateProduct(i){
    siteName.value = arr[i].name;
    siteUrl.value = arr[i].url;

   submit.classList.replace("d-block","d-none");
   update.classList.replace("d-none","d-block");


  update.onclick = function(){ //لما بعمل ادد اينفت ليستنر بتحصل مشكله غريبه

    arr[i].name = siteName.value;
    
    arr[i].url = siteUrl.value;
    console.log(arr[i].url);
    
    
    addItemsToLocalStorage(arr);
    displayProducts(arr);
    emptyInputs();

    submit.classList.replace("d-none","d-block");
    update.classList.replace("d-block","d-none");

  }
 
}

function deleteProduct(i){
    arr.splice(i,1);
    displayProducts(arr);
    addItemsToLocalStorage(arr)
}

function visitProduct(i){
    window.open(`https://${arr[i].url}`);
    
}

search.oninput = function(){
  
        searchProducs()
   
    
}

function searchProducs(){
let newArr= [];

for(let i =0;i<arr.length;i++){
    if(arr[i].name.toLowerCase().includes(search.value.toLowerCase())){

        newArr.push(arr[i]);
   
    }
}
tbody.innerHTML = "";
}


function validSiteName() {
    var regex = /^[a-zA-Z]+$/g;

    debugger;
    if (regex.test(siteName.value)) {
      siteName.classList.replace("is-invalid","is-valid")
      
      return true;
    } else {
     siteName.classList.replace("is-valid","is-invalid")
    
      return false;
    }
  }
function validSiteURL() {
    var regex =
      /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm;
   
    if (regex.test(siteUrl.value)) {
     siteUrl.classList.replace("is-invalid","is-valid")
    
      return true;
    } else {
        siteUrl.classList.replace("is-valid","is-invalid")
      return false;
    }
  }

clearAll.addEventListener("click",function(){
    clear()
})
function clear(){
    localStorage.clear();
    tbody.innerHTML = ""
}

function emptyInputs(){
    siteName.value = "";
    siteUrl.value = "";
}

function addItemsToLocalStorage(arr){
    localStorage.setItem("website",JSON.stringify(arr))
}
