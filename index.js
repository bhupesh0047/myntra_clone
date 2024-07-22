let bagItems=[];
onLoad();

function onLoad(){
    let bagItemsStr=localStorage.getItem('bagItems');
    bagItems=bagItemsStr ? JSON.parse(bagItemsStr) :[];

    displayOnHomepage();
    displayIcon();
}

function addToBag(itemId){
    let btnElement=document.querySelector('.btn-bag');
    bagItems.push(itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    displayIcon();
}

function displayIcon(){
    let bagIconElement=document.querySelector('.count');
    if(bagItems.length>0){
        bagIconElement.style.visibility='visible';
        bagIconElement.innerText=bagItems.length;
    }
    else{
        bagIconElement.style.visibility='hidden';
    }
}

function displayOnHomepage(){
    let itemsContainerElement=document.querySelector('.items-container');
    if(!itemsContainerElement){
        return;
    }
    let newHtml='';
    items.forEach(item=>{
        newHtml+=`
    <div class="item-container">
        <img src="${item.image}" class="item-img" alt="image">
        <div class="rating">${item.rating.stars}⭐|${item.rating.count} </div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price">
            <span class="current-price">Rs. ${item.current_price} </span>
            <span class="org-price">Rs. ${item.original_price}</span>
            <span class="discount">${item.discount_percentage}% OFF </span>
        </div>
        <button class="btn-bag" onclick="addToBag(${item.id})">Add to Bag </button>
    </div>`
    });
    
    itemsContainerElement.innerHTML=newHtml;
}


