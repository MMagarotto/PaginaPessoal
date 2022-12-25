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
 
	var boston_crimes = L.geoJSON(boston,                       
                    {pointToLayer: function(feature, latlng){
                          return markers.addLayer (L.circleMarker(latlng, {radius: 5, color: '#00005b',
                                                         fillOpacity: 0.5}));
                      },
                      onEachFeature: function( feature, layer){
                          var lat = feature.properties.x;
                          var lon = feature.properties.y;
                          

                          layer.bindPopup('<br/>Lat: '+ lat + 
                                         '<br/>Lon: '+ lon);
                          layer.on('mouseover', function() {layer.openPopup();});
                          layer.on('mouseout', function() {layer.closePopup();});
                      }
                     });
	boston_crimes.addTo(map);
   	map.addLayer(markers);

    

	var baselayers = {
    'Open Street Map': baserelief,
    'Open topo map': basetopo
	};
	var overlays = {
        'Boston Crimes': boston_crimes
	};
	L.control.layers(baselayers, overlays).addTo(map);
	
	// Add scalebar

	var scale = L.control.scale()
	scale.addTo(map)

        //side bar
    var sidebar = L.control.sidebar('sidebar', {
        position: 'left'
    });
    map.addControl(sidebar);
    sidebar.show();

	// Add attribution
	map.attributionControl.addAttribution('Open Street Map');
    map.attributionControl.addAttribution('Open Topo Map'); 

    
