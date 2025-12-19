
let diaryItem = JSON.parse(localStorage.getItem('UserItems')) || [];

function addItem() {
    let inputItem = document.querySelector('#input-btn');
    let dateItem = document.querySelector('#date-btn');
    let priceItem = document.querySelector('#price-btn');
    let inputValue = inputItem.value;
    let dateValue = dateItem.value;
    let priceValue = priceItem.value;

    if (inputValue === '' || dateValue === '' || priceValue === '') {
        alert('Add data');
    } else{
        diaryItem.push({ item: inputValue, date: dateValue, price: priceValue});
        inputItem.value = '';
        dateItem.value = '';
        priceItem.value = '';

        containerItems();
    }

    
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

function generatePDF() {

    // jsPDF loaded from CDN script
    const { jsPDF } = window.jspdf;
    
    // get text from userinput in variable
    const element = document.getElementById('userinput');

    // html converted in pixels(canvas) with scale 2 for better quality
    html2canvas(element, { scale: 2 }).then((canvas) => {

        // convert canvas to image because jsPDF only works with images
        const imgData = canvas.toDataURL('image/png');
    
        //creates PDF in portrait, A4 size
        const pdf = new jsPDF("p", "mm", "a4");
    
        //gets width of PDF page in mm and calculates height to maintain aspect ratio
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
        //adds image to PDF in png format at position 0,0 with calculated width and height
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        //saves PDF with name myPDF.pdf 
        pdf.save("myPDF.pdf");
    });
}

//steps to convert HTML to PDF
//1. create function
//2. load jsPDF variable from cdn
//3. get HTML element text
//4. convert HTML to canvas using html2canvas
//5. convert canvas to image
//6. create jsPDF document
//7. calculate width and height to maintain aspect ratio
//8. add image to PDF
//9. save PDF with name