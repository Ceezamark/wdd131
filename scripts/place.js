/* Footer */

document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

/* Weather */

// Static values for now
const temperature = 8;  // °C
const windSpeed = 12;   // km/h

// Metric wind chill formula
function calculateWindChill(t, s) {
  return 13.12 + 0.6215 * t - 11.37 * Math.pow(s, 0.16) + 0.3965 * t * Math.pow(s, 0.16);
}

// Wind chill only applies at 10 °C or below with wind above 4.8 km/h.
function displayWindChill(t, s) {
  return t <= 10 && s > 4.8 ? `${calculateWindChill(t, s).toFixed(1)} °C` : "N/A";
}

document.querySelector("#windchill").textContent = displayWindChill(temperature, windSpeed);
