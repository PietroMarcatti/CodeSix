import ReductionParameters from "./ReductionParameters";

export default class TsneParameters extends ReductionParameters{
    perplexity;
    epsilon;
    constructor(parameters){
        super(parameters);
        this.perplexity = parameters.perplexity;
        this.epsilon = parameters.epsilon;
    };

    getPerplexity(){
        return this.perplexity;
    };

    getEpsilon(){
        return this.epsilon;
    };
}
