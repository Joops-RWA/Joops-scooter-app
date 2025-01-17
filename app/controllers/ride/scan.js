// https://github.com/appcelerator-modules/ti.barcode/blob/master/ios/example/app.js
// https://www.qr-code-generator.com/
const Barcode = require('ti.barcode');

Barcode.allowRotation = false;
Barcode.displayedMessage = '';
Barcode.allowMenu = false;
Barcode.allowInstructions = false;
Barcode.useLED = false;

function onErrorHandler(message) {
	alert(message);
}

function onContentsScannedHandler(event) {
	const contents = {
		type: parseContentType(event.contentType),
		result: parseResult(event),
		format: event.format
	};

	$.window.navigationWindow.openWindow(Alloy.createController('ride/new', contents).getView());
}

Barcode.addEventListener('error', onErrorHandler);
Barcode.addEventListener('success', onContentsScannedHandler);

function onCloseHandler() {
	Barcode.removeEventListener('error', onErrorHandler);
	Barcode.removeEventListener('success', onContentsScannedHandler);
}

function parseContentType(contentType) {
	switch(contentType) {
		case Barcode.URL:
			return 'URL';
		case Barcode.SMS:
			return 'SMS';
		case Barcode.TELEPHONE:
			return 'TELEPHONE';
		case Barcode.TEXT:
			return 'TEXT';
		case Barcode.CALENDAR:
			return 'CALENDAR';
		case Barcode.GEOLOCATION:
			return 'GEOLOCATION';
		case Barcode.EMAIL:
			return 'EMAIL';
		case Barcode.CONTACT:
			return 'CONTACT';
		case Barcode.BOOKMARK:
			return 'BOOKMARK';
		case Barcode.WIFI:
			return 'WIFI';
		default:
			return 'UNKNOWN';
	}
}

function parseResult(event) {
	let msg = '';

	switch(event.contentType) {
		case Barcode.URL:
			msg = uriToObject(event.result);
			break;
		case Barcode.SMS:
			msg = JSON.stringify(event.data);
			break;
		case Barcode.TELEPHONE:
			msg = event.data.phonenumber;
			break;
		case Barcode.TEXT:
			msg = uriToObject(event.result);
			break;
		case Barcode.CALENDAR:
			msg = JSON.stringify(event.data);
			break;
		case Barcode.GEOLOCATION:
			msg = JSON.stringify(event.data);
			break;
		case Barcode.EMAIL:
			msg = event.data;
			break;
		case Barcode.CONTACT:
			msg = JSON.stringify(event.data);
			break;
		case Barcode.BOOKMARK:
			msg = JSON.stringify(event.data);
			break;
		case Barcode.WIFI:
			return JSON.stringify(event.data);
		default:
			msg = 'unknown content type';
			break;
	}
	return msg;
}

function onStartGalleryScanHandler() {
	Ti.Media.openPhotoGallery({
		success: function(event) {
			Barcode.parse({
				image: event.media
			});
		}
	});
}

function hasCameraPermission(callback) {
	if(OS_ANDROID) {
		if(Ti.Media.hasCameraPermissions() && callback) {
			callback(true);
		} else {
			Ti.Media.requestCameraPermissions(function(e) {
				if(callback) {
					callback(e.success);
				}
			});
		}
	} else if(OS_IOS && callback) {
		// NSCameraUsageDescription in tiapp.xml is required.
		callback(true);
	}
}

function onStartCameraScanHandler() {
	hasCameraPermission(function(hasPermission) {
		if(hasPermission) {
			Barcode.capture({
				animate: true,
				overlay: $.cameraOverlay,
				showCancel: true,
				showRectangle: true,
				keepOpen: false
			});
		} else {
			alert('No permission to use the camera. If you want to scan codes please give the app permissions in the settings of your phone.');
		}
	});
}

function uriToObject(uri) {
	let pairs = uri.split('?');
	const object = {
		recipientId: pairs[0].split(':')[1]
	};
	pairs = pairs[1].split('&');

	for(let i in pairs) {
		if(pairs.hasOwnProperty(i)) {
			const split = pairs[i].split('=');

			object[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
		}
	}

	return object;
}

function onAndroidBackHandler() {
	$.window.close();
}

//rad:TGm4RA3hv49DmKWWpSPGFDHMmQmQNdqqZA?hash=2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824&rate=1&lat=-180.222222&lon=1.111111