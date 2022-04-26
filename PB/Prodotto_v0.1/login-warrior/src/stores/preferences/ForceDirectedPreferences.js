import {makeAutoObservable} from "mobx";

class ForceDirectedPreferences{
    constructor(){
        this.FDmatrix=undefined;
        this.FDcolor = undefined;
        this.FDdistMax = Infinity;
        this.FDdistMin = 0;
        makeAutoObservable(this);
    }

    get matrix(){
        return this.FDmatrix;
    }

    get distMax(){
		return this.FDdistMax;
	}

	get distMin(){
		return this.FDdistMin;
	}

	get color(){
		return this.FDcolor;
	}
	
	set color(value){
		this.FDcolor = value;
	}

	set distMin(value){
		this.FDdistMin = value;
	}

	set distMax(value){
		this.FDdistMax = value;
	}

	set matrix(value){
		this.FDmatrix = value;
	}


    toJSON(){
        return{
            FDmatrix : this.FDmatrix ? this.FDmatrix : "undefined",
            FDcolor : this.FDcolor ? this.FDcolor : "undefined",
            FDdistMax : this.FDdistMax ? this.FDdistMax : "undefined",
            FDdistMin : this.FDdistMin ? this.FDdistMin : "undefined",
        }
    };

    fromJSON(obj){
        this.FDmatrix = obj.FDmatrix === "undefined" ? undefined : obj.FDmatrix;
        this.FDcolor = obj.FDcolor === "undefined" ? undefined : obj.FDcolor;
        this.FDdistMax = obj.FDdistMax === "Infinity" ? Infinity : obj.FDdistMax;
        this.FDdistMin = obj.FDdistMin;
    };
}

export default ForceDirectedPreferences;