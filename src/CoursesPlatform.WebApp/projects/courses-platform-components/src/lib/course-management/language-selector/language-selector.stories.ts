import type { Meta, StoryObj } from '@storybook/angular';
import { LanguageSelector } from './language-selector';

const meta: Meta<LanguageSelector> = {
  title: 'Course Management/LanguageSelector',
  component: LanguageSelector,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<LanguageSelector>;

export const Default: Story = {
  args: {
    label: 'Course Language',
    placeholder: 'Select a language',
  },
};

export const WithCustomLabel: Story = {
  args: {
    label: 'Primary Language',
    placeholder: 'Search for a language...',
  },
};
