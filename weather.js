const getWeather = (x) => {
    axios(x).then((response) => {
        const currentWeather = response.data;
        const region = currentWeather.location.region;
        const temp = currentWeather.current.temperature;
        let description = currentWeather.current.weather_descriptions[0];

        if (description === 'Partly cloudy') {
            description = emoji.emojify(':cloud:');
        } else if (description === 'Sunny') {
            description = emoji.emojify(':sunny:');
        } else if (description === 'Clear') {
            description = emoji.emojify(':mostly_sunny:');
        }

        return `Today in ${region} the weather is ${description}, with a temperature of ${temp} degrees celisus`
    });
}

module.exports = {
    getWeather: getWeather,
}