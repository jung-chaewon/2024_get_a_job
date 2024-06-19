const weatherApi = {
    key: "828cc99e0335c9476a8f751b7c386d9a",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
};
const loc = document.querySelector('#location');
const desc = document.querySelector('.desc');
let dat, lat, long;

window.addEventListener('load', () => {
    fetch(`${weatherApi.baseUrl}?q=Seoul&appid=${weatherApi.key}&units=metric`)
        .then((response) => response.json())
        .then((data) => {
            const { temp } = data.main;
            const place = data.name;
            const { description } = data.weather[0];

            loc.textContent = `${place}`;
            desc.textContent = `${description}`;
            document.querySelector('#temp').textContent = `${temp.toFixed(2)}°C`;
            showWeatherImage(description);
        });
});

const searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter' || event.which === 13) {
        console.log(searchInputBox.value);
        await getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }
});

async function getWeatherReport(city) {
    try {
        const response = await fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error while getting the weather report');
        }
        showWeatherReport(data);
        lat = data.coord.lat;
        long = data.coord.lon;
        await fetching();
    } catch (err) {
        console.error(err);
        showErrorMessage();
    }
}

function showErrorMessage() {
    document.getElementById('city').innerText = 'Country/city Name Not Found';
    document.getElementById('data').innerText = '';
    document.getElementById('temp').innerText = '';
    document.getElementById('min-max').innerText = '';
    document.getElementById('weather').innerText = '';
}

function showWeatherImage(weatherType) {
    let backgroundImage;
    switch (weatherType) {
        case 'clear':
            backgroundImage = "url('clear1.jpg')";
            break;
        case 'Clouds':
        case 'Haze':
            backgroundImage = "url('clouds.jpg')";
            break;
        case 'Rain':
            backgroundImage = "url('rain.jpg')";
            break;
        case 'Snow':
            backgroundImage = "url('snow.jpg')";
            break;
        case 'Thunderstorm':
            backgroundImage = "url('thunder.jpg')";
            break;
        case 'Sunny':
            backgroundImage = "url('sunny.jpg')";
            break;
        default:
            backgroundImage = "";
            break;
    }
    document.body.style.backgroundImage = backgroundImage;
}

function showWeatherReport(weather) {
    let city = document.getElementById('city');
    city.innerText = `${weather.name},${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.round(weather.main.temp_min)}&deg;C / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    showWeatherImage(weather.weather[0].main);
}

function dateManage(dateArg) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}

async function fetching() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${weatherApi.key}&units=metric`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error('Error while fetching the weather');
        }
        dat = data;
        google.charts.load('current', { packages: ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);
    } catch (err) {
        console.error(err);
    }
}

function drawChart() {
    let dataArr = [['Time', 'Temperature', { role: 'style' }]];
    for (let i = 0; i < 12; i++) {
        let unixTime = dat.hourly[i].dt;
        let temp = Math.floor(dat.hourly[i].temp);
        let hour = format(new Date(unixTime * 1000));
        dataArr.push([hour, temp, 'color:black']);
    }

    const data = google.visualization.arrayToDataTable(dataArr);

    const options = {
        title: 'Time vs. Temperature',
        hAxis: { title: 'Time in Hours' },
        vAxis: { title: 'Temperature in °C' },
        legend: 'none',
        tooltip: { isHtml: true },
        backgroundColor: 'transparent',
        colors: ['black'],
        is3D: true,
        allowHtml: true,
    };

    document.querySelector("#myChart").style.display = "block";
    const chart = new google.visualization.AreaChart(document.getElementById('myChart'));
    chart.draw(data, options);
}

function format(date) {
    let hours = date.getHours();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ' ' + ampm;
}

window.onresize = function () {
    drawChart();
};
