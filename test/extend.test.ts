
/* eslint-env jest */

import Rule from '../src/Rule';
import Extend from '../src/plugins/Extened';


[
    {
        desc: 'extend',
        jss: {
            '.class:hover': {
                'color': 'green'
            },
            '.class': {
                'color': 'blue'
            },
            '.class1': {
                '@extend .class': {},
                'color': 'black'
            }
        },
        css: '.class:hover{color:green;}.class, .class1{color:blue;}.class1{color:black;}'
    },
    {
        desc: 'extend all',
        jss: {
            '.class:hover': {
                'color': 'red'
            },
            '.class': {
                'color': 'blue'
            },
            '.class1': {
                '@extend .class': {
                    all: true
                },
                'color': 'black'
            }
        },
        css: '.class:hover, .class1:hover{color:red;}.class, .class1{color:blue;}.class1{color:black;}'
    }
].forEach(row => {

    test(row.desc || row.css, () => {

        const options = {
            plugins: [new Extend]
        };
        const rule = new Rule(options, row.jss);
        expect(rule.toString()).toBe(row.css);

    });

});

