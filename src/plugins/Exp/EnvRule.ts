import ContainerRule from "../../ContainerRule";
import ContainerRuleRenderer from "../../ContainerRuleRenderer";
import MixinCall from "./MixinCall";
import Exp from ".";

export default class EnvRule extends ContainerRule {

    context: any
    stack: Array<any> = []
    exp: Exp

    constructor(sheet, exp: Exp, data = {}) {
        super(sheet, {}, '@env'); // pass empty data to avoid loading rules immediatly
        this.exp = exp;


        this.exp.env = this;
        // load rules after setting exp.env member
        this.setRules(data);
    }

    render(renderer: ContainerRuleRenderer) {
        return '';
    }

    get(key) {
        if (this.exp.options.context && key in this.exp.options.context) {
            return this.exp.options.context[key];
        } else if (key in this.rules.rules) {
            const rule = this.rules.rules[key]
            return rule instanceof ContainerRule ? rule : rule.value;
        }
    }

    getContext() {
        const self = this;
        return {
            arg(name) {
                return self.stack[self.stack.length - 1][name];
            },
            env(name) {
                return self.get(name);
            },
            call(name, mixinArg = {}, ...args) {
                const callable = self.get(name)
                return callable instanceof ContainerRule ? new MixinCall(callable, mixinArg, self) : callable(mixinArg, ...args);
            },
            ...this.exp.options.context
        };
    }

}