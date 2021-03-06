import { co2PerPound } from '../../components/footprint-form/data/food';
import ids from '../../utils/ids/index';

const weights = {
    chicken: 15,
    grains: 10,
    beef: 3,
    vegetables: 20,
    fruits: 3,
    cheese: 2
};


const total = Object.keys(weights).reduce((acc, val) => {
    return acc + (co2PerPound[val] * weights[val]);
}, 0);

export default {
    [ids.thanksgivingDinner]: total
}
