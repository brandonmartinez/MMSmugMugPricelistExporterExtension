function MMSmugMugPriceListExporterExtension() {
	var self = this,
		exportButtonId = 'mm_export_pricelist',
		exportPriceListMarkup = '<button type="button" disabled="disabled" class="sm-button sm-button-size-small sm-button-skin-accent" id="' + exportButtonId + '"><span class="sm-button-label">Export Pricelist</span></button>',
		htmlHeader = '<html><head><title>SmugMug Pricelist Export</title><style type="text/css">table a:link{color:#666;font-weight:700;text-decoration:none}table a:visited{color:#999;font-weight:700;text-decoration:none}table a:active,table a:hover{color:#bd5a35;text-decoration:underline}table{font-family:Arial,Helvetica,sans-serif;color:#666;font-size:12px;text-shadow:1px 1px 0 #fff;background:#eaebec;margin:20px;border:1px solid #ccc;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;-moz-box-shadow:0 1px 2px #d1d1d1;-webkit-box-shadow:0 1px 2px #d1d1d1;box-shadow:0 1px 2px #d1d1d1}table th{padding:21px 25px 22px;border-top:1px solid #fafafa;border-bottom:1px solid #e0e0e0;background:#ededed;background:-webkit-gradient(linear,left top,left bottom,from(#ededed),to(#ebebeb));background:-moz-linear-gradient(top,#ededed,#ebebeb)}table th:first-child{text-align:left;padding-left:20px}table tr:first-child th:first-child{-moz-border-radius-topleft:3px;-webkit-border-top-left-radius:3px;border-top-left-radius:3px}table tr:first-child th:last-child{-moz-border-radius-topright:3px;-webkit-border-top-right-radius:3px;border-top-right-radius:3px}table tr{text-align:center;padding-left:20px}table td:first-child{text-align:left;padding-left:20px;border-left:0}table td{padding:18px;border-top:1px solid #fff;border-bottom:1px solid #e0e0e0;border-left:1px solid #e0e0e0;background:#fafafa;background:-webkit-gradient(linear,left top,left bottom,from(#fbfbfb),to(#fafafa));background:-moz-linear-gradient(top,#fbfbfb,#fafafa)}table tr.even td{background:#f6f6f6;background:-webkit-gradient(linear,left top,left bottom,from(#f8f8f8),to(#f6f6f6));background:-moz-linear-gradient(top,#f8f8f8,#f6f6f6)}table tr:last-child td{border-bottom:0}table tr:last-child td:first-child{-moz-border-radius-bottomleft:3px;-webkit-border-bottom-left-radius:3px;border-bottom-left-radius:3px}table tr:last-child td:last-child{-moz-border-radius-bottomright:3px;-webkit-border-bottom-right-radius:3px;border-bottom-right-radius:3px}table tr:hover td{background:#f2f2f2;background:-webkit-gradient(linear,left top,left bottom,from(#f2f2f2),to(#f0f0f0));background:-moz-linear-gradient(top,#f2f2f2,#f0f0f0)}</style></head><body><h1>SmugMug Pricelist Export</h1>';

	function exportToConsole(){
		// Price List Groups

		var html = htmlHeader;

		var priceList = '<table cellspacing="0"><thead><tr><th>Group</th><th>Product</th><th>Description</th><th>Base Price</th><th>Profit</th><th>Price</th></tr></thead><tbody>';
		$('.sm-pricelistgroup:not([hidden])').each(function(){
			var $priceListGroup = $(this),
				priceListGroupName = $priceListGroup.find('.sm-u').first().text();

			// Price List Products
			var $priceListProducts = $priceListGroup.find('.sm-pricelistproduct');
			$priceListProducts.each(function(){
				var $priceListProduct = $(this),
					priceListProductName = $priceListProduct.find('.sm-u').first().text();

				var $priceListSkus = $priceListProduct.find('.sm-pricelistsku');
				$priceListSkus.each(function(){
					var $priceListSku = $(this),
						description = $priceListSku.find('.sm-tcol0').text(),
						basePrice = $priceListSku.find('.sm-tcol1').text(),
						profit = $priceListSku.find('.sm-tcol2 input').val(),
						price = $priceListSku.find('.sm-tcol3 input').val();
					priceList += '<tr><th>' + priceListGroupName + ' </th><th>' + priceListProductName + ' </th><th>' + description + '</th><td>' + basePrice + '</td><td>$' + profit + '</td><td>$' + price + '</td></tr>';
				});
			});
		});

		priceList += "</tbody></table>"
		
		html += priceList;
		html += '</body></html>';

		var w = window.open();
		$(w.document.body).html(html);
	}

	function modifyHeader(){
		var $header = $('#sm-pricelist-editor-hd'),
			$buttonColumn = $header.find('.sm-u').last();

		// Remove Width Restriction
		$buttonColumn.removeClass('sm-w-250');

		// Add our button
		$buttonColumn.append(exportPriceListMarkup);
	}

	function expandPricelists(){
		// Ugly hack, but timing is messed up
		setTimeout(function(){
			$('.sm-u').click();
		}, 500);
		setTimeout(function(){
			$('.sm-u.sm-pricelistproduct-actions').click();
		}, 1000);
	}

	function registerEventHandlers(){
		setTimeout(function(){
			var $exportButton = $('#' + exportButtonId);
			$exportButton.on('click', exportToConsole);
			$exportButton.removeAttr('disabled');
		}, 2000);
	}

	self.init = function(){
		console.log('Modifying Header');
		modifyHeader();
		console.log('Expanding Pricelists');
		expandPricelists()
		console.log('Registering Export Handler');
		registerEventHandlers();
	};
}

$(function(){
	var exporter = new MMSmugMugPriceListExporterExtension();
	exporter.init();
});