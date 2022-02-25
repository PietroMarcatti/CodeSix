import ReductionParameters from "./ReductionParameters";

export default class UmapParameters extends ReductionParameters{
    localConnection;
    minDist;
    constructor(parameters){
        super(parameters);
        this.localConnection = parameters.localConnection;
        this.minDist = parameters.minDist;
    };

    getLocalConnection(){
        return this.localConnection;
    };

    getMinDist(){
        return this.minDist;
    };
}