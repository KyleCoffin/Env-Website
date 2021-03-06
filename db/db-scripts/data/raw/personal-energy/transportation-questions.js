const transportationQuestions = [
    {
        name: 'Do you drive?',
        "use-type": "transportation",
        type: 'bool',
        value: 'on',
        id: 9
    },
    {
        name: 'What\'s the fuel for your car?',
        "use-type": "transportation",
        "selectOptions": ["Gasoline", "Diesel", "Electric"],
        value: "Gasoline",
        type: 'dropdown',
        id: 1,
        hideIf: ['noCar']
    },
    {
        name: 'What\'s the MPG of your car?',
        "use-type": "transportation",
        validator: "mpg",
        type: 'int',
        id: 2,
        hideIf: ['noCar', 'electricCar']
    },
    {
        name: 'On average, how many miles do you drive for work, school, and errands each day?',
        "use-type": "transportation",
        type: 'int',
        id: 3,
        value: 0,
        hideIf: ['noCar']
    },
    {
        name: 'Do you carpool?',
        "use-type": "transportation",
        type: 'bool',
        id: 4,
        hideIf: ['noCar']
    },
    {
        name: 'Within the last year, how many times did you take a roadtrip or drive for an extended distance?',
        "use-type": "transportation",
        validator: "non-zero-int",
        type: 'int',
        id: 5,
        value: 0,
        hideIf: ['noCar']
    },
    {
        name: 'How far is your average roadtrip?',
        "use-type": "transportation",
        type: 'int',
        id: 6,
        value: 0,
        hideIf: ['noCar']
    },
    {
        name: 'Do you usually carpool for roadtrips?',
        "use-type": "transportation",
        type: 'bool',
        id: 7,
        hideIf: ['noCar']
    },
    {
        name: 'How many miles do you bus each month?',
        "use-type": "transportation",
        type: 'int',
        value: 0,
        id: 10
    },
    {
        name: 'How many miles do you ride on the train each month?',
        "use-type": "transportation",
        type: 'int',
        value: 0,
        id: 11
    },
    {
        name: 'Within the last year, how many miles did you fly?',
        belowText: 'The US is about 3,000 miles wide and 1,000 miles long.',
        belowText2: 'Its about 5,500 miles from LA to Tokyo and 3,500 from New York to Paris',
        subtext: 'Planes get about 90 mpg per person!',
        "use-type": "transportation",
        type: 'int',
        value: 0,
        id: 8
    }
];

module.exports = { transportationQuestions };