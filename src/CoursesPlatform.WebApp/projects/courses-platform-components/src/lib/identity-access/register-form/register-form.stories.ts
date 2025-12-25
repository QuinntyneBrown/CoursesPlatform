import type { Meta, StoryObj } from '@storybook/angular';
import { RegisterForm } from './register-form';

const meta: Meta<RegisterForm> = {
  title: 'Identity & Access/RegisterForm',
  component: RegisterForm,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean' },
    errorMessage: { control: 'text' },
    successMessage: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<RegisterForm>;

export const Default: Story = {
  args: {
    isLoading: false,
    errorMessage: '',
    successMessage: '',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    errorMessage: '',
    successMessage: '',
  },
};

export const WithError: Story = {
  args: {
    isLoading: false,
    errorMessage: 'Email already registered. Please try a different email.',
    successMessage: '',
  },
};

export const RegistrationSuccess: Story = {
  args: {
    isLoading: false,
    errorMessage: '',
    successMessage: 'Registration successful! Please check your email to verify your account.',
  },
};
