import {values} from "lodash";
import Exp from ".";
import ContainerRule from "../../ContainerRule";
import ContainerRuleRenderer from "../../ContainerRuleRenderer";
import RuleRender from "../../RuleRenderer";

export default class MixinCall {

    exp: Exp
    args: Array<any>
    rule: ContainerRule

    constructor(rule:ContainerRule, args:any, exp:Exp) {
        this.exp = exp;
        this.rule = rule;
        this.args = args;
    }

    render(renderer:ContainerRuleRenderer) {

        this.exp.stack.push(this.args);

        this.rule.rules.render(renderer);

        if (this.exp.options.forceUniqueKeys) {

            const toString = renderer.toString;
            renderer.toString = function() {
                forceUniqueKeys(this);
                return toString.call(this);
            }
        }

        this.exp.stack.pop();

    }
}

function forceUniqueKeys(renderer:ContainerRuleRenderer) {
    let i = 0;
    renderer.children = values(renderer.children.reduce((last, next) => {
        if (next instanceof RuleRender) {
            last[next.key] = next;
        } else if(next instanceof ContainerRuleRenderer) { //containerRules can be double
            last[i++] = next;
        }
        return last;
    }, {}));
}
