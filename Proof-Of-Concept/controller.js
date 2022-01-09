/*
* @brief Function to verify that the input file has one of the allowed extensions
* @param inputID => String, input tag id used to upload the file
* @param exts => Strings Array, allowed extensions for the file (eg. ['.csv', '.txt'])
* @return => Bool, true if the file has one of the allowed extensions, false otherwise
*/
function hasExtension(inputID, exts) {
    var fileName = document.getElementById(inputID).value;
    return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
}

class Controller{
	constructor(model, view){
		this.model= model;
		this.view= view;
		
		this.view.getLoadFileButton().addEventListener('click', async function(e){
			if(!hasExtension('csv-data', ['.csv'])){
    			alert("Selezionare un file .csv");
    			return;
    		}

    		//Wait until the dataset isn't full loaded
			await model.loadData(document.getElementById('csv-data').files[0]);

			view.showScatterPlot(model.getDataset(), model.getColumnNames()[0], model.getColumnNames()[1]);
		});
	}
}