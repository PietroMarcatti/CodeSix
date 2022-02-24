import { makeAutoObservable } from "mobx";

class SPMPreferences{
    constructor(){
        this.axis1 = undefined;
        this.axis2 = undefined;
        this.size = undefined;
        this.color = undefined;
        this.shape = undefined;
        makeAutoObservable(this);
    };

    get axes(){
        return [this.axis1, this.axis2];
    };

    get size(){
        return this.size;
    };

    get color(){
        return this.color;
    };

    get shape(){
        return this.shape;
    };

    setPreferenceById(id, value){
        this[id] = value;
    };

    toJSON(){
        return{
            axis1 : this.axis1 ? this.axis1 : "undefined",
            axis2 : this.axis2 ? this.axis2 : "undefined",
            size : this.size ? this.size : "undefined",
            color : this.color ? this.color : "undefined",
            shape : this.shape ? this.shape : "undefined"
        }
    };

    fromJSON(obj){
        this.axis1 = obj.axis1 === "undefined" ? undefined : obj.axis1;
        this.axis2 = obj.axis2 === "undefined" ? undefined : obj.axis2;
        this.size = obj.size === "undefined" ? undefined : obj.size;
        this.color = obj.color === "undefined" ? undefined : obj.color;
        this.shape = obj.shape === "undefined" ? undefined : obj.shape;
    };
}

export default SPMPreferences;