"use strict";

//Global variables
let today = new Date();
let dateSelector = document.querySelector(".date");
let timeSelector = document.querySelector(".time");
let arrayTasks = [];
let arrayTomorrow = [];
let jsonData;
let myJson;
let taskPrototype = {
  id: "-id",
  day: "-day",
  time: "-time-",
  description: "-desc-"
};
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
//weather api display
const appKey = "f24f40b1c24505685fce3b8acd0fcffc";
findWeatherDetails();
let cityName = document.getElementById("city-name");
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");

//This function starts the script when the page is loaded.
document.addEventListener("DOMContentLoaded", getDate());
//This function gets Today's weekDay,day and proper suffix(st,th,rd),month,year,appends to DOM
function getDate() {
  function getSuffix(days) {
    return ["st", "nd", "rd"][((((days + 90) % 100) - 10) % 10) - 1] || "th";
  }
  getSuffix();
  let weekDay = weekDays[today.getDay()];
  let monthName = months[today.getMonth()];
  let date =
    "Today is " +
    weekDay +
    " " +
    today.getDate() +
    getSuffix() +
    " " +
    monthName +
    " " +
    today.getFullYear();
  let dateDiv = document.querySelector(".date");
  dateDiv.textContent = date;
  getTime();
}
//This function gets the time in right format of HH:MM AM/PM,appends to DOM
function getTime() {
  let options = {
    hour: "2-digit",
    minute: "2-digit"
  };
  let time = today.toLocaleTimeString("en-us", options);
  let timeDiv = document.querySelector(".time");
  timeDiv.textContent = time;
  loadJSON();
}
//This function reads json and starts function to create new object
function loadJSON() {
  fetch("tasks.json")
    .then(response => response.json())
    .then(myJson => {
      jsonData = myJson;
      createNewObject(myJson);
    });
}
//This function loop through json and creates new object
function createNewObject(jsonData) {
  jsonData.forEach(task => {
    const tasks = Object.create(taskPrototype);
    tasks.id = task.id;
    tasks.day = task.day;
    tasks.time = task.time;
    tasks.description = task.desc;
    //push to array
    arrayTasks.push(task);
  });
  //   console.log(arrayTasks);
  displayTasks(arrayTasks);
}
//This function appends data from created object to a DOM
function displayTasks() {
  //IMPORTANT to clear before cloning!
  document.querySelector("#list tbody").innerHTML = "";
  arrayTasks.forEach(task => {
    //clone to html
    const clone = document
      .querySelector("template#tasks")
      .content.cloneNode(true);
    clone.querySelector("[data-field=id]").textContent = task.id;
    clone.querySelector("[data-field=day]").textContent = task.day;
    clone.querySelector("[data-field=time]").textContent = task.time;
    clone.querySelector("[data-field=desc]").textContent = task.description;
    document.querySelector("#list tbody").appendChild(clone);
    // if (arrayTasks.task == weekDays[today.getDay()]) {
    //   task.day.backgroundColor = "lightblue";
    // }
  });
  console.log(arrayTasks);
  console.log("Tomorrow will be: " + weekDays[today.getDay() + 1]);
}
//This function on button click reads text input and change page title accordingly
function changeTitle() {
  let inputSelector = document.querySelector(".inputSelector");
  document.addEventListener("submit", e => {
    e.preventDefault();
    document.title = inputSelector.value;
    document.querySelector(".pageTitle").innerHTML =
      "Current page title is: " +
      "'" +
      document.title +
      "'" +
      " ,would you like to customize it?";
  });
}
//This function changes bg color of the page accordingly to selected option
function colorChange(SelectedColor) {
  document.bgColor = SelectedColor;
}
//This function triggerr request
function findWeatherDetails() {
  let searchLink =
    "https://api.openweathermap.org/data/2.5/weather?q=copenhagen&appid=" +
    appKey;
  httpRequestAsync(searchLink, theResponse);
}
//This function puts json data to html
function theResponse(response) {
  let jsonObject = JSON.parse(response);
  cityName.innerHTML = jsonObject.name;
  icon.src =
    "http://openweathermap.org/img/w/" + jsonObject.weather[0].icon + ".png";
  temperature.innerHTML = parseInt(jsonObject.main.temp - 273) + "°";
  humidity.innerHTML = jsonObject.main.humidity + "%";
}
//This function makes http request
function httpRequestAsync(url, callback) {
  console.log("Request was sent");
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200)
      callback(httpRequest.responseText);
  };
  httpRequest.open("GET", url, true); // true for asynchronous
  httpRequest.send();
}
//Random inspirational words
let inspirations = [
  "If you are working on something that you really care about, you don't have to be pushed.",
  "You learn more from failure than from success. ",
  "Don't let yesterday take up too much of today.",
  "Simplicity is the ultimate sophistication.",
  "Be yourself, everyone else is already taken.",
  "Argue with idiots, and you become an idiot.",
  "It’s Not Whether You Get Knocked Down, It’s Whether You Get Up.",
  "Failure Will Never Overtake Me If My Determination To Succeed Is Strong Enough."
];
let showMSG = inspirations[Math.floor(Math.random() * inspirations.length)];
document.querySelector(".inspoMsg").innerHTML = showMSG;
document.querySelector(".pageTitle").innerHTML =
  "Current page title is: " +
  "'" +
  document.title +
  "'" +
  " ,would you like to customize it?";
