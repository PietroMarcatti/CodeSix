class Model{
	constructor(){
		this.dataset= null;
		this.columnNames= null;
	}

	async loadData(file){
	    //Wait until the file isn't full loaded
	    var data = await file.text(); 

	    this.dataset= d3.csvParse(data);
	    this.columnNames= this.dataset.columns;
	}

	getColumnNames(){
		return this.columnNames;
	}

	getDataset(){
		return this.dataset;
	}
}
