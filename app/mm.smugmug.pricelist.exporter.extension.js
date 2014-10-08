function MMSmugMugPriceListExporterExtension() {
	var self = this,
		exportButtonId = 'mm_export_pricelist',
		tableCss = 'table{font-family:Arial,Helvetica,sans-serif;font-size:12px;width:80%;margin:20px auto 20px auto;color:#000;border:1px solid #ccc;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;background:#eaebec;-webkit-box-shadow:0 1px 2px #d1d1d1;-moz-box-shadow:0 1px 2px #d1d1d1;box-shadow:0 1px 2px #d1d1d1;text-shadow:1px 1px 0 #fff}table th{padding:10px;border-top:1px solid #fafafa;border-bottom:1px solid #e0e0e0;background:#ededed;background:-webkit-gradient(linear,left top,left bottom,from(#ededed),to(#ebebeb));background:-moz-linear-gradient(top,#ededed,#ebebeb)}table th:first-child{padding-left:20px;text-align:left}table tr:first-child th:first-child{-webkit-border-top-left-radius:3px;-moz-border-radius-topleft:3px;border-top-left-radius:3px}table tr:first-child th:last-child{-webkit-border-top-right-radius:3px;-moz-border-radius-topright:3px;border-top-right-radius:3px}table tr{padding-left:20px;text-align:center}table td:first-child{padding-left:20px;text-align:left;border-left:0}table td{padding:10px;border-top:1px solid #fff;border-bottom:1px solid #e0e0e0;border-left:1px solid #e0e0e0;background:#fafafa;min-width:100px}table tr:last-child td{border-bottom:0}table tr:last-child td:first-child{-webkit-border-bottom-left-radius:3px;-moz-border-radius-bottomleft:3px;border-bottom-left-radius:3px}table tr:last-child td:last-child{-webkit-border-bottom-right-radius:3px;-moz-border-radius-bottomright:3px;border-bottom-right-radius:3px}';
		exportPriceListMarkup = '<button type="button" disabled="disabled" class="sm-button sm-button-size-small sm-button-skin-accent" id="' + exportButtonId + '"><span class="sm-button-label">Export Pricelist</span></button>',
		htmlHeader = '<!DOCTYPE html><html><head><title>SmugMug Pricelist Export</title><style type="text/css">' + tableCss + '</style></head><body>';

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