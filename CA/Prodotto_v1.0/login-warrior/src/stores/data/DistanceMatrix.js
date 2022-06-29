import { DistanceType } from "../../utils";

class DistanceMatrix {
    #nodes = [];
    #links = [];
    #name = "";
    #distanceType=DistanceType.Euclidean;
    #dimensionsToRedux = [];
    #normalize = false;

    get nodes(){
        return this.#nodes;
    };

    get links(){
        return this.#links;
    };

    get name(){
        return this.#name;
    };

    set name(value){
        this.#name = value;
    };

    get distanceType(){
        return this.#distanceType;
    }

    set distanceType(value){
        this.#distanceType=value;
    }

    get dimensionsToRedux(){
        return this.#dimensionsToRedux;
    }

    set dimensionsToRedux(value){
        this.#dimensionsToRedux = value;
    }

    get normalize(){
        return this.#normalize;
    }

    set normalize(value){
        this.#normalize = value;
    }

    pushNode(node){
        this.#nodes.push(node);
    };

    pushLink(link){
        this.#links.push(link);
    };

    clearLinks(){
        this.#links.splice(0,this.#links.length)
    }

    clearNodes(){
        this.#nodes.splice(0,this.#nodes.length)
    }


    toJSON(){
        return {
    		nodes: this.nodes,
    		link: this.links,
    		name: this.name,
    	};
    };

    fromJSON(obj){
    	this.#links = obj.link;
    	this.#name = obj.name;
    	this.#nodes = obj.nodes;
    };
}

export default DistanceMatrix;