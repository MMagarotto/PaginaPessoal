    var map = L.map(document.getElementById('mapDIV'), {
    center: [42.278590000, -71.119440000],
    zoom: 11
    });
	
	// Base maps
	var basetopo = L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {});
	var baserelief = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {});

	basetopo.addTo(map);
	baserelief.addTo(map);

    var markers = L.markerClusterGroup();

    var vespas_asiaticas = L.geoJSON(vespas,
       {pointToLayer: function(Feature, latlng){
           return markers.addLayer (L.circleMarker(latlng, {radius: 5, color: '#00005b',
                                          fillOpacity: 0.5}));
        },
      });
    vespas_asiaticas.addTo(map);
    map.addLayer(markers);

    var al_turismo = L.geoJSON(turismo,
        {pointToLayer: function(Feature, latlng){
            return markers.addLayer (L.circleMarker(latlng, {radius: 5, color: '#00005b',
                                           fillOpacity: 0.5}));
         },
       });
     al_turismo.addTo(map);
     map.addLayer(markers);


	var baselayers = {
    'Open Street Map': baserelief,
    'Open topo map': basetopo
	};
	var overlays = {
        'Turimo': turismo
	};
	L.control.layers(baselayers, overlays).addTo(map);
	
	// Add scalebar

	var scale = L.control.scale()
	scale.addTo(map)

	// Add attribution
	map.attributionControl.addAttribution('Open Street Map');
    map.attributionControl.addAttribution('Open Topo Map'); 

    
