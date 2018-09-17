import Extend from '../src/plugins/Extend';
import Exp from '../src/plugins/Exp';
import Nest from '../src/plugins/Nest';

export default {
    options: (test) => ({plugins: [new Exp, new Extend, new Nest]}),
    tests: [
        {
            desc: 'test Extend can handle dynamic rules',
            jss: {
                '@env': {
                    mixin: {
                        width: '10px'
                    }
                },
                '.class1': {
                    '@extend .class': {},
                    'height': '10px'
                },
                '.class': {
                    'color': 'red',
                    "/call('mixin')/": {}
                }
            },
            css: '.class1{height:10px;}.class, .class1{color:red;width:10px;}'
        }
    ]
}