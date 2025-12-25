import type { Meta, StoryObj } from '@storybook/angular';
import { LevelSelector } from './level-selector';

const meta: Meta<LevelSelector> = {
  title: 'Course Management/LevelSelector',
  component: LevelSelector,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<LevelSelector>;

export const Default: Story = {
  args: {
    label: 'Course Level',
  },
};

export const WithCustomLabel: Story = {
  args: {
    label: 'Select Difficulty Level',
  },
};
