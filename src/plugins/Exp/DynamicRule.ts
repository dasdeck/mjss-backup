import Rule from "../../Rule";
import {makeExpressive} from "./lib";

export default class DynamicRule extends Rule {
    constructor(sheet, data, key, parent, exp) {
        super(sheet, data, key, parent);

        const context = exp.getContext();

        makeExpressive(this, 'key', context);
        makeExpressive(this, 'value', context);
    }
}

