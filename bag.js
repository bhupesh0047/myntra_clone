let bagItems2=[];
onLoad2();

function onLoad2(){
    loadBagItems();
    displayOnHomepage2();
    displayBagSummary();
}
function loadBagItems(){
  bagItems=bagItems.reverse();
  bagItems2=bagItems.map(itemId=>{
    for(let i=items.length-1; i>=0; i--){
      if(itemId==items[i].id)
        return items[i];
    }
  });
}
function removeItem(itemId2){
  bagItems=bagItems.filter(bagItemId=> bagItemId!==itemId2);
  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  bagItems=bagItems.reverse();
  loadBagItems();
  displayIcon();
  displayOnHomepage2();
  displayBagSummary();
}
function displayOnHomepage2(){
    let itemsContainerElement2=document.querySelector('.bag-items-container');
  
    if(!itemsContainerElement2){
        return;
    }
    let newHtml2= '';
    bagItems2.forEach(bagItem=>{
      newHtml2 += generateHtml(bagItem);
    });
    itemsContainerElement2.innerHTML=newHtml2;  
}
function generateHtml(item){
  return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company} </div>
              <div class="item-name">${item.item_name} </div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price} </span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage} % OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>
      
            <div class="remove-from-cart" onclick="removeItem(${item.id} )">X</div>
          </div>`;
}
function displayBagSummary(){   
  let bagSummaryElement=document.querySelector('.bag-summary');
  
  bagSummaryElement.innerHTML=`<div class="bag-details-container">
        <div class="price-header">PRICE DETAILS (${bagItems.length} Items) </div>
        <div class="price-item">
          <span class="price-item-tag">Total MRP</span>
          <span class="price-item-value">₹${orginalPriceCalculator()}</span>
        </div>
        <div class="price-item">
          <span class="price-item-tag">Discount on MRP</span>
          <span class="price-item-value priceDetail-base-discount">-₹${discountCalculator()}</span>
        </div>
        <div class="price-item">
          <span class="price-item-tag">Convenience Fee</span>
          <span class="price-item-value">₹${convenienceFee()} </span>
        </div>
        <hr>
        <div class="price-footer">
          <span class="price-item-tag">Total Amount</span>
          <span class="price-item-value">₹${(orginalPriceCalculator()-discountCalculator()+convenienceFee())} </span>
        </div>
      </div>
      <button class="btn-place-order">
        <div class="css-xjhrni" >PLACE ORDER</div>
      </button>`;
}
function orginalPriceCalculator(){
  let toatlMrp=0;
  bagItems2.forEach(item=>{
    toatlMrp+=item.original_price;
  });
  return toatlMrp;
}
function discountCalculator(){
  let discount=0;
  bagItems2.forEach(item=>{
    discount+=((item.discount_percentage/100)*item.original_price);
  });
  return discount;
}
function convenienceFee(){
  if(bagItems.length===0)
    return 0;
  else
    return 99;
}
