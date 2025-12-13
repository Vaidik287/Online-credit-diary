// let UserItems = localStorage.getItem('UserItems');
// resetItems(UserItems);

// function resetItems(UserItems){
//     diaryItem = UserItems ? JSON.parse(UserItems) : {
//         item: inputValue,
//         date: dateValue,
//         price: priceValue
//     }
// }

let diaryItem = JSON.parse(localStorage.getItem('UserItems')) || [];

function addItem() {
    let inputItem = document.querySelector('#input-btn');
    let dateItem = document.querySelector('#date-btn');
    let priceItem = document.querySelector('#price-btn');
    let inputValue = inputItem.value;
    let dateValue = dateItem.value;
    let priceValue = priceItem.value;
    diaryItem.push({ item: inputValue, date: dateValue, price: priceValue});
    inputItem.value = '';
    dateItem.value = '';
    priceItem.value = '';

    containerItems();
}

let currency = '₹';

function containerItems() {
    let containerItem = document.querySelector('#userinput');
    let newHtml = '';
    for (let i = 0; i < diaryItem.length; i++) {

        let { item, date, price } = diaryItem[i];
        newHtml += `
        <div style="font-size:10px;">
        <span style="font-size:2em;" >${item}</span>
        <span style="font-size:2em; padding:0px 10px;">${date}</span>
        <span style="font-size:2em; padding-right:6px;">${currency}${price}</span>
        <button id="delete" onclick="diaryItem.splice(${i}, 1); containerItems();" style="border: none; background-color:#ff4141; border-radius:30px; height:25px; width:56px; color:white;">Delete</button>
        </div>
        `;
    }

    containerItem.innerHTML = newHtml;
    localStorage.setItem('UserItems', JSON.stringify(diaryItem));
}