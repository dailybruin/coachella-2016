var photosheetkey = "1wxIlU9pjKDcAfZrX4XmzAfCBA1cpWP1TrmoUGpvWa-c";
var recapsheetkey = "1ffCXCveuwLrG7jL20bTsATxGIxSWDvjTloNQAn_3H-M";
var photocard_template = $("#card-template").html();
var photocard_compiled = Handlebars.compile(photocard_template);

init();

function init() {
	var photosheeturl = "https://spreadsheets.google.com/feeds/list/" + photosheetkey + "/od6/public/values?alt=json"; 
	$.getJSON(photosheeturl, function(data) {
		data = clean_google_sheet_json(data);
		// console.log(data);
		$(".content-main").append(photocard_compiled({carddata: data}));
	});

	var recapsheeturl = "https://spreadsheets.google.com/feeds/list/" + recapsheetkey + "/od6/public/values?alt=json"; 
	$.getJSON(recapsheeturl, function(data) {
		data = clean_google_sheet_json(data);
		if (data.length > 0) {
			$(".recap").html(format_body_text(data[0].text));	
			$(".recap").show();
		}		
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

function format_body_text(t) {
	t = t.trim();
	var re = new RegExp('[\r\n]+', 'g');
    return (t.length>0?'<p>'+t.replace(re,'</p><p>')+'</p>':null);
}