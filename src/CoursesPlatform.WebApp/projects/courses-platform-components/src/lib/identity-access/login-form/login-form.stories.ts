import type { Meta, StoryObj } from '@storybook/angular';
import { LoginForm } from './login-form';

const meta: Meta<LoginForm> = {
  title: 'Identity & Access/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean' },
    errorMessage: { control: 'text' },
    lockoutMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<LoginForm>;

export const Default: Story = {
  args: {
    isLoading: false,
    errorMessage: '',
    lockoutMessage: '',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    errorMessage: '',
    lockoutMessage: '',
  },
};

export const WithError: Story = {
  args: {
    isLoading: false,
    errorMessage: 'Invalid credentials. Please try again.',
    lockoutMessage: '',
  },
};

export const AccountLocked: Story = {
  args: {
    isLoading: false,
    errorMessage: '',
    lockoutMessage: 'Account temporarily locked. Try again in 5 minutes.',
  },
};
