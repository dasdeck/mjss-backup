import Tester from './tester';
import Sheet from '../src/Sheet';

test('simple', () => {
    const t = new Sheet({},{});
    expect(t).not.toBeNull();
})