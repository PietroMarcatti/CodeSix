import { makeObservable, computed, action } from "mobx";

class ParallelCoordinatesPreferences{
    constructor(){
        this.PCaxes = [];
        this.PCcolor = undefined;
        makeObservable(this, {
            axes: computed,
            color: computed,
            setPreferenceById: action,
        });
    };

    get axes(){
        return this.PCaxes;
    };

    get color(){
        return this.PCcolor;
    }

    setPreferenceById(id, value){
        this[id] = value;
    };

    toJSON(){
        return{
            PCaxes : this.PCaxes ? this.PCaxes : "undefined",
            PCcolor : this.PCcolor ? this.PCcolor : "undefined",
        }
    };

    fromJSON(obj){
        this.PCaxes = obj.PCaxes === "undefined" ? undefined : obj.PCaxes;
        this.PCcolor = obj.PCcolor === "undefined" ? undefined : obj.PCcolor;
    };
}

export default ParallelCoordinatesPreferences;