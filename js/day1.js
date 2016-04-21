var sheetkey = "1wxIlU9pjKDcAfZrX4XmzAfCBA1cpWP1TrmoUGpvWa-c";

init();

function init() {
	var url = "https://spreadsheets.google.com/feeds/list/" + sheetkey + "/od6/public/values?alt=json"; 
	$.getJSON(url, function(data) {
		data = clean_google_sheet_json(data);
		console.log(data);
	});
};

function clean_google_sheet_json(data){
	var formatted_json = [];
	var elem = {};
	var real_keyname = '';
	$.each(data.feed.entry, function(i, entry) {
		elem = {};
		$.each(entry, function(key, value){
			// fields that were in the spreadsheet start with gsx$
			if (key.indexOf("gsx$") == 0) 
			{
				// get everything after gsx$
				real_keyname = key.substring(4); 
				elem[real_keyname] = value['$t'];
			}
		});
		formatted_json.push(elem);
	});
	return formatted_json;
};