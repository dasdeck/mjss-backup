import ContainerRule from "../../ContainerRule";
import ContainerRuleRenderer from "../../ContainerRuleRenderer";
import {makeExpressive} from "./lib";
import MixinCall from "./MixinCall";
import Sheet from "../../Sheet";
import Rule from "../../Rule";
import Exp from ".";

export default class DynamicContainer extends ContainerRule {

    exp: Exp

    constructor(sheet:Sheet, data:any, key:string, parent:Rule, exp:Exp) {

        super(sheet, data, key, parent);
        this.exp = exp;
        const context = this.exp.getContext();

        makeExpressive(this, 'key', context);
    }
    render(renderer: ContainerRuleRenderer) {
        const key = this.key;
        if (key instanceof MixinCall) {
            key.render(renderer);
        } else if (key === true) {
            this.rules.render(renderer);
        } else if (key !== false) {
            super.render(renderer);
        }
    }
}