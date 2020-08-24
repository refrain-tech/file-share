"use strict";
firebase.initializeApp({
	apiKey: "AIzaSyApAMc8cGSt2R8NRZ1BdJVBzj9KPSO-jpM",
	appId: "1:792165889900:web:0f40d633226439b3cca549",
	authDomain: "refrain-tech-file-share.firebaseapp.com",
	databaseURL: "https://refrain-tech-file-share.firebaseio.com",
	measurementId: "G-703CMR8MCG",
	messagingSenderId: "792165889900",
	projectId: "refrain-tech-file-share",
	storageBucket: "refrain-tech-file-share.appspot.com"
});
const database = firebase.database();
const storage = firebase.storage();
let SELECTED_FILE = null;
picker.addEventListener("change", event => SELECTED_FILE = event.target.files);
upload.addEventListener("click", event => {
	if (SELECTED_FILE !== null) {
		[].slice.call(SELECTED_FILE).forEach(file => {
			const ref = storage.ref(`uploaded/${file.name.split(".")[0]}`);
			ref.put(file).then(snapshot => ref.getDownloadURL().then(url => database.ref("share").push({
				name: file.name,
				url: url
			})).catch(console.log(error)).catch(console.log);
			});
		SELECTED_FILE = null;
	}
});
