$(function(){

	$('.sm-u').click();
	$('.sm-u.sm-pricelistproduct-actions').click();

	// Price List Groups
	var priceList = 'SmugMug Price List\n';
	priceList += 'Group\tProduct\tDescription\tBase Price\tProfit\tPrice\n';
	$('.sm-pricelistgroup:not([hidden])').each(function(){
		var $priceListGroup = $(this),
			priceListGroupName = $priceListGroup.find('.sm-u').first().text();
		priceList += priceListGroupName +'\n';

		// Price List Products
		var $priceListProducts = $priceListGroup.find('.sm-pricelistproduct');
		$priceListProducts.each(function(){
			var $priceListProduct = $(this),
				priceListProductName = $priceListProduct.find('.sm-u').first().text();
			priceList += '\t' + priceListProductName +'\n';

			var $priceListSkus = $priceListProduct.find('.sm-pricelistsku');
			$priceListSkus.each(function(){
				var $priceListSku = $(this),
					description = $priceListSku.find('.sm-tcol0').text(),
					basePrice = $priceListSku.find('.sm-tcol1').text(),
					profit = $priceListSku.find('.sm-tcol2 input').val(),
					price = $priceListSku.find('.sm-tcol3 input').val();
				priceList += '\t\t' + description + '\t' + basePrice + '\t$' + profit + '\t$' + price + '\n';
			});
		});
	});
	console.log(priceList);
	
});