    var map = L.map(document.getElementById('mapDIV'), {
    center: [41.55132126247713, -8.422064891788297],
    zoom: 12
    });
	
	// Base maps
	var googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    });
	var baserelief = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {});

	googleStreets.addTo(map);
	baserelief.addTo(map);

    var markers = L.markerClusterGroup();

    var al_turismo = L.geoJSON(turismo,
        {pointToLayer: function(Feature, latlng){
            return markers.addLayer (L.circleMarker(latlng, {radius: 5, color: '#00005b',
                                           fillOpacity: 0.5}));
         },
       });
     al_turismo.addTo(map);
     map.addLayer(markers);

    // camada polígonos áreas de reabilitação urbana
    var lim_aru= L.geoJSON(aru, 
        { onEachFeature: function( feature, layer){
            var COD_ARU= feature.properties.nome;            

             layer.bindPopup('<br/>Área de Reabilitação Urbana: <br/>' + COD_ARU);
             layer.on('mouseover', function() {layer.openPopup();});
             layer.on('mouseout', function() {layer.closePopup();});
         },
         color: '#8B4513', weight: 4,
         });

   lim_aru.addTo(map)

    // camada polígonos CAOP Braga
    var lim_braga= L.geoJSON(braga, 
        { onEachFeature: function( feature, layer){
            var COD_CAOP= feature.properties.des_simpli;            

                layer.bindPopup('<br/>Freguesia: ' + COD_CAOP);
                layer.on('mouseover', function() {layer.openPopup();});
                layer.on('mouseout', function() {layer.closePopup();});
            },
            color: '#363636', weight: 1,
            });

    lim_braga.addTo(map)

    //var mcalorAL = L.esri.Heat.featureLayer({
    //    url: 'https://uporto.maps.arcgis.com/apps/mapviewer/index.html?webmap=51c7255c4676463aaeaf01b1ffe6d547',
    //    radius: 50
    //});
    //mcalorAL.addTo(map);

// selecao de camadas do mapa

    var baselayers = {
    'Open Street Map': baserelief,
    'Google maps': googleStreets
	};
	var overlays = {
        'Turimo': al_turismo,
        'ARU': lim_aru,
        'Freguesias':lim_braga

	};
	L.control.layers(baselayers, overlays).addTo(map);
	
	// Add scalebar

	var scale = L.control.scale()
	scale.addTo(map)

	// Add attribution
	map.attributionControl.addAttribution('Open Street Map');
    map.attributionControl.addAttribution('Google maps'); 
    
    //MAPA DE CALOR ALOJAMENTO LOCAL

    var mcalorAL = L.esri.Heat.featureLayer({
        url: 'https://uporto.maps.arcgis.com/apps/mapviewer/index.html?webmap=51c7255c4676463aaeaf01b1ffe6d547',
        radius: 50
    });
    mcalorAL.addTo(map);
