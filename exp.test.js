
/* eslint-env jest */

const Rule = require('./Rule');
const Exp = require('./Exp');

const options = {
    plugins: [
        new Exp
    ]
};

[
    {
        desc: 'template key name',
        jss: {
            '`.class`': {
                '`color`': 'black'
            }
        },
        css: '.class{color:black;}'
    },
    {
        desc: 'global mixin',
        jss: {
            '@env': {
                mixin: {
                    '.class': {
                        'color': 'black'
                    }
                }
            },
            "/call('mixin')/": {}
        },
        css: '.class{color:black;}'
    },
    {
        desc: 'local mixin',
        jss: {
            '@env': {
                mixin: {
                    'color': 'black'
                }
            },
            '.class': {
                "/call('mixin')/": {}
            }
        },
        css: '.class{color:black;}'
    },
    {
        desc: 'conditional (true)',
        jss: {
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
        },
        css: '.class{color:black;}'
    },
    {
        desc: 'conditional (false)',
        jss: {
            '@env': {
                var1: 0,
                mixin: {
                    "/env('var1') === 1/": {
                        'color': 'black'
                    }
                }
            },
            '.class': {
                'color': 'red',
                "/call('mixin')/": {}
            }
        },
        css: '.class{color:red;}'
    },
    {
        desc: 'dynamic values',
        jss: {
            '@env': {
                var1: '10px',
            },
            '.class': {
                'width': "/env('var1')/"
            }
        },
        css: '.class{width:10px;}'
    },
    {
        desc: 'mixin with params',
        jss: {
            '@env': {
                mixin: {
                    color: "/arg('color')/"
                },
            },
            '.class': {
                "/call('mixin', {color: 'red'})/": {}
            }
        },
        css: '.class{color:red;}'
    }
].forEach(row => {

    test(row.desc || row.css, () => {

        const rule = new Rule(options, row.jss);
        expect(rule.toString()).toBe(row.css);

    });

});

