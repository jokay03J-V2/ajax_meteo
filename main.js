import './style.css'

document.forms["form"].addEventListener("submit", soumission);

function soumission(event) {
  event.preventDefault();
  const nom = document.getElementById("nom").value;
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (data) {
    if (data.target.readyState == 4 && data.target.status == 200) {
      const dataRes = JSON.parse(data.target.response);
      let hasAlreadyCity = [];
      document.getElementById("cityName").innerText = dataRes.city.name;
      document.getElementById("countryName").innerText = dataRes.city.country;
      dataRes.list.forEach((item) => {
        const date = getDateFromString(item.dt_txt);
        if (!hasAlreadyCity.includes(date)) {
          document.getElementById("resultat").innerHTML += `<article class="card">
          <h2>${date}</h2>
          <p>min: ${item.main.temp_min}</p>
          <p>max: ${item.main.temp_max}</p>
          <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
          </article>`

          hasAlreadyCity.push(date);
        }
      })
      // document.getElementById("resultat").innerHTML = code;
    }
  };
  xhttp.open("GET", `https://api.openweathermap.org/data/2.5/forecast?q=${nom}&APPID=${import.meta.env.VITE_API_KEY}&units=metric`, true);
  xhttp.send();
}

function getDateFromString(str) {
  const date = new Date(str);
  const month = date.getMonth().toString();
  const dateOfTheMonth = date.getDate().toString();
  return `${dateOfTheMonth.padStart(2, "0")}/${month.padStart(2, "0")}/${date.getFullYear()}`
}