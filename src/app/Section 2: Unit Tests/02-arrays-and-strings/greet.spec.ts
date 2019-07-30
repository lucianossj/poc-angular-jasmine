
import { greet } from './greet';

describe('greet', () => {

    it('Should include the name in the message', () => {

        expect(greet('Mosh')).toContain('Mosh');

    });

});