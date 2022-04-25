import DistanceMatrix from "../../../stores/data/DistanceMatrix";

let matrix;

describe("Test - DistanceMatrix class", ()=>{
    beforeEach(()=>{
        matrix= new DistanceMatrix();
    });

    test("Matrix must init properly", ()=>{
        expect(matrix.nodes).toStrictEqual([]);
        expect(matrix.links).toStrictEqual([]);
        expect(matrix.name).toStrictEqual("");
    });

    test("Change matrix name", () => {
        matrix.name= "matrix";

        expect(matrix.name).toStrictEqual("matrix");
    });

    test("Push nodes and link to the matrix", () => {
        let node1= {id:"node1", prop1:"test"};
        let node2= {id:"node2", prop1:"test"};
        let link= {source: "node1", target: "node2", value: 100};

        matrix.pushNode(node1);
        matrix.pushNode(node2);
        matrix.pushLink(link);

        expect(matrix.nodes).toStrictEqual([node1,node2]);
        expect(matrix.links).toStrictEqual([link]);
    });
});