let appId ='ae60dfc2e98dee7b878de035aae690b5';
let units='imperial';
let searchMethod;

const mymap = L.map('issMap').setView([0, 0],2)

const attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
const tileUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles=L.tileLayer(tileUrl,{attribution});
tiles.addTo(mymap)


function getsearchMethod(searchTerm){
    if(searchTerm ==5 && Number.parseInt(searchMethod)+''==searchMethod){
        searchMethod='zip';
    }
    else{
        searchMethod='q';
    }
}

async function searchWeather(searchTerm){
    getsearchMethod(searchTerm);
    /*fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result=>{return result.json()}).then(result=>{
    console.log(result)*/     
    const response=await fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`);
    const data=await response.json();
    const latitude=data.coord.lat;
    const longitude=data.coord.lon;
    L.marker([latitude,longitude]).addTo(mymap)
    console.log(data)
    /*document.getElementById("latitude").textContent=latitude;
    document.getElementById("longitude").textContent=longitude;
    console.log(latitude);
    console.log(longitude);*/
    init(data);
}
//function onMapClick(e) {
  //  alert("You clicked the map at " + e.latlng);
//}

//mymap.on('click', onMapClick);


function init(resultfromserver){
    /*switch (resultfromserver.weather[0].main){
        case 'Clear':
            document.body.style.backgroundImage='url("clear.jpg")';
            break;
        case 'Clouds':
            document.body.style.backgroundImage='url("clouds.jpg")';
            break;
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage='url("rain.jpg")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage='url("strom.jpg")';
            break;
        case 'Snow':
            document.body.style.backgroundImage='url("snow.jpg")';
            break;
        default:
            break;
    }*/

let weatherDescriptionHeader=document.getElementById('weatherDescriptionHeader');
let temperatureElement=document.getElementById('temperature');
let humidityElement=document.getElementById('humidity');
let windSpeedElement=document.getElementById('windSpeed');
let cityHeader=document.getElementById('cityHeader')
let weatherIcon=document.getElementById('documentIconing')

weatherIcon.src='http://openweathermap.org/img/w/'+resultfromserver.weather[0].icon+'.png';


let resultDescription=resultfromserver.weather[0].description;
weatherDescriptionHeader.innerText=resultDescription.charAt(0).toUpperCase()+resultDescription.slice(1);

temperatureElement.innerHTML=Math.floor(resultfromserver.main.temp)+'&#176';
windSpeedElement.innerHTML=' Winds at '+Math.floor(resultfromserver.wind.speed)+'m/s';
cityHeader.innerHTML=resultfromserver.name;
humidityElement.innerHTML='Humidity levels at '+resultfromserver.main.humidity+'%';
}
document.getElementById('searchBtn').addEventListener('click',()=>{
    let searchTerm=document.getElementById('searchInput').value;
    if(searchTerm){
        searchWeather(searchTerm)
    }
})