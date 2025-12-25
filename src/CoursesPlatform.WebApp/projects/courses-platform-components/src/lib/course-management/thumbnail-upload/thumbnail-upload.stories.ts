import type { Meta, StoryObj } from '@storybook/angular';
import { ThumbnailUpload } from './thumbnail-upload';

const meta: Meta<ThumbnailUpload> = {
  title: 'Course Management/ThumbnailUpload',
  component: ThumbnailUpload,
  tags: ['autodocs'],
  argTypes: {
    currentThumbnail: { control: 'text' },
    aspectRatio: { control: 'number' },
    isLoading: { control: 'boolean' },
    maxFileSize: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<ThumbnailUpload>;

export const Default: Story = {
  args: {
    currentThumbnail: '',
    aspectRatio: 16 / 9,
    isLoading: false,
  },
};

export const WithExistingThumbnail: Story = {
  args: {
    currentThumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=640&h=360&fit=crop',
    aspectRatio: 16 / 9,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    currentThumbnail: '',
    aspectRatio: 16 / 9,
    isLoading: true,
  },
};
