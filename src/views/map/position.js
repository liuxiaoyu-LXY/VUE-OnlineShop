// const Url ="https://maps.googleapis.com/maps/api/js?key=AIzaSyA6R1wf4P5viLnCs8jNuxRIXPGr9OQfHAQ&libraries=places"


// function addScript(url){
// 	document.write("<script language=javascript src="+url+"></script>");
// }
// addScript(Url)
import google from 'google'

var lngtxt = '116.313740'
var lattxt = '39.958339'
var addresstxt = "北京市";

var map;
var marker;
var infowindow;
var geocoder;
var markersArray = [];

export const initAutocomplete = function(map,that) {
	// alert(that.lng,'hshs')
//     var lngtxt = '116.313740'
// var lattxt = '39.958339'

// var map;

// 	var latlng = new google.maps.LatLng(lattxt, lngtxt);
// 	var myOptions = {
// 		zoom: 13,
// 		center: latlng,
// 		mapTypeId: google.maps.MapTypeId.ROADMAP
// 	};
	// map = new google.maps.Map(document.getElementById('container'), myOptions);
	
	geocoder = new google.maps.Geocoder(); //实例化地址解析
	//监听点击地图事件
	// google.maps.event.addListener(map, 'click', function(event) {
	// 	placeMarker(event.latLng);
	// });
	// Create the search box and link it to the UI element.·
	var input = document.getElementById('addressItem');
    // console.log(input)
	var searchBox = new google.maps.places.SearchBox(input);
	// map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	// Bias the SearchBox results towards current map's viewport.
	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());
	});

	// var markers = [];
	// Listen for the event fired when the user selects a prediction and retrieve
	// more details for that place.
	searchBox.addListener('places_changed', function() {
        
		var places = searchBox.getPlaces();
        // console.log(places)

		if(places.length == 0) {
			return;
		}

		// For each place, get the icon, name and location.
		var bounds = new google.maps.LatLngBounds();
        const place = places[0]
        // console.log(place.geometry.location)
		// places.forEach(function(place) {
		// 	if(!place.geometry) {
		// 		console.log("Returned place contains no geometry");
		// 		return;
		// 	}
			// var icon = {
			// 	url: place.icon,
			// 	size: new google.maps.Size(71, 71),
			// 	origin: new google.maps.Point(0, 0),
			// 	anchor: new google.maps.Point(17, 34),
			// 	scaledSize: new google.maps.Size(25, 25)
			// };
			//console.log(place.geometry.location.lat());
			// alert(that.lng)
			// console.log(place.address_components[3].long_name,'te')
			mapClick(place.geometry.location.lng(), place.geometry.location.lat(), place.name,place.address_components[2].long_name,that);
            // let latlng2 = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
            // console.log(latlng2);
            // console.log('s3e',map)
            placeMarker(place.geometry.location,map);

			// Create a marker for each place.
			// markers.push(new google.maps.Marker({
			// 	map: map,
			// 	icon: icon,
			// 	title: place.name,
			// 	position: place.geometry.location
			// }));

			if(place.geometry.viewport) {
				// Only geocodes have viewport.
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		// });
		
        map.fitBounds(bounds);
	});
}

const placeMarker = function(location,map) {
    // console.log('ss')
	clearOverlays(infowindow); //清除地图中的标记
	marker = new google.maps.Marker({
		position: location,
		map: map
	});
    
	markersArray.push(marker);
    console.log(map,markersArray,'s')
	//根据经纬度获取地址
	if(geocoder) {
		geocoder.geocode({
			'location': location
		}, function(results, status) {
			if(status == google.maps.GeocoderStatus.OK) {
				if(results[0]) {
					attachSecretMessage(marker, results[0].geometry.location, results[0].formatted_address);
				}
			} else {
				alert("Geocoder failed due to: " + status);
			}
		});
	}
}
//在地图上显示经纬度地址
export const attachSecretMessage = function(marker, piont, address) {

	var infowindow = new google.maps.InfoWindow({
		content: address,
		size: new google.maps.Size(50, 50)
	});
	infowindow.open(map, marker);
	// if(typeof(mapClick) == "function") mapClick(piont.lng(), piont.lat(), address);
}
//删除所有标记阵列中消除对它们的引用
export const clearOverlays = function(infowindow) {
	if(markersArray && markersArray.length > 0) {
		for(var i = 0; i <markersArray.length; i++) {
			markersArray[i].setMap(null);
		}
		markersArray.length = 0;
	}
	if(infowindow) {
		infowindow.close();
	}
}

export const setiInit = function() {
	// 页面加载显示默认lng lat address---begin
	if(lattxt != '' && lngtxt != '' && addresstxt != '') {
		var latlng = new google.maps.LatLng(lattxt, lngtxt);
		marker = new google.maps.Marker({
			position: latlng,
			map: map
		});
		markersArray.push(marker);
		attachSecretMessage(marker, latlng, addresstxt);
	}
}

export const mapClick = function(lng, lat, address,city,that) {
	that.lng = lng;
	that.lat = lat;
	that.address = address;
	that.city = city;
	// window.parent.document.getElementById("address_lng").value = lng;
	// window.parent.document.getElementById("address_lat").value = lat;
	// window.parent.document.getElementById("address").value = address;
}
// window.onload = function() {
// 	setiInit();
//     initAutocomplete();
// }