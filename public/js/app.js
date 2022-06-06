
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
const messageThree=document.querySelector('#message-3')

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

weatherform.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent='Loading...';
    messageTwo.textContent="";
    messageThree.textContent="";
   
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if (data.error)
                messageOne.textContent=data.error;
            else {
                messageOne.textContent = "Temperature : "+(data.temperature - 273.5).toFixed(2) + String.fromCharCode(176) + "C";
                messageTwo.textContent = "Description : " + data.description;
                messageThree.textContent = "Date : " + new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3) ;
            }
        });
    });
});