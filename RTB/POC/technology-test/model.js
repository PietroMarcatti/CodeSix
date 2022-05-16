class Model{
	constructor(){
		this.dataset= null;
		this.columnNames= null;
	}

	async loadData(file){
		const response = await waitForPapaParse(file);
		console.log(response); // {data: [], errors: [], meta: {}}

		this.dataset= response.data;
		this.columnNames= response.meta.fields;
	}

	getColumnNames(){
		return this.columnNames;
	}

	getDataset(){
		return this.dataset;
	}
}
