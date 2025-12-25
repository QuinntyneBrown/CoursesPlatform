import type { Meta, StoryObj } from '@storybook/angular';
import { CourseStatusBadge } from './course-status-badge';

const meta: Meta<CourseStatusBadge> = {
  title: 'Course Management/CourseStatusBadge',
  component: CourseStatusBadge,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['draft', 'pending_review', 'published', 'unpublished', 'rejected'],
    },
    showIcon: { control: 'boolean' },
    showTooltip: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<CourseStatusBadge>;

export const Draft: Story = {
  args: {
    status: 'draft',
    showIcon: true,
    showTooltip: true,
  },
};

export const PendingReview: Story = {
  args: {
    status: 'pending_review',
    showIcon: true,
    showTooltip: true,
  },
};

export const Published: Story = {
  args: {
    status: 'published',
    showIcon: true,
    showTooltip: true,
  },
};

export const Unpublished: Story = {
  args: {
    status: 'unpublished',
    showIcon: true,
    showTooltip: true,
  },
};

export const Rejected: Story = {
  args: {
    status: 'rejected',
    showIcon: true,
    showTooltip: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    status: 'published',
    showIcon: false,
    showTooltip: true,
  },
};
