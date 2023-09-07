const apiKey = 'YOUR_API_KEY';

document.getElementById('getWeatherBtn').addEventListener('click', function () {
    const container = document.querySelector('.container');
    const weatherInfo = document.getElementById('weatherInfo');
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('getWeatherBtn');
    const icon = document.getElementById('iconloc');

    // Set the initial height of the container before the animation
    container.style.height = container.clientHeight + 'px';

    // Hide the weather info before animating
    weatherInfo.style.opacity = '1';
    cityInput.style.visibility = 'hidden';
    searchBtn.style.visibility = 'hidden';
    icon.style.visibility = 'hidden';

    // Calculate the new container height based on weatherInfo's content
    const newHeight = weatherInfo.scrollHeight + 'px';

    // Set the container height to the new height and trigger animation
    container.style.height = newHeight;
    setTimeout(() => {
        getWeather(cityInput.value);

        // Show the input and button
        cityInput.style.visibility = 'visible';
        searchBtn.style.visibility = 'visible';
        icon.style.visibility = 'visible';
        // Reset the container's height and reveal the weather info
        container.style.height = '600px';
        weatherInfo.style.opacity = '1';
    }, 600); // Wait for container transition to complete (adjust the timing as needed)
});


function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (city === '') {
        weatherInfo.innerHTML = `
        <p style="margin-top:200px;margin-bottom:260px;color:red;">Silahkan isi inputan dengan kota anda!</p>
        <p class="credit">Website by Denny Daffa Rizaldy</p>
    `;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');

            if (data.cod === "404") {
                weatherInfo.innerHTML = `
                    <div class="not-found">
                        <img src="image/notfound.png" alt="Not Found">
                        <p style="margin-bottom:50px">Kota tidak ditemukan</p>
                    </div>
                    <p class="credit">Website by Denny Daffa Rizaldy</p>
                `;

            }
            else if (data.cod === " ") {
                weatherInfo.innerHTML = `
                <p style="margin-bottom:50px">Isi Kotamu!</p>
                <p class="credit">Website by Denny Daffa Rizaldy</p>
            `;
            }
            else {
                const weatherImage = getWeatherImage(data.weather[0].main);

                const windSpeed = data.wind.speed;
                const humidity = data.main.humidity;

                weatherInfo.innerHTML = `
                    <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                    <img src="${weatherImage}" alt="${data.weather[0].main}">
                    <p class="temperature">${data.main.temp}°C</p>
                    <p class="description">${data.weather[0].description}</p>
                    <div class="weather-details">
                        <p class="wind"><i class="bi bi-wind"></i> Wind: ${windSpeed} m/s</p>
                        <p class="humidity"><i class="bi bi-droplet"></i> Humidity: ${humidity}%</p>
                    </div>
                    <p class="credit">Website by Denny Daffa Rizaldy</p>
                `;
            }


            weatherInfo.classList.add('fadeIn');
        })
        .catch(error => {
        });
}

function getWeatherImage(weatherCondition) {
    const conditionMap = {
        'Clear': 'image/clear.png',
        'Clouds': 'image/cloud.png',
        'Rain': 'image/rain.png',
        'Haze': 'image/haze.png',
        'Snow': 'image/snow.png',
        // Add more conditions as needed
    };

    return conditionMap[weatherCondition] || 'default.png';
}
// ...

document.getElementById('getWeatherBtn').addEventListener('click', function () {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.classList.remove('fadeIn'); // Remove fadeIn class to trigger fadeOut animation

    setTimeout(() => {
        weatherInfo.classList.add('fadeOut'); // Add fadeOut class for animation
        setTimeout(() => {
            weatherInfo.classList.remove('fadeOut'); // Remove fadeOut class to reset
            getWeather();
        }, 500); // Wait for fadeOut animation to complete (adjust the timing as needed)
    }, 0); // Slight delay to trigger animation

});

// ...

