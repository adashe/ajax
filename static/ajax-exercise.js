'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  fetch('/fortune')
    .then(response => response.text())
    .then(responseData => {
      document.querySelector('#fortune-text').innerText = responseData;
    });
}

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = "/weather.json";
  const zipcode = document.querySelector('#zipcode-field').value;

  fetch(`/weather.json?zipcode=${zipcode}`)
    .then(response => response.json())
    .then(responseData => {
      document.querySelector('#weather-info').innerText = responseData.forecast;
    });
}

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  const formInputs = {
    melon_type: document.querySelector('#melon-type-field').value,
    qty: document.querySelector('#qty-field').value,
  };

  fetch('/order-melons.json', {
    method: "POST",
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type' : 'application/json',
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.code === 'ERROR') {
        document.querySelector('#order-status').classList.add('order-error')
        document.querySelector('#order-status').innerHTML = `<p>${responseJson.msg}<p>`;
      } else {
        document.querySelector('#order-status').innerHTML = `<p>${responseJson.msg}<p>`;
      }
    });
}
document.querySelector('#order-form').addEventListener('submit', orderMelons);

// FURTHER STUDY
document.querySelector("#get-dog-image").addEventListener('click', () => {
fetch('https://dog.ceo/api/breeds/image/random')
 .then(response => response.json())
  .then(result => {
    const image = result.message;
    document
    .querySelector('#dog-image')
    .insertAdjacentHTML('beforeend', `<div><img src=${image}></div>`);
  });
});