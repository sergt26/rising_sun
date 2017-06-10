var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=Miami,FL,us&APPID=54094c5e9c3430a7255880a409cc24af');
xhr.onload = function() {
    if (xhr.status === 200) {
        // TODO: parse response into JSON
        var obj = JSON.parse(xhr.responseText);
        var sunrise = obj.sys.sunrise;
        var sunset = obj.sys.sunset;
        var currentTime = new Date().getTime()/1000;
        var numberOfSecondsOfDaylight = sunset-sunrise;
        var highNoon = numberOfSecondsOfDaylight/2;
        var timePassedSinceSunrise = currentTime-sunrise;
        var sun_x = (timePassedSinceSunrise/numberOfSecondsOfDaylight)*100;
        // var sun_y = -0.035*Math.pow(sun_x-52, 2)+80;
        if (timePassedSinceSunrise <= highNoon){
            var sun_y = (timePassedSinceSunrise/highNoon)*100;
        } else {
            var sun_y = (highNoon/timePassedSinceSunrise)*100;
        }

        document.getElementById('sun').style.left = sun_x+"%";
        document.getElementById('sun').style.bottom = sun_y+"%";
    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
    }
};
xhr.send();
