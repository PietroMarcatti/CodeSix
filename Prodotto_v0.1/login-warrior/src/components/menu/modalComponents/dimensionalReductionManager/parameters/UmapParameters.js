import ReductionParameters from "./ReductionParameters";

export default class UmapParameters extends ReductionParameters{
    neighbours;
    localConnection;
    minDist;
    constructor(parameters){
        super(parameters);
        this.localConnection = parameters.localConnection;
        this.minDist = parameters.minDist;
        this.neighbours = parameters.neighbours;
    };

    getNeighbours(){
        return this.neighbours;
    }

    getLocalConnection(){
        return this.localConnection;
    };

    getMinDist(){
        return this.minDist;
    };
}