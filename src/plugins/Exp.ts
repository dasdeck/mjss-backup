import Rule from '../Rule';
class MixinCall {

    constructor(rule, args, exp) {
        this.exp = exp;
        this.rule = rule;
        this.args = args;
    }

    render(renderer) {
        this.exp.stack.push(this.args);
        this.rule.rednerChildren(renderer);
        renderer._exp_composed = true;
        this.exp.stack.pop();

    }
}

export default class Exp {

    constructor(options = {forceUniqueKeys: false}) {
        this.options = options;
        this.stack = [];

        if (this.options.forceUniqueKeys) {
            this.onOutput = this.forceUniqueKeys;
        }
    }

    createRule(options, rules, key) {
        if (key === '@env') {
            this.env = new Rule.Muted(...arguments);
            return this.env;
        }
    }

    onCreate(rule) {
        if (rule.key) { // skip root rule
            const context = this.getContext();
            setExpression(rule, 'key', context);
            setExpression(rule, 'value', context);
        }
    }

    onProcess(renderer) {

        const rule = renderer.rule;
        const key = rule.key;

        if (key === false) {
            delete renderer.children;
        } else if (key instanceof MixinCall) {
            renderer.parent.children.pop();
            key.render(renderer.parent);
        }
    }

    forceUniqueKeys(renderer) {
        if (renderer._exp_composed) {
            let i = 0;
            renderer.children = Object.values(renderer.children.reduce((last, next) => {
                const key = next.children && next.children.length ? i++ : next.key;
                last[key] = next;
                return last;
            }, {}));
        }
    }

    getContext() {
        const self = this;
        return {
            arg(name) {
                return self.stack[self.stack.length - 1][name];
            },
            env(name) {
                return self.env.rules[name].value;
            },
            call(name, args = {}) {
                return new MixinCall(self.env.rules[name], args, self);
            }
        };
    }

};

function setExpression(rule, key, context) {
    const value = rule[key];
    if (value && isEvaluable(value)) {
        rule[`_exp_${key}`] = value;
        Object.defineProperty(rule, key, {get: createExpression(value, context)});
    }
}

function isEvaluable(str) {
    return isExpression(str) || isTemplate(str);
}

function isExpression(str) {
    return str[0] === '/';
}

function isTemplate(str) {
    return str[0] === '`';
}

function createExpression(str, context = {}) {
    const expr = isExpression(str) ? str.substr(1, str.length - 2) : str;
    return (new Function(`with (this) { return ${expr}; }`)).bind(context);
}