import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarUpload } from './avatar-upload';

const meta: Meta<AvatarUpload> = {
  title: 'Identity & Access/AvatarUpload',
  component: AvatarUpload,
  tags: ['autodocs'],
  argTypes: {
    currentAvatar: { control: 'text' },
    size: { control: 'number' },
    isLoading: { control: 'boolean' },
    maxFileSize: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<AvatarUpload>;

export const Default: Story = {
  args: {
    currentAvatar: '',
    size: 120,
    isLoading: false,
  },
};

export const WithExistingAvatar: Story = {
  args: {
    currentAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    size: 120,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    currentAvatar: '',
    size: 120,
    isLoading: true,
  },
};

export const LargeSize: Story = {
  args: {
    currentAvatar: '',
    size: 200,
    isLoading: false,
  },
};

export const SmallSize: Story = {
  args: {
    currentAvatar: '',
    size: 80,
    isLoading: false,
  },
};
