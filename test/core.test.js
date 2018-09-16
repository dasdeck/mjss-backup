
/* eslint-env jest */

const Rule = require('../src/Rule');

const options = {
    plugins: []
};

[
    {
        desc: 'static class',
        jss: {
            '.class': {
                'color': 'black'
            }
        },
        css: '.class{color:black;}'
    },
    {
        desc: 'conditionals',
        jss: {
            '@media only screen and (max-width: 600px)': {
                '.class1': {
                    'color': 'black'
                }
            }
        },
        css: '@media only screen and (max-width: 600px){.class1{color:black;}}'
    }
].forEach(row => {

    test(row.desc || row.css, () => {
        const rule = new Rule(options, row.jss);
        expect(rule.toString()).toBe(row.css);

    });

});

