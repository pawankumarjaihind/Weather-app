const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();

const weatherData = require('../src/utils/weatherData');

const port = process.env.PORT || 3000;

const publicStaticDirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicStaticDirPath));

app.get('/',(req,res)=>{
    res.render('index',{
        title : 'WEATHER APP',
        name : 'PAWAN KUMAR'
    })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'ABOUT',
        name : 'PAWAN KUMAR'
    })
});

app.get('/contact',(req,res)=>{
    res.render('contact',{
        title : 'CONTACT US',
        name : 'PAWAN KUMAR'
    })
})


app.get('/formsubmitted',(req,res)=>{
    res.render('formsubmitted',{
        title : 'Thanks!',
        name : 'PAWAN KUMAR'
    })
})


app.get('/weather', (req,res)=>{
    const address = req.query.address;
    if(!address){
        return res.send({
            error : " You must enter address in search text box"
        })
    }

    weatherData(address, (error, {cityName ,temperature ,feels_like ,temp_min ,temp_max ,pressure ,humidity ,windspeed ,description}={})=> {
        if(error){
            return res.send({
                error
            })
        }
        res.send({
            cityName ,
            temperature ,
            feels_like ,
            temp_min ,
            temp_max ,
            pressure ,
            humidity ,
            windspeed ,
            description
        })
    });
});

app.get('*',(req,res)=>{ 
    res.render('404',{
        title : "ERROR 404",
        error : "PAGE NOT FOUND",
        name : "PAWAN KUMAR"
    })
})

app.listen(port, () => {
    console.log("Server is up and running on port", port);
});

