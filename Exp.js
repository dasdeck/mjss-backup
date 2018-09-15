const { isObject } = require('lodash');

module.exports = class Exp {

    onCreate(rule) {
        if (rule.key) {
            if (rule.key === '@env') {
                this.env = rule;
                rule.process = function() {};
            } else if (isEvaluable(rule.key)) {
                rule._key = rule.key;
                Object.defineProperty(rule, 'key', { get: createExpression(rule.key, this.getContext()) });

            }

            if (rule.value && isEvaluable(rule.value)) {
                rule._value = rule.value;
                Object.defineProperty(rule, 'value', { get: createExpression(rule.value, this.getContext()) });
            }
        }

    }

    onProcess(rule, renderInfo) {
        const key = rule.key;
        const parentKey = renderInfo && renderInfo.rule && renderInfo.rule.key;

        if (parentKey === false) {
            renderInfo.children = [];
        } else if (isObject(key)) {
            rule.key.processChildren(renderInfo);
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