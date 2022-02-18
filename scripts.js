 let imageSrcs=["image-product-1.jpg","image-product-2.jpg","image-product-3.jpg","image-product-4.jpg"];

function nextImage(){
      let currentSrc=document.getElementById("product-images").src;
     let fixedUrl=currentSrc.slice(0,currentSrc.lastIndexOf("/")+1);
     let relativeUrl=currentSrc.slice(currentSrc.lastIndexOf("/")+1);
     let currentIndex=imageSrcs.indexOf(relativeUrl);
      if(currentIndex==3) currentIndex=-1;
      document.getElementById("product-images").src=fixedUrl+imageSrcs[currentIndex+1];
      document.getElementById("counter").textContent=0;    
    }
function prevImage(){
          
          let currentSrc=document.getElementById("product-images").src;
     let fixedUrl=currentSrc.slice(0,currentSrc.lastIndexOf("/")+1);
     let relativeUrl=currentSrc.slice(currentSrc.lastIndexOf("/")+1);
     let currentIndex=imageSrcs.indexOf(relativeUrl);
    if(currentIndex==0) currentIndex=4;
    document.getElementById("product-images").src=fixedUrl+imageSrcs[currentIndex-1];
    document.getElementById("counter").textContent=0;    
}
function quantity (n){
  let count= document.getElementById("counter");
  let num=~~count.innerHTML;
  if(num==0&&n==-1) return;
  count.innerHTML=num+n;
}
function showNavbar(){
    document.getElementById("navbar").style.display="block";
    document.getElementById("body").style.filter="brightness(25%)";
}
function hideNavbar(){
    document.getElementById("navbar").style.display="none";
    document.getElementById("body").style.filter="none";
}
function showCartItems(){
   let cartDisplay= document.getElementById("cart-content");
   if(cartDisplay.style.display=="none"){
      cartDisplay.style.display="block";
    }
   else cartDisplay.style.display="none";
   
     document.getElementById("notification").style.display="";
     document.getElementById("notification").innerHTML=1;
}
let itemDetails=[
{
name:"Autumn limited edition1      ",
src:imageSrcs[0],
amount:250,
discount:50,
newPrice(){
  return  (100-this.discount)/100*this.amount
}
},
{
name:"Autumn limited edition2    ",
src:imageSrcs[1],
amount:230,
discount:45,
newPrice(){
  return  (100-this.discount)/100*this.amount
}
},
{
name:"Autumn limited edition3     ",
src:imageSrcs[2],
amount:270,
discount:40,
newPrice(){
   return (100-this.discount)/100*this.amount
}
},{
name:"Autumn limited edition4     ",
src:imageSrcs[3],
amount:300,
discount:50,
newPrice(){
   return (100-this.discount)/100*this.amount
}
}
];
function showItemDetails(){
    let img=document.getElementById("product-images");
    let imgSrc=img.src.slice(img.src.lastIndexOf("/")+1);
    details=imageSrcs.indexOf(imgSrc);
    
let x=itemDetails[details].newPrice();
    document.getElementById("discount-price").innerHTML="$"+x.toFixed(2);
    document.getElementById("discount").innerHTML=itemDetails[details].discount+"%";
    document.getElementById("old-price").innerHTML=itemDetails[details].amount.toFixed(2);
}
function addItemToCart(){
    if(document.getElementById("counter").
textContent>0){
    img=document.getElementById("product-images");
   imgSrc=img.src.slice(img.src.lastIndexOf("/")+1);
   document.getElementById("cart-p").style.display="none";
   let index=imageSrcs.indexOf(imgSrc);
   let newItem=itemDetails[index];
   let cart=document.getElementById("cart-content");
   let cartItem=document.createElement("div");
   cartItem.style.position="relative";

   cart.appendChild(cartItem);
   let cartImg=document.createElement("img");
   let cartName=document.createElement("p");
   let cartAmount=document.createElement("p");
   cartItem.appendChild(cartImg);
   cartItem.appendChild(cartName);
   cartItem.appendChild(cartAmount);
   cartImg.src=img.src;
   cartImg.style.width="50px";
   cartImg.style.height="50px";
   cartName.textContent=newItem.name;
  cartAmount.textContent=newItem.newPrice().toFixed(2)+"x"+document.getElementById("counter").textContent+"=";
  let total=document.createElement("b");
  cartAmount.appendChild(total);
  total.textContent="$"+document.getElementById("counter").textContent*newItem.newPrice().toFixed(2);
  let deleteIcon=document.createElement("img");
  deleteIcon.src="images/icon-delete.svg";
  deleteIcon.style.width="20px";
  deleteIcon.style.height="20px";
  
  cartItem.appendChild(deleteIcon);
  deleteIcon.onclick=removeFromCart;
     let cartButton=document.createElement("div");
   cartButton.classList.add("btn");
   cartButton.textContent="Checkout";
   cart.appendChild(cartButton);
   document.getElementById("counter").textContent=0;    
   }
}
function removeFromCart (){   
this.parentNode.nextElementSibling.remove();
this.parentNode.remove();
document.getElementById("cart-content").children.length!=4?" ":document.getElementById("cart-p").style.display="block";
}
function showNotification(){
    let notify=document.getElementById("notification");
    let counter=document.getElementById("counter");

    if(!notify.style.display&&counter.innerHTML>0){
        notify.style.display="block";
    }
    else if(counter.innerHTML>0){
        notify.innerHTML=~~notify.innerHTML+1;
    }
}