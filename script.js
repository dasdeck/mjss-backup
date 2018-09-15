const Rule = require('./Rule');
const Exp = require('./Exp');

const options = {
    plugins: [
        new Exp
    ]
};

const style = {
    '@env': {
        var1: 1,
        mixin: {
            "/env('var1') === 1/": {
                'color': 'black'
            }
        }
    },
    '.class': {
        "/call('mixin')/": {}
    }
};

const rule = new Rule(options, style);

console.log(rule.toString());