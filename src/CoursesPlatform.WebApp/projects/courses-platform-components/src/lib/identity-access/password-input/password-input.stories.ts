import type { Meta, StoryObj } from '@storybook/angular';
import { PasswordInput } from './password-input';

const meta: Meta<PasswordInput> = {
  title: 'Identity & Access/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    showStrengthIndicator: { control: 'boolean' },
    hint: { control: 'text' },
    errorMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<PasswordInput>;

export const Default: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    showStrengthIndicator: true,
    hint: '',
    errorMessage: '',
  },
};

export const WithHint: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    showStrengthIndicator: true,
    hint: 'At least 8 characters with uppercase, lowercase, and number',
    errorMessage: '',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    showStrengthIndicator: false,
    hint: '',
    errorMessage: 'Password is required',
  },
};

export const WithoutStrengthIndicator: Story = {
  args: {
    label: 'Confirm Password',
    placeholder: 'Confirm your password',
    showStrengthIndicator: false,
    hint: '',
    errorMessage: '',
  },
};
