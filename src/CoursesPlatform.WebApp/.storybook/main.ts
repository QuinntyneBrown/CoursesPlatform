import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: [
    '../projects/courses-platform-components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  framework: {
    name: '@storybook/angular',
    options: {
      project: 'courses-platform-components',
    },
  },
  core: {
    disableTelemetry: true,
  },
};

export default config;
