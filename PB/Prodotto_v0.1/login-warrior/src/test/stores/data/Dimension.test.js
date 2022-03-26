import Dimension from "../../../stores/data/Dimension";

let dims;

describe("Dimension construction with default params", ()=>{
    beforeEach(()=>{
        dims= new Dimension();
    });

    test("Dimension must init properly", ()=>{
        expect(dims.value).toStrictEqual("dims");
        expect(dims.isChecked).toStrictEqual(true);
        expect(dims.isNumeric).toStrictEqual(true);
        expect(dims.isRedux).toStrictEqual(false);
    });
});

describe("Dimension construction with custom params", ()=>{
    beforeEach(()=>{
        dims= new Dimension("test", false, false, false);
    });

    test("Dimension must init properly", ()=>{
        expect(dims.value).toStrictEqual("test");
        expect(dims.isChecked).toStrictEqual(false);
        expect(dims.isNumeric).toStrictEqual(false);
        expect(dims.isRedux).toStrictEqual(false);
    });

    test("Setter and getter must work", ()=>{
        dims.isChecked= true;
        dims.isNumeric= true;
        dims.isRedux= true;

        expect(dims.value).toStrictEqual("test");
        expect(dims.isChecked).toStrictEqual(true);
        expect(dims.isNumeric).toStrictEqual(true);
        expect(dims.isRedux).toStrictEqual(true);
    });
});