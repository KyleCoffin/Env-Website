// Main source:  http://www.siliconvalleypower.com/for-residents/save-energy/name-energy-use-chart
// I updated the names a bit and validated some of the numbers.
// All in all it looks decent.  Might want to add more later.

// Water use is just from google.
// Combined refrigerator/freeze and desktop/monitor into 1 question

module.exports = [
  {
    "id": 10,
    "name": "house-furnace",
    "kwh": 10.5,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "heating",
    "type": "int",
    "validator": "hour-question",
    "subtext": "Standard full house heating system.",
    "": ""
  },
  {
    "id": 11,
    "name": "house-heat-pump",
    "kwh": 10,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "heating",
    "type": "int",
    "validator": "hour-question",
    "subtext": "Heat pumps transfer cool underground air from the outside",
    "": ""
  },
  {
    "id": 12,
    "name": "portable-heater",
    "kwh": 1.5,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "heating",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 13,
    "name": "central-air-conditioning",
    "kwh": 3,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooling",
    "type": "int",
    "validator": "hour-question",
    "subtext": "AC that's part of a house HVAC system",
    "": ""
  },
  {
    "id": 14,
    "name": "window-mount-air-conditioning",
    "kwh": 0.73,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooling",
    "type": "int",
    "validator": "hour-question",
    "subtext": "A single unit positioned in a window",
    "": ""
  },
  {
    "id": 15,
    "name": "ceiling-fan",
    "kwh": 0.075,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooling",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 16,
    "name": "portable-fan",
    "kwh": 0.03,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooling",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 17,
    "name": "speakers",
    "kwh": 0.05,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "entertainment",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 18,
    "name": "tv",
    "kwh": 0.48,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "entertainment",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 19,
    "name": "standard-lightbulbs",
    "kwh": 0.1,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "lighting",
    "type": "int",
    "validator": "<300",
    "subtext": "Total daily lightbulb hours",
    "": ""
  },
  {
    "id": 20,
    "name": "energy-efficient-lightbulbs",
    "kwh": 0.01,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "lighting",
    "type": "int",
    "validator": "<300",
    "subtext": "Total daily lightbulb hours",
    "": ""
  },
  {
    "id": 21,
    "name": "game-console",
    "kwh": 0.15,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "entertainment",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 22,
    "name": "computer-laptop",
    "kwh": 0.04,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "entertainment",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 23,
    "name": "computer-desktop",
    "kwh": 0.15,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "entertainment",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 24,
    "name": "hot-shower",
    "kwh": 12.7,
    "use-type": "hour",
    "water": 60,
    "sub-grouping": "cleanliness",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 25,
    "name": "oven",
    "kwh": 2.3,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooking",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 26,
    "name": "stove-top",
    "kwh": 1.25,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooking",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 27,
    "name": "toaster-oven",
    "kwh": 0.75,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooking",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 28,
    "name": "coffee-maker",
    "kwh": 0.12,
    "use-type": "hour",
    "water": "",
    "sub-grouping": "cooking",
    "type": "int",
    "validator": "hour-question",
    "subtext": "",
    "": ""
  },
  {
    "id": 29,
    "name": "refrigerator",
    "kwh": 215,
    "use-type": "monthly-own",
    "water": "",
    "sub-grouping": "cooking",
    "type": "bool",
    "validator": "",
    "subtext": "",
    "": ""
  },
  {
    "id": 30,
    "name": "energy-efficient-refrigerator",
    "kwh": 70,
    "use-type": "monthly-own",
    "water": "",
    "sub-grouping": "cooking",
    "type": "bool",
    "validator": "",
    "subtext": "",
    "": ""
  },
  {
    "id": 31,
    "name": "swimming-pool",
    "kwh": 806,
    "use-type": "monthly-own",
    "water": 3500,
    "sub-grouping": "entertainment",
    "type": "bool",
    "validator": "",
    "subtext": "",
    "": ""
  },
  {
    "id": 32,
    "name": "clothes-washer-with-cold-water",
    "kwh": 2.3,
    "use-type": "monthly-use",
    "water": 35,
    "sub-grouping": "cleanliness",
    "type": "int",
    "validator": "standard-int",
    "subtext": "",
    "": ""
  },
  {
    "id": 33,
    "name": "clothes-washer-with-hot-water",
    "kwh": 6.3,
    "use-type": "monthly-use",
    "water": 35,
    "sub-grouping": "cleanliness",
    "type": "int",
    "validator": "standard-int",
    "subtext": "",
    "": ""
  },
  {
    "id": 34,
    "name": "dryer",
    "kwh": 3,
    "use-type": "monthly-use",
    "water": "",
    "sub-grouping": "cleanliness",
    "type": "int",
    "validator": "standard-int",
    "subtext": "",
    "": ""
  },
  {
    "id": 35,
    "name": "dishwasher",
    "kwh": 1,
    "use-type": "monthly-use",
    "water": 6,
    "sub-grouping": "cooking",
    "type": "int",
    "validator": "standard-int",
    "subtext": "",
    "": ""
  }
];