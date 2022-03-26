console.log("clinet side js");

//fetch

const weatherFrom = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#msg-1");
const msgTwo = document.querySelector("#msg-2");

weatherFrom.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  msgOne.textContent = "Loading...";
  msgTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msgOne.textContent = data.error;
        } else {
          msgOne.textContent = data.location;
          msgTwo.textContent = data.weather.temp;
        }
      });
    }
  );
});
