const FieldingPositionsMap = new Map([
  [
    ["first slip", "firstSlip"],
    ["leg slip", "legSlip"],
    ["short mid off", "shortMidOff"],
    ["silly mid off", "sillyMidOff"],
    ["silly pointgully", "sillyPoint"], //?
    ["fourth slip", "fourthSlip"],
    ["third slip", "thirdSlip"],
    ["second slip", "secondSlip"],
    ["first slip", "firstSlip"],
    ["short leg", "shortLeg"],
    ["silly mid on", "sillyMidOn"],
    ["point", "point"],
    ["cover point", "coverPoint"],
    ["extra cover", "extraCover"],
    ["mid wicket", "midWicket"],
    ["deep midwicket", "deepMidWicket"],
    ["bowlers head", ""], //??
    ["mid off", "midOff"],
    ["mid on", "midOn"],
    ["fly slip", "flySlip"],
    ["backward point", "backwardPoint"],
    ["deep coversquare leg", ""], //??
    ["deep extra cover", "deepExtraCover"],
    ["long off", "longOff"],
    ["long on", "longOn"],
    ["short fine leg", "shortFineLeg"],
    ["third man", "thirdMan"],
    ["sweeper", "sweeper"],
    ["cow corner", "cowCorner"],
    ["fine leg", "fineLeg"],
    ["long stop", "longStop"],
    ["long leg", "longLeg"],
    ["deep backward square leg", "deepBackwardSquareLeg"],
    ["deep min wicket", "deepMidWicket"], //??
    ["backfoot defend", ""], //?
    ["backfoot defend", ""], //?
    ["backfoot point", ""], //?
    ["cover", "cover"],
    ["cover point", "coverPoint"],
    ["defend", ""], //?
    ["edge gully", ""], //?
    ["extra cover", "extraCover"],
    ["gully", "gully"],
    ["leg side", ""], //?
    ["mid off", "midOff"],
    ["mid on", "midOn"],
    ["mid wicket", "midWicket"],
    ["no connect", ""], //?
    ["off side", ""], //?
    ["on side", ""], //?
    ["point", "point"],
    ["short cover", ""], //?
    ["deep cover", "deepCover"],
    ["short fine leg", "shortFineLeg"],
    ["square leg", "squareLeg"],
    ["deep square leg", "deepSquareLeg"],
    ["pads", ""], //?
  ],
]);

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

export const getFieldingPositionClass = (label) => {
  return FieldingPositionsMap.get([label[0]]);
};

export const getClassByZoneData = (ZAD = "5,46,2") => {
  let zad = ZAD.split(",");
  let zone = zad[0],
    distance = zad[2];
  if (distance >= 3) {
    return UpperZone[zone - 1];
  } else {
    return LowerZone[zone - 1];
  }
};
