const utilityUse = {
    AL: 1218,
    AK: 603,
    AZ: 1028,
    AR: 1122,
    CA: 557,
    CO: 688,
    CT: 731,
    DE: 977,
    DC: 841,
    FL: 1141,
    GA: 1122,
    HI: 514,
    ID: 957,
    IL: 719,
    IN: 964,
    IA: 847,
    KS: 896,
    KY: 1120,
    LA: 1286,
    ME: 556,
    MD: 1012,
    MA: 602,
    MI: 649,
    MN: 762,
    MS: 1218,
    MO: 1033,
    MT: 818,
    NE: 962,
    NV: 913,
    NH: 621,
    NJ: 696,
    NM: 635,
    NY: 601,
    NC: 1113,
    ND: 1091,
    OH: 877,
    OK: 1093,
    OR: 902,
    PA: 855,
    RI: 594,
    SC: 1146,
    SD: 981,
    TN: 1248,
    TX: 1176,
    UT: 744,
    VT: 558,
    VA: 1149,
    WA: 964,
    WV: 1107,
    WI: 668,
    WY: 832,
    US: 901
};

const utilityEmissionsPerState = {
    // Units lb/Co2 per kwh
    AK: 3.145,
    AL: 1.152,
    AR: 1.441,
    AZ: 1.228,
    CA: 0.761,
    CO: 2.014,
    CT: 0.592,
    DE: 1.359,
    FL: 1.238,
    GA: 1.16,
    HI: 3.76,
    IA: 1.49,
    ID: 0.683,
    IL: 1.031,
    IN: 2.7,
    KS: 1.58,
    KY: 2.506,
    LA: 1.508,
    MA: 1.194,
    MD: 1.384,
    ME: 0.754,
    MI: 1.763,
    MN: 1.381,
    MO: 2.129,
    MS: 0.986,
    MT: 1.809,
    NC: 1.154,
    ND: 2.56,
    NE: 1.712,
    NH: 0.483,
    NJ: 0.709,
    NM: 2.55,
    NV: 0.999,
    NY: 0.712,
    OH: 1.885,
    OK: 1.447,
    OR: 0.528,
    PA: 1.282,
    RI: 0.975,
    SC: 0.775,
    SD: 0.647,
    TN: 1.176,
    TX: 1.532,
    UT: 2.47,
    VA: 1.123,
    VT: 0.195,
    WA: 0.287,
    WI: 1.725,
    WV: 2.54,
    WY: 2.6,
    US: 1.456
}

module.exports = {
    utilityEmissionsPerState,
    utilityUse
}