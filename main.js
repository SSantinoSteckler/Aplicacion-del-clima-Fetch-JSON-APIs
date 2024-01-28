// url : 'https://api.openweathermap.org/data/2.5/weather'
// api key :'605507acf87117e111e54a3ab5238541';

const $botonBusqueda = document.getElementById('botonBusqueda');
const url = 'https://api.openweathermap.org/data/2.5/weather';
const api_key = '605507acf87117e111e54a3ab5238541';
const $divTexto = document.getElementById('datosClima');

let kevin = 273.15;

$botonBusqueda.addEventListener('click', () => {
  const $ciudad = document.getElementById('ciudadEntrada').value;
  if ($ciudad) {
    queryClima($ciudad);
  } else {
    $divTexto.innerHTML = 'No se encontro ninguna localizacion';
  }
});

function queryClima(ciudad) {
  fetch(`${url}?q=${ciudad}&appid=${api_key}`)
    .then((data) => data.json())
    .then((data) => obtenerClima(data));
}

function obtenerClima(data) {
  $divTexto.textContent = '';

  const titulo = data.name;
  const temperatura = data.main.temp;
  const pais = data.sys.country;
  const descripcion = data.weather[0].description;
  const icon = data.weather[0].icon;
  const humedad = data.main.humidity;

  const $tituloPais = document.createElement('h2');
  $tituloPais.textContent = `${titulo} / ${pais}`;

  const $temperaturaInfo = document.createElement('h2');
  $temperaturaInfo.textContent = `la temperatura es de ${Math.floor(
    temperatura - kevin
  )}C°`;

  if (temperatura - kevin > 20) {
    $temperaturaInfo.style.color = 'red';
  } else {
    $temperaturaInfo.style.color = 'green';
  }

  const $descripcionInfo = document.createElement('h3');
  $descripcionInfo.textContent = descripcion;

  const $humedadInfo = document.createElement('h3');
  $humedadInfo.textContent = `La humedad es del: ${humedad}%`;

  const $iconInfo = document.createElement('img');
  $iconInfo.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  $divTexto.appendChild($tituloPais);
  $divTexto.appendChild($temperaturaInfo);
  $divTexto.appendChild($humedadInfo);
  $divTexto.appendChild($iconInfo);
  $divTexto.appendChild($descripcionInfo);
}
