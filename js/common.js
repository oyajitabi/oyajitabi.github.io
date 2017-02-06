/*! Common Library - v1.0.0 - 01/23/2017
 * (c) YHNAKM */
var $f = function() {
	$("body").append($("<div></div>", {
		"id": "loading-background",
		"data-role": "popup",
		"data-history": "false",
		"data-shadow": "false",
		"data-overlay-theme": "b",
		"data-dismissible": "false"
	})).enhanceWithin();

	return {
		formatDate: function(date, format) {
			var dow = ["日", "月", "火", "水", "木", "金", "土"];

			format = format.replace(/yyyy/g, date.getFullYear());
			format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
			format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2));
			format = format.replace(/hh/g, ("0" + date.getHours()).slice(-2));
			format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
			format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
			format = format.replace(/yy/g, ("" + date.getFullYear()).slice(-2));
			format = format.replace(/M/g, date.getMonth() + 1);
			format = format.replace(/d/g, date.getDate());
			format = format.replace(/h/g, date.getHours());
			format = format.replace(/m/g, date.getMinutes());
			format = format.replace(/s/g, date.getSeconds());
			format = format.replace(/SSS/g, date.getMilliseconds());
			format = format.replace(/E/g, dow[date.getDay()]);

			return format;
		},
		formatCurrency: function(amount, unit) {
			var monetaryUnit = {
				USD: "ドル",
				EUR: "ユーロ",
				JPY: "円"
			};

			return amount.toString().replace(/(\d)(?=(\d{3})+$)/g , "\$1,") + " " + monetaryUnit[unit];
		},
		showLoading: function() {
			$("#loading-background").popup("open");
			$.mobile.loading("show");
		},
		hideLoading: function() {
			$.mobile.loading("hide");
			$("#loading-background").popup("close");
		},
		getJSONP: function(url, data, callback) {
			$.ajax({
				type: "POST",
				url: url,
				data: data,
				dataType: "jsonp",
				beforeSend: function(jqXHR) {
					$f.showLoading();
				}
			}).done(function(data, textStatus, jqXHR) {
				callback(data);
			}).always(function(jqXHR, textStatus) {
				$f.hideLoading();
			});
		}
	}
}();
