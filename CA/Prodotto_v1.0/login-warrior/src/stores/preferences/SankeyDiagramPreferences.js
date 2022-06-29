import { makeAutoObservable } from "mobx";

class SankeyDiagramPreferences{
    constructor(){
        this.SDdistanceMatrixName= undefined;
        this.SDlinkColor= "grey";
        this.SDalign= "justify";
        this.SDdistMax = Infinity;
        this.SDdistMin = 0;
        makeAutoObservable(this);
    };

    get distanceMatrixName(){
        return this.SDdistanceMatrixName;
    };

    get distMax(){
		return this.SDdistMax;
	}

	get distMin(){
		return this.SDdistMin;
	}

    get linkColor(){
        return this.SDlinkColor;
    };

    get align(){
        return this.SDalign;
    }

    set distMin(value){
		this.SDdistMin = value;
	}

	set distMax(value){
		this.SDdistMax = value;
	}

    set matrix(value){
		this.SDdistanceMatrixName = value;
	}


    setPreferenceById(id, value){
        this[id] = value;
    };

    toJSON(){
        return{
            SDdistanceMatrixName : this.SDdistanceMatrixName ? this.SDdistanceMatrixName : "undefined",
            SDlinkColor : this.SDlinkColor ? this.SDlinkColor : "grey",
            SDalign : this.SDalign ? this.SDalign : "justify",
            SDdistMax : this.SDdistMax ? this.SDdistMax : "undefined",
            SDdistMin : this.SDdistMin ? this.SDdistMin : "undefined",
        }
    };

    fromJSON(obj){
        this.SDdistanceMatrixName = obj.SDdistanceMatrixName === "undefined" ? undefined : obj.SDdistanceMatrixName;
        this.SDlinkColor = obj.SDlinkColor === "undefined" ? "grey" : obj.SDlinkColor;
        this.SDalign = obj.SDalign === "undefined" ? "justify" : obj.SDalign;
        this.SDdistMax = obj.SDdistMax === "Infinity" ? Infinity : obj.SDdistMax;
        this.SDdistMin = obj.SDdistMin;
    };
}

export default SankeyDiagramPreferences;