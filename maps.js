import "./maps.css"
let macarte = null;
let marker = [];

document.forms["form"].addEventListener("submit", async (e) => {
    e.preventDefault();
    const code = document.getElementById("code")
    const adrr = document.getElementById("addr")

    if (code.value && adrr.value) {
        try {
            const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${adrr.value}&postcode=${code.value}`)
            const data = await res.json();
            if (data.features.length === 0) {
                return alert("ville invalide !")
            }

            initMap(...data.features[0].geometry.coordinates.reverse())
        } catch (error) {
            alert("ville invalide !")
            console.log(error);
        }
    }
})

// Fonction d'initialisation de la carte
function initMap(lat, lon) {
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "map"
    if (!macarte) {
        macarte = L.map('map').setView([lat, lon], 18);
        // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut. Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
            // Il est toujours bien de laisser le lien vers la source des données
            attribution: 'données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>',
            minZoom: 1,
            maxZoom: 20
        }).addTo(macarte);
        const newMarker = L.marker([lat, lon])

        newMarker.addTo(macarte);
        marker.push(newMarker)
    } else {
        macarte.setView(new L.LatLng(lat, lon), 18);
        const newMarker = L.marker([lat, lon])

        newMarker.addTo(macarte);
        marker.push(newMarker)
        console.log(newMarker._latlng);
    }
}