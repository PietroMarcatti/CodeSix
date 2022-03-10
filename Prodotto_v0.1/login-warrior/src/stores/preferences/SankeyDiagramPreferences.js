import { makeAutoObservable } from "mobx";

class SankeyDiagramPreferences{
    constructor(){
        this.SDdistanceMatrixName= undefined;
        this.SDlinkColor= "grey";
        this.SDalign= "justify";

        makeAutoObservable(this);
    };

    get distanceMatrixName(){
        return this.SDdistanceMatrixName;
    };

    get linkColor(){
        return this.SDlinkColor;
    };

    get align(){
        return this.SDalign;
    }

    setPreferenceById(id, value){
        this[id] = value;
    };

    toJSON(){
        return{
            SDdistanceMatrixName : this.SDdistanceMatrixName ? this.SDdistanceMatrixName : "undefined",
            SDlinkColor : this.SDlinkColor ? this.SDlinkColor : "grey",
            SDalign : this.SDalign ? this.SDalign : "justify", 
        }
    };

    fromJSON(obj){
        this.SDdistanceMatrixName = obj.SDdistanceMatrixName === "undefined" ? undefined : obj.SDdistanceMatrixName;
        this.SDlinkColor = obj.SDlinkColor === "undefined" ? "grey" : obj.SDlinkColor;
        this.SDalign = obj.SDalign === "undefined" ? "justify" : obj.SDalign;
    };
}

export default SankeyDiagramPreferences;