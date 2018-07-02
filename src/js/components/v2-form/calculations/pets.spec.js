import getPetsCo2 from './pets';
import { expect } from 'chai';

const FIXTURE_DATA = ['Dog', 'Cat', 'Hamster', 'Gecko', 'Turtle'];

describe('Pets Calculation', () => {
    it('should calculate the co2 of pets', done => {
        const { totalCo2 } = getPetsCo2(FIXTURE_DATA);
        expect(totalCo2).to.equal(33235);
        done();
    });
    it('should calculate the co2 of no pets', done => {
        const { totalCo2 } = getPetsCo2([]);
        expect(totalCo2).to.equal(0);
        done();
    });
});
