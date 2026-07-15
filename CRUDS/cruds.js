let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');

console.log(title, price, taxes, ads, discount, total, count, category, submit)
//get total
function getTotal(){  //check html file
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value; //like this we turn inputs (which is string) to numbers
        total.innerHTML=result;
        total.style.background='#040';
    }
    else{
        total.innerHTML=' ';
        total.style.background='#a00d02'
    }
}
//create product
//save local storage
//clear inputs
//read
//count
//delete
//update
//search 
//clean data
