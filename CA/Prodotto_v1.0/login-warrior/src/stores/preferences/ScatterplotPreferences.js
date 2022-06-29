import { makeAutoObservable } from "mobx";

class ScatterplotPreferences{
    constructor(){
        this.SPaxisX = undefined;
        this.SPaxisY = undefined;
        this.SPpointSize = undefined;
        this.SPcolor = undefined;
        this.SPshape = undefined;
        
        makeAutoObservable(this);
    };

    get axisX(){
        return this.SPaxisX;
    };

    get axisY(){
        return this.SPaxisY;
    };

    get pointSize(){
        return this.SPpointSize;
    };

    get color(){
        return this.SPcolor;
    };

    get shape(){
        return this.SPshape;
    };

    setPreferenceById(id, value){
        this[id] = value;
    };

    toJSON(){
        return{
            SPaxisX : this.SPaxisX ? this.SPaxisX : "undefined",
            SPaxisY : this.SPaxisY ? this.SPaxisY : "undefined",
            SPpointSize : this.SPpointSize ? this.SPpointSize : "undefined",
            SPcolor : this.SPcolor ? this.SPcolor : "undefined",
            SPshape : this.SPshape ? this.SPshape : "undefined"
        }
    };

    fromJSON(obj){
        this.SPaxisX = obj.SPaxisX === "undefined" ? undefined : obj.SPaxisX;
        this.SPaxisY = obj.SPaxisY === "undefined" ? undefined : obj.SPaxisY;
        this.SPpointSize = obj.SPpointSize === "undefined" ? undefined : obj.SPpointSize;
        this.SPcolor = obj.SPcolor === "undefined" ? undefined : obj.SPcolor;
        this.SPshape = obj.SPshape === "undefined" ? undefined : obj.SPshape;
    };
}

export default ScatterplotPreferences;