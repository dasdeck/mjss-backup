
import * as suites from '.';
import {pickBy, isObject, forEach} from 'lodash';
import Sheet from '../src/Sheet';

forEach(pickBy(suites, suite => isObject(suite) && suite.tests), (block:any, name) => {

    describe(name, () => {

        block.tests.forEach(row => {

            test(row.desc || row.css, () => {

                const options = block.options ? block.options(row) : {plugins: []};

                const rule = new Sheet(options, row.jss);
                expect(rule.toString()).toBe(row.css);

            });

        });
    });
});
