var MaPrints = (function ( $ ) {

	var map = document.getElementById( 'map' ),
		$prefs = $( document.getElementById( 'prefs' ) ),
		$loc = $( 'input[name="loc"]' ),
		$color = $( 'input[name="color"]' ),
		$close = $( document.getElementById( 'close' ) ),
		$open = $( document.getElementById( 'open' ) ),
		$tips = $( document.getElementById( 'tips' ) ),
		$open_tips = $( document.getElementById( 'open-tips' ) ),
		$close_tips = $( document.getElementById( 'close-tips' ) ),
		$go = $( document.getElementById( 'go' ) ),
		geocoder, bounds, time, base_color, latlng;

	var init = function () {

		base_color = '#333333';
		latlng = new google.maps.LatLng( 40.4159755, - 3.7149172 );
		geocoder = new google.maps.Geocoder();
		initMaps();
		openClose();
		getPrefs();

		var square_side = ( $( window ).width() - $( window ).height() ) / 2;

		$( '.square' ).width( square_side );

		$( window ).bind( "keydown", function ( e ) {
			hijackCtrlH( e );
		} );
	};

	var openClose = function () {

		$open.click( function () {

			if ( $prefs.hasClass( 'show' ) ) {

				$( this ).empty().html( 'Open Prefs' );
				$prefs.removeClass( 'show' );
				return;
			}
			$( this ).empty().html( 'Close Prefs' );
			$prefs.addClass( 'show' );
		} );

		$close.click( function () {

			$prefs.removeClass( 'show' );
			$open.empty().html( 'Open Prefs' );
		} );

		$open_tips.click( function () {

			if ( $tips.hasClass( 'show' ) ) {

				$( this ).empty().html( 'Open Tips' );
				$tips.removeClass( 'show' );
				return;
			}
			$( this ).empty().html( 'Close Tips' );
			$tips.addClass( 'show' );
		} );

		$close_tips.click( function () {

			$tips.removeClass( 'show' );
			$open_tips.empty().html( 'Open Tips' );
		} );
	};

	var initMaps = function () {

		bounds = new google.maps.LatLngBounds();
		map = new google.maps.Map( map, {

			zoom: 13,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles: [
				{
					"featureType": "all",
					"elementType": "labels",
					"stylers": [{"visibility": "off"}]
				},
				{
					"featureType": "all",
					"elementType": "labels.text",
					"stylers": [{"visibility": "on"}]
				}
				,
				{
					"featureType": "all",
					"elementType": "labels.text.fill",
					"stylers": [{"color": "#000000"}]
				}
				,
				{
					"featureType": "all",
					"elementType": "labels.text.stroke",
					"stylers": [{"color": "#ffffff"}]
				}
				,
				{
					"featureType": "all",
					"elementType": "labels.icon",
					"stylers": [{"visibility": "on"}]
				}
				,
				{
					"featureType": "administrative",
					"elementType": "all",
					"stylers": [{"visibility": "off"}]
				}
				,
				{
					"featureType": "landscape",
					"elementType": "all",
					"stylers": [{"color": base_color}, {"visibility": "on"}]
				}
				,
				{
					"featureType": "poi",
					"elementType": "all",
					"stylers": [{"visibility": "off"}]
				}
				,
				{
					"featureType": "road",
					"elementType": "all",
					"stylers": [{"visibility": "on"}]
				}
				,
				{
					"featureType": "road",
					"elementType": "geometry.fill",
					"stylers": [{"color": "#ffffff"}, {"weight": 1}]
				}
				,
				{
					"featureType": "road",
					"elementType": "geometry.stroke",
					"stylers": [{"color": "#ffffff"}, {"weight": 0.8}]
				}
				,
				{
					"featureType": "road",
					"elementType": "labels",
					"stylers": [{"visibility": "off"}]
				}
				,
				{
					"featureType": "transit",
					"elementType": "all",
					"stylers": [{"visibility": "off"}]
				}
				,
				{
					"featureType": "water",
					"elementType": "all",
					"stylers": [{"visibility": "off"}]
				}
			]
		} );
	};

	var getPrefs = function () {

		$prefs.submit( function ( e ) {

			e.preventDefault();
			if ( $loc.val().trim() !== '' ) {

				loc = $loc.val();
				geocoder.geocode( {address: loc}, function ( results, status ) {

					if ( status == google.maps.GeocoderStatus.OK ) {

						latlng = results[0].geometry.location;
					} else {

						alert( 'Geocode was not successful for the following reason: ' + status );
					}
				} );
			}

			if ( $color.val().trim() !== '' ) {

				base_color = $color.val();
			}

			map.setOptions( {

				center: latlng,
				styles: [
					{
						"featureType": "all",
						"elementType": "labels",
						"stylers": [{"visibility": "off"}]
					},
					{
						"featureType": "all",
						"elementType": "all",
						"stylers": [{"visibility": "off"}]
					},
					{
						"featureType": "all",
						"elementType": "labels.text",
						"stylers": [{"visibility": "off"}]
					}
					,
					{
						"featureType": "all",
						"elementType": "labels.text.fill",
						"stylers": [{"color": "#000000"}]
					}
					,
					{
						"featureType": "all",
						"elementType": "labels.text.stroke",
						"stylers": [{"color": "#ffffff"}]
					}
					,
					{
						"featureType": "all",
						"elementType": "labels.icon",
						"stylers": [{"visibility": "off"}]
					}
					,
					{
						"featureType": "administrative",
						"elementType": "all",
						"stylers": [{"visibility": "off"}]
					}
					,
					{
						"featureType": "landscape",
						"elementType": "all",
						"stylers": [{"color": base_color}, {"visibility": "on"}]
					}
					,
					{
						"featureType": "poi",
						"elementType": "all",
						"stylers": [{"visibility": "off"}]
					}
					,
					{
						"featureType": "road",
						"elementType": "all",
						"stylers": [{"visibility": "on"}]
					}
					,
					{
						"featureType": "road",
						"elementType": "geometry.fill",
						"stylers": [{"color": "#ffffff"}, {"weight": 1}]
					}
					,
					{
						"featureType": "road",
						"elementType": "geometry.stroke",
						"stylers": [{"color": "#ffffff"}, {"weight": 0.8}]
					}
					,
					{
						"featureType": "road",
						"elementType": "labels",
						"stylers": [{"visibility": "off"}]
					}
					,
					{
						"featureType": "transit",
						"elementType": "all",
						"stylers": [{"visibility": "off"}]
					}
					,
					{
						"featureType": "transit.station",
						"elementType": "all",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "all",
						"stylers": [{"visibility": "off"}]
					}
				]
			} );
			$prefs.add( $tips ).css( {

				background: compliment( base_color ),
				color: lightOrDark( base_color )
			} );
			$close.add( $close_tips ).removeClass().addClass( lightOrDark( base_color ) );
			$open.add( $open_tips ).add( $( 'a' ) ).css( 'color', lightOrDark( base_color ) );
		} );
	};

	var compliment = function ( hex ) {

		var color = hex;
		color = color.substring( 1 );           // remove #
		color = parseInt( color, 16 );          // convert to integer
		color = 0xFFFFFF ^ color;             // invert three bytes
		color = color.toString( 16 );           // convert to hex
		color = ("000000" + color).slice( - 6 ); // pad with leading zeros
		color = "#" + color;                  // prepend #

		return color;
	};

	var lightOrDark = function ( hex ) {

		var color = hex.substring( 1 );
		var r = parseInt( color.substr( 0, 2 ), 16 );
		var g = parseInt( color.substr( 2, 2 ), 16 );
		var b = parseInt( color.substr( 4, 2 ), 16 );
		var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

		return (yiq >= 128) ? 'white' : 'black';
	};

	var hijackCtrlH = function ( e ) {

		if ( ! ( e.which == 72 && e.ctrlKey ) && ! ( e.which == 19 ) ) {
			return true;
		}

		e.preventDefault();
		hideAll();
		return false;
	};

	var hideAll = function () {

		$( 'body' ).toggleClass( 'hide' );
	};

	return {

		init: init,
		map: map
	}
})( jQuery );

jQuery( document ).ready( function () {

	MaPrints.init();
} );