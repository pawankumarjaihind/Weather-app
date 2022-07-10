
const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
const messageThree=document.querySelector('#message-3')
const messageFour=document.querySelector('#message-4')
const messageFive=document.querySelector('#message-5')
const messageSix=document.querySelector('#message-6')
const messageSeven=document.querySelector('#message-7')
const messageEight=document.querySelector('#message-8')
const messageNine=document.querySelector('#message-9')
const messageTen=document.querySelector('#message-10')

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

weatherform.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent='Loading...';
    messageTwo.textContent="";
    messageThree.textContent="";
    messageFour.textContent="";
    messageFive.textContent="";
    messageSix.textContent="";
    messageSeven.textContent="";
    messageEight.textContent="";
    messageNine.textContent="";
    messageTen.textContent="";
    
   
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            console.log(data);
            if (data.error)
                messageOne.textContent=data.error;
            else {
                messageOne.textContent =  " City Name : "+(data.cityName);
                messageTwo.textContent = " Temperature : "+(data.temperature - 273.5).toFixed(2) + String.fromCharCode(176) + "C";
                messageThree.textContent = " Feels Like : "+(data.feels_like - 273.5).toFixed(2) + String.fromCharCode(176) + "C";
                messageFour.textContent =" Min Temperature : "+(data.temp_min - 273.5).toFixed(2) + String.fromCharCode(176) + "C";
                messageFive.textContent = " Max Temp : "+(data.temp_max - 273.5).toFixed(2) + String.fromCharCode(176) + "C";
                messageSix.textContent = " Pressure : " + data.pressure;
                messageSeven.textContent = " Humidity : " + data.humidity + "%";
                messageEight.textContent = " Wind Speed :"+(data.windspeed) +" Km/h";
                messageNine.textContent = " Description : "+(data.description);
                messageTen.textContent = " Date : " + new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3) ;

            }
        });
    });
});