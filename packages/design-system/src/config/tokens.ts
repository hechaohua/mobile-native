import { createTokens } from '@tamagui/core';
import { color } from './colors';

// should roughly map to button/input etc height at each level
// fonts should match that height/lineHeight at each stop
// so these are really non-linear on purpose
// why?
//   - at sizes <1, used for fine grained things (borders, smallest paddingY)
//     - so smallest padY should be roughly 1-4px so it can join with lineHeight
//   - at sizes >=1, have to consider "pressability" (jumps up)
//   - after that it should go upwards somewhat naturally
//   - H1 / headings top out at 10 naturally, so after 10 we can go upwards faster
//  but also one more wrinkle...
//  space is used in conjunction with size
//  i'm setting space to generally just a fixed fraction of size (~1/3-2/3 still fine tuning)
export const size = {
  0: 0,
  0.25: 2,
  0.5: 4,
  0.75: 8,
  1: 20,
  1.5: 24,
  2: 28,
  2.5: 32,
  3: 36, // S - 3
  3.5: 38, // M - 3.5
  4: 44, // L - 4
  true: 44,
  4.5: 48,
  5: 52, // XL
  6: 64,
  7: 74,
  8: 84,
  9: 94,
};

type Sizes = typeof size;
type SizeKeys = `${keyof Sizes}`;

const spaces = Object.entries(size).map(([k, v]) => [
  k,
  Math.max(0, v <= 16 ? Math.round(v * 0.333) : Math.floor(v * 0.7 - 12)),
]);

const spacesNegative = spaces.map(([k, v]) => [`-${k}`, -v]);

export const space: {
  [Key in `-${SizeKeys}` | SizeKeys]: Key extends keyof Sizes
    ? Sizes[Key]
    : number;
} = {
  ...Object.fromEntries(spaces),
  ...Object.fromEntries(spacesNegative),
} as any;

export const zIndex = {
  0: 0,
  1: 100,
  2: 200,
  3: 300,
  4: 400,
  5: 500,
};

export const radius = {
  // 0: 0,
  // 1: 3,
  // 2: 5,
  // 3: 6,
  4: 10000,
  // 5: 10,
  // 6: 16,
  // 7: 19,
  // 8: 22,
  // 9: 26,
};

export const tokens = createTokens({
  color,
  radius,
  zIndex,
  space,
  size,
});
