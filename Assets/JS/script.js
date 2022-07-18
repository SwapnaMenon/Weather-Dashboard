var searchinput = document.querySelector(".search-input")//connecting the search-input in line 13 index file//
var searchBTN =  document.querySelector(".searchBTN") //query selector has to know if the varibale os a class// 
var cityname =  document.querySelector(".cityname") //query selector has to know if the varibale os a class// 
var info_container = document.querySelector(".info-container")
var buttonList = document.querySelector(".buttonList")
var searched = [] //empty array//
console.log(moment())
searchBTN.addEventListener("click", function(event){
    

   event.preventDefault()
   console.log(searchinput.value)
   searched.push(searchinput.value)

for (var i=0; i<searched.length;i++){
    localStorage.setItem(i, searched[i])
}
weathercords(searchinput.value)
var btn = document.createElement("button")
btn.classList.add ("col-8")
btn.classList.add ("m-2")
btn.classList.add ("btn")//add colour//
btn.classList.add ("btn-primary")


btn.textContent = searchinput.value
buttonList.appendChild(btn)

}) 
var apikey = "ef5b68397b3625e26d0c9570f5f94dbd"
//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}//
function weathercords (city) {
   //deconstruct the url to access te city // 
   var baseurl = "http://api.openweathermap.org/geo/1.0/direct?q="
   var resturl = "&limit=1&appid="
   fetch(baseurl+city+resturl+apikey)
   .then(function(response){
       response.json()
       .then(function(data){
           console.log(data)
           cityname.textContent=data[0].name;
           getcurrentweather(data[0].lat,data[0].lon)
           getforecast(data[0].lat,data[0].lon)
       })
   })
} //alias for the funtion//

//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

function getcurrentweather(lat,long){
    var baseurl = "https://api.openweathermap.org/data/2.5/onecall?"
    var getlat =  "lat="+ lat
    var getlong = "&lon="+long
    var resturl = "&units=metric&exclude=minutely,hourly,daily,alerts&appid="
    fetch(baseurl+getlat+getlong+resturl+apikey)
   .then(function(response){
       response.json()
       .then(function(data){
           console.log(data)
           displaycurrentweather(data)
       })
   })
}

function displaycurrentweather(data){
    var date = document.querySelector(".date")
    date.textContent= moment().format("MMM Do YY"); 
    var temp=document.querySelector(".temp")
    var humidity=document.querySelector(".humidity")
    var wind=document.querySelector(".wind")
    var uvi=document.querySelector(".uvi")
    temp.textContent= "temp: " + data.current.temp + "C"
    humidity.textContent= "humidity: " + data.current.humidity + "%"
    wind.textContent= "wind speed: " + data.current.wind_speed + "KM/hr"
    uvi.textContent= "uvi: " + data.current.uvi 
}

function getforecast(lat,long){
    var baseurl = "https://api.openweathermap.org/data/2.5/onecall?"
    var getlat =  "lat="+ lat
    var getlong = "&lon="+long
    var resturl = "&units=metric&exclude=minutely,hourly,current,alerts&appid="
    fetch(baseurl+getlat+getlong+resturl+apikey)
   .then(function(response){
       response.json()
       .then(function(data){
           //console.log(data)
           displayforecast(data)
        //    displaycurrentweather(data)
       })
   })
}
var cardContainer= document.createElement("div") 
function displayforecast (data){
    
    cardContainer.innerHTML=""
    cardContainer.classList.add("row")
    for(var i=1;i<6; i++){ 
        console.log (data.daily[i])
        var card = document.createElement("div") 
        var temp = document.createElement("p") 
        temp.textContent = "temp: "+ data.daily[i].temp.day
        var humidity = document.createElement("p") 
        humidity.textContent = "Humidity: " + data.daily[i].humidity
        var uvi = document.createElement("p") 
        uvi.textContent = "Uvi: " + data.daily[i].uvi
        card.classList.add ("card")
        card.classList.add("col")
        card.appendChild(temp)
        card.appendChild(humidity)
        card.appendChild(uvi)
        cardContainer.appendChild(card)
    }
info_container.appendChild(cardContainer)
}
var day5WeatherIcon = function(day5Icon) {
    var icon5Url = `http://openweathermap.org/img/wn/${day5Icon}@2x.png`
    $("#day5WeatherIcon").html("<img src='" + icon5Url + "'>");
  }
  








            

            

