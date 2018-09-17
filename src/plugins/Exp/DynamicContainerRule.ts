import ContainerRule from "../../ContainerRule";
import ContainerRuleRenderer from "../../ContainerRuleRenderer";
import {makeExpressive} from "./lib";
import MixinCall from "./MixinCall";

export default class DynamicContainer extends ContainerRule {

    constructor(sheet, data, key, parent, exp) {
        super(sheet, data, key, parent);

        const context = exp.getContext();

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