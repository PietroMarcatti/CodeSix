import { makeObservable, computed, action} from "mobx";

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
        console.log("PC preference store: "+this.PCaxes)
        return this.PCaxes;
    };

    get color(){
        return this.PCcolor;
    }

    setPreferenceById(id, value){
        this[id] = value;
        console.log("PC preference store assegno: "+this[id])
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