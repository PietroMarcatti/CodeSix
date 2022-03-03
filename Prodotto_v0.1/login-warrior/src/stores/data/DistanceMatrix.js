class DistanceMatrix {
    #nodes = [];
    #links = [];
    #name = "";

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

    pushNode(node){
        this.#nodes.push(node);
    };

    pushLink(link){
        this.#links.push(link);
    };

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