'use client';

const W = 1300;
const H = 700;
const DOT = 5;
const STEP = 10;

// Simplified continent outlines in 1300×700 Mercator projection space
// x = (lon + 180) * 1300/360, y = (90 - lat) * 700/180
const CONTINENTS = [
  // North America
  'M 90,90 L 138,60 L 198,50 L 258,48 L 318,55 L 378,75 L 408,110 L 400,150 L 378,185 L 352,220 L 332,256 L 308,290 L 278,316 L 248,330 L 218,348 L 194,375 L 174,364 L 158,336 L 142,306 L 122,270 L 100,238 L 80,204 L 74,167 L 80,130 Z',
  // Greenland
  'M 424,22 L 490,8 L 554,22 L 566,52 L 546,82 L 506,92 L 460,80 L 434,58 Z',
  // South America
  'M 220,348 L 266,330 L 318,336 L 348,358 L 362,398 L 370,445 L 358,498 L 334,542 L 300,572 L 270,580 L 240,568 L 214,534 L 196,490 L 194,442 L 204,395 L 214,368 Z',
  // Iceland
  'M 516,42 L 550,34 L 562,50 L 556,68 L 528,72 L 514,55 Z',
  // UK (simplified)
  'M 548,58 L 575,48 L 588,62 L 582,88 L 558,93 L 544,76 Z',
  // Europe (continental)
  'M 564,52 L 590,40 L 620,38 L 648,48 L 668,66 L 680,90 L 676,118 L 656,134 L 628,140 L 598,130 L 576,112 L 560,90 Z',
  // Scandinavia
  'M 590,18 L 630,10 L 660,28 L 654,62 L 632,76 L 604,66 L 588,40 Z',
  // Africa
  'M 558,176 L 614,162 L 670,172 L 706,202 L 722,248 L 732,310 L 722,376 L 696,430 L 658,468 L 624,480 L 586,475 L 552,450 L 528,410 L 512,360 L 510,298 L 522,242 L 540,208 Z',
  // Arabian Peninsula
  'M 670,222 L 718,210 L 760,222 L 782,258 L 768,298 L 740,318 L 706,310 L 678,282 L 666,250 Z',
  // Asia (main landmass)
  'M 666,58 L 756,40 L 858,32 L 976,38 L 1062,48 L 1142,68 L 1188,100 L 1212,138 L 1218,175 L 1194,212 L 1154,232 L 1108,248 L 1062,258 L 1018,272 L 974,290 L 934,285 L 898,264 L 858,278 L 834,312 L 808,328 L 774,315 L 742,294 L 708,278 L 674,264 L 644,250 L 618,228 L 598,204 L 590,174 L 596,144 L 614,118 L 642,100 L 660,78 Z',
  // India
  'M 796,232 L 846,225 L 882,252 L 892,295 L 878,340 L 844,368 L 808,364 L 776,332 L 766,284 L 776,252 Z',
  // SE Asia (mainland)
  'M 934,252 L 982,244 L 1012,264 L 1018,302 L 998,332 L 962,338 L 932,318 L 916,282 L 922,260 Z',
  // Philippines (simplified)
  'M 1062,252 L 1082,244 L 1096,262 L 1090,286 L 1068,292 L 1054,274 Z',
  // Indonesia - Java/Sumatra (simplified)
  'M 1008,318 L 1056,312 L 1084,325 L 1088,348 L 1062,362 L 1024,358 L 1004,342 Z',
  // Japan
  'M 1094,138 L 1126,128 L 1148,145 L 1142,175 L 1112,182 L 1092,164 Z',
  // Korea
  'M 1064,172 L 1084,164 L 1098,178 L 1092,202 L 1068,208 L 1056,192 Z',
  // Taiwan
  'M 1102,232 L 1115,225 L 1122,238 L 1116,252 L 1102,252 Z',
  // Sri Lanka
  'M 840,335 L 853,328 L 860,342 L 854,355 L 840,355 Z',
  // Madagascar
  'M 694,375 L 712,365 L 722,385 L 716,422 L 700,435 L 686,422 L 684,398 Z',
  // Australia
  'M 968,388 L 1022,368 L 1072,370 L 1112,392 L 1128,432 L 1120,475 L 1084,498 L 1038,505 L 988,490 L 952,460 L 938,428 Z',
  // New Zealand (North Island)
  'M 1148,442 L 1168,435 L 1178,452 L 1170,475 L 1148,478 L 1138,462 Z',
  // New Zealand (South Island)
  'M 1140,480 L 1160,473 L 1172,490 L 1162,515 L 1140,518 L 1128,504 Z',
  // Cuba + Caribbean (simplified)
  'M 244,228 L 270,222 L 286,232 L 280,248 L 255,250 L 242,238 Z',
];

const DOTS = (() => {
  const arr: { x: number; y: number; id: number }[] = [];
  let i = 0;
  for (let y = STEP / 2; y < H; y += STEP) {
    for (let x = STEP / 2; x < W; x += STEP) {
      arr.push({ x, y, id: i++ });
    }
  }
  return arr;
})();

export function WorldDottedMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="World map"
    >
      <defs>
        <clipPath id="world-clip">
          {CONTINENTS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </clipPath>
      </defs>
      <g clipPath="url(#world-clip)">
        {DOTS.map(({ x, y, id }) => (
          <rect
            key={id}
            x={x - DOT / 2}
            y={y - DOT / 2}
            width={DOT}
            height={DOT}
            fill="rgba(255,255,255,0.2)"
          />
        ))}
      </g>
    </svg>
  );
}
