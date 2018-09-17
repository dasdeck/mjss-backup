
/* eslint-env jest */

import Exp from '../src/plugins/Exp';

export default {
    options: (test) => ({plugins: [new Exp(test.opts)]}),
    tests: [
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
            desc: 'template name with dynamic value',
            jss: {
                '@env': {
                    'color': 'black'
                },
                '`.class`': {
                    '`color`': "/env('color')/"
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
        },
        {
            desc: 'test unique keys',
            opts: {forceUniqueKeys: true},
            jss: {
                '@env': {
                    mixin: {
                        color: "/arg('color')/"
                    },
                },
                '.class': {
                    "/call('mixin', {color: 'red'})/": {},
                    "/call('mixin', {color: 'blue'})/": {},
                    color: 'green'
                }
            },
            css: '.class{color:green;}'
        },
        {
            desc: 'test double keys',
            jss: {
                '@env': {
                    mixin: {
                        color: "/arg('color')/"
                    },
                },
                '.class': {
                    "/call('mixin', {color: 'red'})/": {},
                    "/call('mixin', {color: 'blue'})/": {}
                }
            },
            css: '.class{color:red;color:blue;}'
        },
        {
            desc: 'add custom context',
            opts: {
                context: {
                    var1: '10px',
                    concat: (...args) => args.join('')
                }
            },
            jss: {
                '.class': {
                    'width': "/env('var1')/",
                    "color": "/concat('r', 'e', 'd')/"
                }
            },
            css: '.class{width:10px;color:red;}'
        },
        {
            desc: 'call function by call',
            opts: {
                context: {
                    var1: '10px',
                    concat: (...args) => args.join('')
                }
            },
            jss: {
                '.class': {
                    'width': "/env('var1')/",
                    "color": "/call('concat', 'r', 'e', 'd')/"
                }
            },
            css: '.class{width:10px;color:red;}'
        }
    ]
};