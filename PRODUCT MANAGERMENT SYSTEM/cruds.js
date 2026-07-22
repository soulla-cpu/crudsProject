let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let mood = 'create';
let tmp; //fictitious variable
//get total
function getTotal(){  //check html file
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value; //like this we turn inputs (which is string) to numbers
        total.innerHTML=result;
        total.style.background='#134413';
    }
    else{
        total.innerHTML=' ';
        total.style.background='#3e160c'
    }
}
//create product
let dataPro;
if(localStorage.product != null){         //save local storage
    dataPro= JSON.parse(localStorage.product)
}else{
    dataPro=[];
}
  //if we just write objects without array, the previous datas will be removed
submit.onclick=function(){  //this is the function that we creates a new product
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,  //its not input so ofc we wont write value
        count:count.value,
        category:category.value.toLowerCase(),
    }
    //count 
    if(title.value !='' && price.value !=''&& category.value !=''&& newPro.count<100){
        if(mood ==='create'){
            if(newPro.count > 1 ){
                for(let i=0; i < newPro.count;i++){
                    dataPro.push(newPro);}
            }
            else{
            dataPro.push(newPro);}     //Push adds an object in the end of my array so my datas be saved without getting deleted after adding new datas
        }
        else{
            dataPro[tmp]=newPro;
            mood='create';
            submit.innerHTML='Create';
            count.style.display= 'block';
        }
        clearData()
    }
  
    //save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro))  //we cant add array to the local storage cuz it only accepts string
    showData()}
//clear inputs
function clearData(){
    title.value = '',
    price.value = '',
    taxes.value = '',
    ads.value = '',
    discount.value = '',
    total.innerHTML = '',
    count.value = '',
    category.value = '';
}
//read
function showData(){
    getTotal()
    let table='';
    for(let i=0;i<dataPro.length;i++){
        table+=`<tr>
           <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteOneData(${i})" id="delete">Delete</button></td>
            </tr>`;
    }
    document.getElementById('tbody').innerHTML=table;
    //do i have data? if yes then show this part if not then ignore it
    let btnDelete = document.getElementById('deleteAll');
    if( dataPro.length>0){
        //make sure if there are datas if yes then put buttons in its html file
        btnDelete.innerHTML=`        
        <button onclick="deleteAll()" >Delete All (${dataPro.length})</button>  //count
  `
    }
    else{
        btnDelete.innerHTML='';
    }
}
showData()
//delete
function deleteOneData(i){
    dataPro.splice(i,1); //cuts the i and 1 item
    localStorage.product = JSON.stringify(dataPro); //this deletes also from the local storange
    showData()
}
//delete all function
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0) //0 is enought it will delete all the datas
    showData() //refreshes the deletion

}
//update 
function updateData(i){
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    getTotal()
    count.style.display='none';
    category.value=dataPro[i].category;
    submit.innerHTML='Update';
    mood='update'
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth",  //smoothly moves us to the beggining of the page
    })
}
//search 
let searchMood = 'title';  //this function is to choose if we are searching by title or by category and also changes whats written in the placeholder
function getSearchMood(id){
    let search = document.getElementById('search');
    if(id=='seachTitle'){
        searchMood = 'title';
    }else{
        searchMood='category';
    }
    search.placeholder = 'Search By '+ searchMood;
    search.focus()
    search.value='';
    showData()
}
function searchData(value){
    let table='';
    for(let i=0; i<dataPro.length;i++){
        if(searchMood=='title'){
                if(dataPro[i].title.includes(value.toLowerCase())){
                    table+=`<tr>
            <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteOneData(${i})" id="delete">Delete</button></td>
                </tr>`;
                }
        }
        else{
                if(dataPro[i].category.includes(value.toLowerCase())){
                    table+=`<tr>
            <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">Update</button></td>
                <td><button onclick="deleteOneData(${i})" id="delete">Delete</button></td>
                </tr>`;
                }
        }
    }
    document.getElementById('tbody').innerHTML=table;
}
//clean data
