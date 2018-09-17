
/* eslint-env jest */

import Sheet from '../src/Sheet';
import Nest from '../src/plugins/Nest';


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
        desc: 'advanced nest',
        jss: {
            '.classA, .classB': {
                '.class1, .class2': {
                    color: 'red'
                }
            }
        },
        css: '.classA .class1, .classB .class1, .classA .class2, .classB .class2{color:red;}'
    },
    {
        desc: 'simple nest keeping parent alive',
        jss: {
            '.class': {
                color: 'blue',
                '.class2': {
                    color: 'red'
                }
            }
        },
        css: '.class{color:blue;}.class .class2{color:red;}'
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
        desc: 'explicit nest',
        jss: {
            '.class': {
                '&.class2': {
                    color: 'red',
                    '& .class3': {
                        color: 'blue'
                    }
                }
            }
        },
        css: '.class.class2{color:red;}.class.class2 .class3{color:blue;}'
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
    },
    {
        desc: 'nesting below media query',
        jss: {
            '@media only screen and (max-width: 600px)': {
                '.class1': {
                    '.class2': {
                        'color': 'black'
                    }
                }
            }
        },
        css: '@media only screen and (max-width: 600px){.class1 .class2{color:black;}}'
    },

].forEach(row => {

    test(row.desc || row.css, () => {

        const options = {
            plugins: [new Nest]
        };

        const rule = new Sheet(options, row.jss);
        expect(rule.toString()).toBe(row.css);

    });

});

