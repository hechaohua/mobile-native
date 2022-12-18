'use strict';
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === 'object') || typeof from === 'function') {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toCommonJS = mod =>
  __copyProps(__defProp({}, '__esModule', { value: true }), mod);
var colors_exports = {};
__export(colors_exports, {
  color: () => color,
});
module.exports = __toCommonJS(colors_exports);
const color = {
  'color-primary-100': '#D6E4FF',
  'color-primary-200': '#ADC8FF',
  'color-primary-300': '#84A9FF',
  'color-primary-400': '#6690FF',
  'color-primary-500': '#3366FF',
  'color-primary-600': '#254EDB',
  'color-primary-700': '#1939B7',
  'color-primary-800': '#102693',
  'color-primary-900': '#091A7A',
  'color-primary-transparent-100': 'rgba(51, 102, 255, 0.08)',
  'color-primary-transparent-200': 'rgba(51, 102, 255, 0.16)',
  'color-primary-transparent-300': 'rgba(51, 102, 255, 0.24)',
  'color-primary-transparent-400': 'rgba(51, 102, 255, 0.32)',
  'color-primary-transparent-500': 'rgba(51, 102, 255, 0.40)',
  'color-primary-transparent-600': 'rgba(51, 102, 255, 0.48)',
  'color-success-100': '#DEFCD7',
  'color-success-200': '#B7F9B1',
  'color-success-300': '#86ED88',
  'color-success-400': '#65DC72',
  'color-success-500': '#37C654',
  'color-success-600': '#28AA4E',
  'color-success-700': '#1B8E48',
  'color-success-800': '#117241',
  'color-success-900': '#0A5F3B',
  'color-success-transparent-100': 'rgba(0, 224, 150, 0.08)',
  'color-success-transparent-200': 'rgba(0, 224, 150, 0.16)',
  'color-success-transparent-300': 'rgba(0, 224, 150, 0.24)',
  'color-success-transparent-400': 'rgba(0, 224, 150, 0.32)',
  'color-success-transparent-500': 'rgba(0, 224, 150, 0.40)',
  'color-success-transparent-600': 'rgba(0, 224, 150, 0.48)',
  'color-info-100': '#DAFFFE',
  'color-info-200': '#B5FAFF',
  'color-info-300': '#90F0FF',
  'color-info-400': '#75E3FF',
  'color-info-500': '#47CEFF',
  'color-info-600': '#33A3DB',
  'color-info-700': '#237BB7',
  'color-info-800': '#165893',
  'color-info-900': '#0D3F7A',
  'color-info-transparent-100': 'rgba(0, 149, 255, 0.08)',
  'color-info-transparent-200': 'rgba(0, 149, 255, 0.16)',
  'color-info-transparent-300': 'rgba(0, 149, 255, 0.24)',
  'color-info-transparent-400': 'rgba(0, 149, 255, 0.32)',
  'color-info-transparent-500': 'rgba(0, 149, 255, 0.40)',
  'color-info-transparent-600': 'rgba(0, 149, 255, 0.48)',
  'color-warning-100': '#FFF9CE',
  'color-warning-200': '#FFF29C',
  'color-warning-300': '#FFE96C',
  'color-warning-400': '#FFE047',
  'color-warning-500': '#FFD20A',
  'color-warning-600': '#DBB007',
  'color-warning-700': '#B78F05',
  'color-warning-800': '#937103',
  'color-warning-900': '#7A5B01',
  'color-warning-transparent-100': 'rgba(255, 170, 0, 0.08)',
  'color-warning-transparent-200': 'rgba(255, 170, 0, 0.16)',
  'color-warning-transparent-300': 'rgba(255, 170, 0, 0.24)',
  'color-warning-transparent-400': 'rgba(255, 170, 0, 0.32)',
  'color-warning-transparent-500': 'rgba(255, 170, 0, 0.40)',
  'color-warning-transparent-600': 'rgba(255, 170, 0, 0.48)',
  'color-danger-100': '#FFE8D8',
  'color-danger-200': '#FFCAB1',
  'color-danger-300': '#FFA78A',
  'color-danger-400': '#FF856D',
  'color-danger-500': '#FF4D3D',
  'color-danger-600': '#DB2C2C',
  'color-danger-700': '#B71E2B',
  'color-danger-800': '#931328',
  'color-danger-900': '#7A0B26',
  'color-danger-transparent-100': 'rgba(255, 61, 113, 0.08)',
  'color-danger-transparent-200': 'rgba(255, 61, 113, 0.16)',
  'color-danger-transparent-300': 'rgba(255, 61, 113, 0.24)',
  'color-danger-transparent-400': 'rgba(255, 61, 113, 0.32)',
  'color-danger-transparent-500': 'rgba(255, 61, 113, 0.40)',
  'color-danger-transparent-600': 'rgba(255, 61, 113, 0.48)',
  'color-basic-100': '#FFFFFF',
  'color-basic-200': '#F7F9FC',
  'color-basic-300': '#EDF1F7',
  'color-basic-400': '#E4E9F2',
  'color-basic-500': '#C5CEE0',
  'color-basic-600': '#8F9BB3',
  'color-basic-700': '#2E3A59',
  'color-basic-800': '#222B45',
  'color-basic-900': '#1A2138',
  'color-basic-1000': '#151A30',
  'color-basic-1100': '#101426',
  'color-basic-transparent-100': 'rgba(143, 155, 179, 0.08)',
  'color-basic-transparent-200': 'rgba(143, 155, 179, 0.16)',
  'color-basic-transparent-300': 'rgba(143, 155, 179, 0.24)',
  'color-basic-transparent-400': 'rgba(143, 155, 179, 0.32)',
  'color-basic-transparent-500': 'rgba(143, 155, 179, 0.40)',
  'color-basic-transparent-600': 'rgba(143, 155, 179, 0.48)',
  'color-basic-control-transparent-100': 'rgba(255, 255, 255, 0.08)',
  'color-basic-control-transparent-200': 'rgba(255, 255, 255, 0.16)',
  'color-basic-control-transparent-300': 'rgba(255, 255, 255, 0.24)',
  'color-basic-control-transparent-400': 'rgba(255, 255, 255, 0.32)',
  'color-basic-control-transparent-500': 'rgba(255, 255, 255, 0.40)',
  'color-basic-control-transparent-600': 'rgba(255, 255, 255, 0.48)',
};
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    color,
  });
//# sourceMappingURL=colors.js.map
