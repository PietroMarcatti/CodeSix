import Dimension from "../../../stores/data/Dimension";

export class CsvReaderVM{

    constructor(setLocalStates){
        this.setLocalStates = setLocalStates.bind(null);
    }

    handleOnDrop = data =>{
        let columns = data.data.shift(),
			parsedData = [],
			dimensions;
        console.log(columns)
		
		data.data.forEach(val =>{ //for each row
            
			if(val !== ""){ 
				let line = {};
				for (let i = 0; i < val.length; i++) { //for each value of the row
					switch(val[i]){
					case "":	//stringa vuota per dimensioni categoriche
						line[columns[i]] = undefined;
						break;
					case "NaN":	//NaN per dimensioni numeriche
						line[columns[i]] = NaN;
						break;
					default:
						line[columns[i]] = +val[i] || val[i]==="0" ? +val[i] : val[i];
						break;
					}
				}
				parsedData.push(line); 		
			}
		});
        
		dimensions = columns.map(dimName => {
			let d = new Dimension(dimName);
			d.isNumeric = +parsedData[0][dimName] || parsedData[0][dimName]===0 ? true : false;
			return d;
		});
		this.setLocalStates.bind(null)(parsedData, dimensions);
    };

    handleOnError(error){
        console.log("errore: ",error);
    }
}