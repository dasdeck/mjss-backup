
/* eslint-env jest */

const Rule = require('./Rule');
const Nest = require('./Nest');

const options = {
    plugins: [new Nest]
};

[
    {
        desc: 'simple nest',
        jss: {
            '.class': {
                '.class2': {
                    color: 'red'
                }
            }
        },
        css: '.class .class2{color:red;}'
    },
    {
        desc: 'deep nest',
        jss: {
            '.class': {
                '.class2': {
                    color: 'red',
                    '.class3': {
                        color: 'blue'
                    }
                }
            }
        },
        css: '.class .class2{color:red;}.class .class2 .class3{color:blue;}'
    },
    {
        desc: 'media query non nesting',
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

