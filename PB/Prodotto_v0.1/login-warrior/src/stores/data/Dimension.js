import { makeAutoObservable } from "mobx";

export default class Dimension{
    constructor(value = "dims", isChecked=true, isNumeric = true, isRedux = false){
        this._value= value;
        this._isChecked= isChecked;
        this._isNumeric= isNumeric;
        this._isRedux= isRedux;
        makeAutoObservable(this);
    }

    set isChecked(bool){
        this._isChecked=bool;
    }

    set isNumeric(bool){
        this._isNumeric=bool;
    }

    set isRedux(bool){
        this._isRedux=bool;
    }

    get isChecked(){
        return this._isChecked;
    }

    get isNumeric(){
        return this._isNumeric;
    }

    get isRedux(){
        return this._isRedux;
    }

    get value(){
        return this._value;
    }
}