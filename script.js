
function refreshPage(){
    location.reload();
}



var form = document.getElementById("form");
form.addEventListener("submit",displayWeather);

var filterInput = document.getElementById("filterInput");
var desc = document.getElementById("des")
var place = document.getElementById("place");
var country = document.getElementById("country");
var temp = document.getElementById("temp");
var clouds = document.getElementById("clouds");
var humidity = document.getElementById("humidity");
var pressure = document.getElementById("pressure");
var windDirection = document.getElementById("windDirection");
var windSpeed = document.getElementById("windSpeed");

function displayWeather(e){
    e.preventDefault();

    document.getElementById("header_img").style.display = "none";

    // Date
    // var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    // var Months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    // var time = new Date();
    // var day = days[time.getDay()];
    // var date = time.getDate();
    // var month = Months[time.getMonth()];
    // var year = time.getFullYear();

    // document.getElementById("date").innerHTML = day + ",&nbsp" + date + "&nbsp" + month + "&nbsp" + year ; 

    //Weather Api
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+filterInput.value+'&appid=9b0f843298c5c1939885681130aca616')
    .then((res)=> res.json())
    .then((data)=> {

        var id = data['weather'][0]['id'];
        var des = data['weather'][0]['description'];
        var placeValue = data['name'];
        var countryValue = data['sys']['country'];
        var tempValue = data['main']['temp'];
        var cloudValue = data['clouds']['all'];
        var humidityValue = data['main']['humidity'];
        var pressureValue = data['main']['pressure'];
        var windDirectionValue = data['wind']['deg'];
        var windSpeedValue = data['wind']['speed'];

        var thunderstorm = `<img src="img/icon/thunderstorms.png" alt="" class="weather-icon">`;
        var drizzle = `<img src="img/icon/sleet.png" alt="" class="weather-icon">`;
        var rain = `<img src="img/icon/rain.png" alt="" class="weather-icon">`;
        var snow = `<img src="img/icon/snow.png" alt="" class="weather-icon">`;
        var atmosphere = `<img src="img/icon/fog.png" alt="" class="weather-icon">`;
        var clear = `<img src="img/icon/day-sunny.png" alt="" class="weather-icon">`;
        var cloud = `<img src="img/icon/day-fog.png" alt="" class="weather-icon">`;
        
        switch (true) {
            case id >= 200 && id < 232:
                document.getElementById("icon").innerHTML = thunderstorm;
                break;
            case id >= 300 && id <= 321:
                document.getElementById("icon").innerHTML = drizzle;
                // document.getElementById("icon").innerHTML =  cloud;
                break;   
            case id >= 500 && id <= 521:
                document.getElementById("icon").innerHTML = rain;
                break;   
            case id >= 600 && id <= 622:
                document.getElementById("icon").innerHTML = snow
                break;   
            case id >= 701 && id <= 781:
                document.getElementById("icon").innerHTML =  atmosphere;
                break;   
            case id == 800:
                document.getElementById("icon").innerHTML =  clear;
                break;   
            case id >= 801 && id <= 804:
                document.getElementById("icon").innerHTML =  cloud;
                break;   
            default:
                document.getElementById("icon").innerHTML =  cloud;
        }

        // DISPLAY THE OUTPUTS
        desc.innerHTML = `${des}`;
        place.innerHTML = `${placeValue},`;
        country.innerHTML = `${countryValue} `;
        temp.innerHTML = `
            <div class="smBx">
                <div>Temp</div>
                <div>${tempValue}°C</div>
            </div>
        `;
        clouds.innerHTML = `
            <div class="smBx">
                <div>clouds</div>
                <div>${cloudValue}%</div>
            </div>
            `;
        humidity.innerHTML = `
            <div class="smBx">
                <div>humidity</div>
                <div>${humidityValue}%</div>
            </div>
            `;
        pressure.innerHTML = `
            <div class="smBx">
                <div>pressure</div>
                <div>${pressureValue}hPa</div>
            </div>
            `;
        windDirection.innerHTML = `
            <div class="smBx">
                <div>wind Dir</div>
                <div>${windDirectionValue}°</div>
            </div>
            `;
        windSpeed.innerHTML = `
            <div class="smBx">
                <div>wind Speed</div>
                <div>${windSpeedValue}m/s</div>
            </div>
            `;
        
        filterInput.value ="";

    })
    .catch((err) => {

        alert("Please Enter  a valid city!")
        

    });

}