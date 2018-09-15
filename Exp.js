const { isObject } = require('lodash');

module.exports = class Exp {

    onCreate(rule) {
        if (rule.parent) {
            if (rule.key === '@env') {
                this.env = rule;
                rule.process = function() {};
            } else  {
                const context = this.getContext();
                setExpression(rule, 'key', context);
                setExpression(rule, 'value', context);
            }
        }

    }

    onProcess(renderInfo) {

        const rule = renderInfo.rule;
        const key = rule.key;

        if (key === false) {
            delete renderInfo.children;
        } else if (isObject(key)) {
            rule.key.processChildren(renderInfo.parent);
        }
    }

    getContext() {
        const self = this;
        return {
            env(name) {
                return self.env.rules[name].value;
            },
            call(name, args = {}) {
                return self.env.rules[name];
            }
        };
    }

};

function setExpression(rule, key, context) {
    const value = rule[key];
    if (value && isEvaluable(value)) {
        rule[`_exp_${key}`] = value;
        Object.defineProperty(rule, key, { get: createExpression(value, context) });
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