import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      format: 'esm',
      syntax: 'es2021',
      dts: true,
      output: {
        externals: {
          showdown: 'showdown',
          'js-yaml': 'js-yaml',
        },
      },
      bundle: false,
    },
  ],
  source: {
    entry: {
      index: ['./src/**/*'],
    },
  },
});
