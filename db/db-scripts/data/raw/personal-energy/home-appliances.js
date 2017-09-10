// Main source:  http://www.siliconvalleypower.com/for-residents/save-energy/name-energy-use-chart
// I updated the names a bit and validated some of the numbers.
// All in all it looks decent.  Might want to add more later.

module.exports = [
  {
    "name": "house-furnace",
    "kwh": 10.5,
    "use-type": "hour",
    "sub-grouping": "heating",
    "use-bool": "",
    "subtext": "Standard full house heating system.  Usually electric or natural gas"
  },
  {
    "name": "house-heat-pump",
    "kwh": 10,
    "use-type": "hour",
    "sub-grouping": "heating",
    "use-bool": "",
    "subtext": "Heat pumps generally transfer cool underground air from the outside to cool a house"
  },
  {
    "name": "portable-heater",
    "kwh": 1.5,
    "use-type": "hour",
    "sub-grouping": "heating",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "central-air-conditioning",
    "kwh": 3,
    "use-type": "hour",
    "sub-grouping": "cooling",
    "use-bool": "",
    "subtext": "AC that's part of a house HVAC system"
  },
  {
    "name": "window-mount-air-conditioning",
    "kwh": 0.73,
    "use-type": "hour",
    "sub-grouping": "cooling",
    "use-bool": "",
    "subtext": "A single unit positioned in a window"
  },
  {
    "name": "ceiling-fan",
    "kwh": 0.075,
    "use-type": "hour",
    "sub-grouping": "cooling",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "portable-fan",
    "kwh": 0.03,
    "use-type": "hour",
    "sub-grouping": "cooling",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "speakers",
    "kwh": 0.05,
    "use-type": "hour",
    "sub-grouping": "entertainment",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "tv",
    "kwh": 0.48,
    "use-type": "hour",
    "sub-grouping": "entertainment",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "energy-efficient-lightbulbs",
    "kwh": 0.01,
    "use-type": "hour",
    "sub-grouping": "other",
    "use-bool": "",
    "subtext": "Enter the total number of light bulbs times the number of hours each one is on"
  },
  {
    "name": "standard-lightbulb",
    "kwh": 0.1,
    "use-type": "hour",
    "sub-grouping": "other",
    "use-bool": "",
    "subtext": "Enter the total number of light bulbs times the number of hours each one is on"
  },
  {
    "name": "game-console",
    "kwh": 0.15,
    "use-type": "hour",
    "sub-grouping": "entertainment",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "computer-desktop",
    "kwh": 0.15,
    "use-type": "hour",
    "sub-grouping": "entertainment",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "computer-laptop",
    "kwh": 0.04,
    "use-type": "hour",
    "sub-grouping": "entertainment",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "computer-monitor",
    "kwh": 0.08,
    "use-type": "hour",
    "sub-grouping": "entertainment",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "hot-shower",
    "kwh": 12.7,
    "use-type": "hour",
    "sub-grouping": "cleanliness",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "hair-dryer",
    "kwh": 1.5,
    "use-type": "hour",
    "sub-grouping": "cleanliness",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "oven",
    "kwh": 2.3,
    "use-type": "hour",
    "sub-grouping": "cooking",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "stove-top",
    "kwh": 1.25,
    "use-type": "hour",
    "sub-grouping": "cooking",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "toaster-oven",
    "kwh": 0.75,
    "use-type": "hour",
    "sub-grouping": "cooking",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "coffee-maker",
    "kwh": 0.12,
    "use-type": "hour",
    "sub-grouping": "cooking",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "refridgerator",
    "kwh": 125,
    "use-type": "monthly-own",
    "sub-grouping": "cooking",
    "use-bool": "bool",
    "subtext": ""
  },
  {
    "name": "energy-efficient-refridgerator",
    "kwh": 37.5,
    "use-type": "monthly-own",
    "sub-grouping": "cooking",
    "use-bool": "bool",
    "subtext": ""
  },
  {
    "name": "freezer",
    "kwh": 90,
    "use-type": "monthly-own",
    "sub-grouping": "cooking",
    "use-bool": "bool",
    "subtext": ""
  },
  {
    "name": "tivo",
    "kwh": 28.8,
    "use-type": "monthly-own",
    "sub-grouping": "entertainment",
    "use-bool": "bool",
    "subtext": ""
  },
  {
    "name": "swimming-pool",
    "kwh": 806,
    "use-type": "monthly-own",
    "sub-grouping": "entertainment",
    "use-bool": "bool",
    "subtext": ""
  },
  {
    "name": "clothes-washer-cold-water",
    "kwh": 2.3,
    "use-type": "monthly-use",
    "sub-grouping": "cleanliness",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "clothes-washer-hot-water",
    "kwh": 6.3,
    "use-type": "monthly-use",
    "sub-grouping": "cleanliness",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "dryer",
    "kwh": 3,
    "use-type": "monthly-use",
    "sub-grouping": "cleanliness",
    "use-bool": "",
    "subtext": ""
  },
  {
    "name": "dishwasher",
    "kwh": 1,
    "use-type": "monthly-use",
    "sub-grouping": "cooking",
    "use-bool": "",
    "subtext": ""
  }
];