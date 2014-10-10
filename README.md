# SmugMug Pricelist Exporter Google Chrome Extension

A Google Chrome extension to export your SmugMug pricelists to a tabular, and more importantly, copyable format. Modifies the pricelist UI to expand all products and SKUs, and then adds an export button to the header.

## How To Install

After cloning the repository locally (or just [downloading the ZIP archive](https://github.com/brandonmartinez/MMSmugMugPricelistExporterExtension/archive/master.zip)), you can either install the pre-packed CRX file or load it as an unpacked extension (e.g. you want to further develop the extension):


### CRX
1. Drag and drop the .CRX file from the `packed` directory onto the `chrome://extensions` page
2. Click the Install button in the prompt

### Folder
1. In Chrome, open `chrome://extensions/`
2. Check `Developer mode` if it's not
3. Click `Load unpacked extension…`
4. Navigate to the `app` folder and click OK

## How to Use

After installing the extension using one of the two above methods, do the following:

1. Navigate to and edit a [SmugMug Pricelist](https://secure.smugmug.com/sales/pricing/)
2. Wait a few seconds for the UI to expand and for the new `Export Pricelist` button to activate (Fig. 1)
3. Click `Export Pricelist` to bring up a new window with a tabular-formatted pricelist (Fig. 2)
4. Optional: copy all content on the page and paste it into a new Excel workbook (Fig. 3). You can now style and format your pricelist anyway you choose. Tip: use a pivot table to remove duplicate product groups and organize your pricelist.

### Fig. 1
![](https://raw.githubusercontent.com/brandonmartinez/MMSmugMugPricelistExporterExtension/master/screenshots/export-pricelist.png)

### Fig. 2
![](https://raw.githubusercontent.com/brandonmartinez/MMSmugMugPricelistExporterExtension/master/screenshots/pricelist-popup.png)

### Fig. 3
![](https://raw.githubusercontent.com/brandonmartinez/MMSmugMugPricelistExporterExtension/master/screenshots/excel-pricelist.png)
