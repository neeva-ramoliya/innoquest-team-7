const FieldingPositionsMap = {
  "first slip": "firstSlip",
  "leg slip": "legSlip",
  "short mid off": "shortMidOff",
  "silly mid off": "sillyMidOff",
  "fourth slip": "fourthSlip",
  "third slip": "thirdSlip",
  "second slip": "secondSlip",
  "first slip": "firstSlip",
  "short leg": "shortLeg",
  "silly mid on": "sillyMidOn",
  "point": "point",
  "cover point": "coverPoint",
  "extra cover": "extraCover",
  "mid wicket": "midWicket",
  "deep midwicket": "deepMidWicket",
  "bowlers head": "", //??
  "mid off": "midOff",
  "mid on": "midOn",
  "fly slip": "flySlip",
  "backward point": "backwardPoint",
  "deep cover": "deepCover", 
  "deep extra cover": "deepExtraCover",
  "long off": "longOff",
  "long on": "longOn",
  "short fine leg": "shortFineLeg",
  "third man": "thirdMan",
  "sweeper": "sweeper",
  "cow corner": "cowCorner",
  "fine leg": "fineLeg",
  "long stop": "longStop",
  "long leg": "longLeg",
  "deep backward square leg": "deepBackwardSquareLeg",
  "deep mid wicket": "deepMidWicket",
  "cover": "cover",
  "cover point": "coverPoint",
  "extra cover": "extraCover",
  "gully": "gully",
  "mid off": "midOff",
  "mid on": "midOn",
  "mid wicket": "midWicket",
  "off side": "", //?
  "on side": "", //?
  "point": "point",
  "short cover": "cover", //?
  "deep cover": "deepCover",
  "short fine leg": "shortFineLeg",
  "square leg": "squareLeg",
  "deep square leg": "deepSquareLeg",
}

const mathcResult = [
  "1 run",
  "2 leg byes",
  "2 runs",
  "3 runs",
  "4 leg byes",
  "5 wides",
  "four",
  "leg bye",
  "no ball",
  "no run",
  "six",
  "wide",
  "bowled",
  "caught",
  "lbw",
  "run out",
];

const LowerZone = [
  "squareLeg",
  "FineLeg",
  "flySlip",
  "point",
  "point",
  "midOff",
  "midOn",
  "midWicket",
];

const UpperZone = [
  "deepSquareLeg",
  "deepfineLeg",
  "thirdMan",
  "deepPoint",
  "sweeper",
  "Long off",
  "Long on",
  "deepMidWicket",
];

export const getFieldingPositionClass = (labels) => {
    if (!labels && !labels.length) return;

    for (let index = 0; index < labels.length; index++) {
      const value = FieldingPositionsMap[labels[index ]];
      if (value) {
        return value;
      }
    }
};

export const isWide = (result) => {
  return result.indexOf("wide") > -1;
};

export const isNoball = (result) => {
  return result.indexOf("no ball") > -1;
};


export const getClassByZoneData = (ZAD) => {
  let zad = ZAD.split(",");
  let zone = zad[0],
    distance = zad[2];
  if (distance >= 3) {
    return UpperZone[zone - 1];
  } else {
    return LowerZone[zone - 1];
  }
};

export const getDistance = (ZAD) => {
    if (!ZAD) return 1;
    let zad = ZAD.split(",");
    return parseInt(zad[2])
}

export const getAnimation = (data) => {
    const { runs, isNoball, isWide, isWicket} = data;
    
    if (isWicket) {
      return 'ANIMATION_OUT';
    }

    if (isWide) {
      return 'ANIMATION_WIDE'
    }

    if (isNoball) {
      return 'ANIMATION_WIDE'
    }

    if (runs) {
      if(runs == 6) return 'ANIMATION_SIX';
      if(runs == 4) return 'ANIMATION_FOUR';
      if(runs == 3) return 'ANIMATION_THREE';
      if(runs == 2) return 'ANIMATION_TWO';
      if(runs == 1) return 'ANIMATION_ONE';
      if(runs == 0) return 'ANIMATION_NO_RUN';
    }

    return 'ANIMATION_NO_RUN';
}
