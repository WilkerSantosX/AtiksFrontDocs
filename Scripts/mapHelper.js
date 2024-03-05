//Variáveis para uso no mapa leaflet
var map;
var infoOrigem = '<h6>local</h6>';

var marker, circle, poligonoPai, poligonoFilho, _ultimaPosicao, _UltimaPosicaoDetalhe;
var latLong, accuracy;

var path = new Array;
var poligonosFilhos = new L.layerGroup(); 
var pathCircle = new L.layerGroup();

//Cria o ícone de origem
var iorigem = L.icon({
	iconUrl: 'Content/images/mapa/marker-origem.png',
	iconSize: [60, 60],
	iconAnchor: [30, 60],
	popupAnchor: [-3, -76]
});

//Cria o ícone do destino
var idestino = L.icon({
	iconUrl: 'Content/images/mapa/marker-destino.png',
	iconSize: [60, 60],
	iconAnchor: [30, 60],
	popupAnchor: [-3, -76]
});	

//Cria o ícone do caminhão
var iveiculo = L.icon({
	iconUrl: 'Content/images/mapa/marker-truck.png',
	iconSize: [60, 60],
	iconAnchor: [30, 60],
	popupAnchor: [-3, -76]
});	


MapHelper = (function ($) {
   
	var initMap = function initMap(){
		//Set visão do mapa
		map = L.map('map').setView([-23.550519562779346, -46.63364131951546], 16);
				
		//Instanciando o mapa via jquery e renderizando no HTML
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			minZoom: 4,   //Valor do scroll no zoom
			maxZoom: 19,  //Valor do scroll no zoom
			attribution: '© StreetMap'
		}).addTo(map);			
	}

	var setLocalClient = function setLocalClient(position){
		MapHelper.removeLayersMap();
	
		var lat = position.coords.latitude;
		var long = position.coords.longitude;
		accuracy = position.coords.accuracy;

		marker = L.marker([lat, long]).bindPopup('Seu local');

		var featureGroup = L.featureGroup([marker]).addTo(map);
		map.fitBounds(featureGroup.getBounds());	
	}
  
    var removeLayersMap = function removeLayersMap() {
		if(marker){
			map.removeLayer(marker);
		}
		if(circle){
			map.removeLayer(circle);
		}
		if(poligonoPai){
			map.removeLayer(poligonoPai);
		}	
		if(poligonosFilhos){
			map.removeLayer(poligonosFilhos);
		}
    }  	

	var insertMarker = function insertMarker(geoLocalization, icon, bindPopup){
		L.marker(geoLocalization, { icon: icon }).addTo(map).bindPopup(bindPopup); //Marcador
	}

	var insertRadius = function insertRadius(geoLocalization, radius){
		L.circle(geoLocalization, { radius: radius }).addTo(map); 
	}

	var insertPolygon = function insertPolygon(area){
		var _data = JSON.parse(area);
        poligonoPai = L.GeoJSON.geometryToLayer(_data).bindPopup('pátio principal');
        poligonoPai.setStyle({ color: '#e0c74c', fillColor: '#d87700' });
        poligonoPai.addTo(map); //Desenho do polígono
	}

	var insertSubPolygon = function insertSubPolygon(subAreas){		
		subAreas.forEach(function (item, indice, array) {	  
            var _data = JSON.parse(item.Area);

            poligonosFilhos.addLayer(
                L.GeoJSON.geometryToLayer(_data, { color: '#009902', fillColor: '#64c465' }).bindPopup('sub-area Nº ' + indice)
            );
        });
        
        poligonosFilhos.addTo(map);  
	}

	var insertRoute = function insertRoute(track){		
		$.each(track, function (i, item) {
            if (!item)
                return;
    
            _ultimaPosicao = item.Posicao.split(",");
            _UltimaPosicaoDetalhe = item.Data;
    
            path.push(item.Posicao.split(","));
    
            // circle = L.circleMarker(item.Posicao.split(","), {
            //     color: "#7c7c7c",
            //     fillColor: "#fff",
            //     fillOpacity: 1,
            //     weight: 1,
            //     radius: 5.0
            // }).bindPopup(item.Data);
            // circle.addTo(pathCircle);
        });
    
        L.polyline(path, {
            stroke: true,
            color: 'red',
        }).addTo(map);
    
        //pathCircle.addTo(map);
    
        // L.marker(_ultimaPosicao, { icon: iveiculo })
        //     .addTo(map)
        //     .bindPopup("Ultima Localização:" + _UltimaPosicaoDetalhe);
    
        map.setView(_ultimaPosicao, 13);
	}


	var animationRoute = function animationRoute(track){
		//Get first position car
		let start = track[0].Posicao.split(",");
		let positionVeiculo = L.marker(start, { icon: iveiculo }).addTo(map);

		$.each(track, function (i, item) {
            if (!item)
                return;
    
			setTimeout(() =>{
				positionVeiculo.setLatLng(item.Posicao.split(","))
			}, 1000 * i);
        });	
	}


    return {
        initMap: initMap, setLocalClient: setLocalClient, removeLayersMap: removeLayersMap, insertMarker: insertMarker, 
		insertRadius: insertRadius, insertPolygon: insertPolygon, insertSubPolygon: insertSubPolygon, insertRoute: insertRoute,
		animationRoute: animationRoute
    }
}(jQuery));