require('dotenv').config();

const axios = require('axios');
const chalk = require('chalk');
const inquirer = require('inquirer');
const emoji = require('node-emoji');

const auth = {
    WEATHER_STACK: process.env.WEATHER_STACK,
};

const usersCity = [
    {
        type: 'input',
        name: 'city',
        message: 'What city would you like to check the weather in?',
    },
];

inquirer
    .prompt(usersCity)
    .then((answers) => {
        const config = {
            method: 'get',
            url: `http://api.weatherstack.com/current?access_key=${auth.WEATHER_STACK}&query=${answers.city}`,
        };
        axios(config).then(function (response) {
            const currentWeather = response.data;
            const region = currentWeather.location.region;
            const temp = currentWeather.current.temperature;
            let description = currentWeather.current.weather_descriptions[0];

            if (description === 'Partly cloudy') {
                description = emoji.emojify(':cloud:');
            } else if (description === 'Sunny') {
                description = emoji.emojify(':sunny:');
            }

            console.log(
                `Today in ${region} the weather is ${description}, with a temperature of ${temp} degrees celisus`
            );
        });
    })
    .catch((error) => console);
