import type { Meta, StoryObj } from '@storybook/angular';
import { CourseActionsMenu } from './course-actions-menu';

const meta: Meta<CourseActionsMenu> = {
  title: 'Course Management/CourseActionsMenu',
  component: CourseActionsMenu,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['draft', 'pending_review', 'published', 'unpublished', 'rejected'],
    },
  },
};

export default meta;
type Story = StoryObj<CourseActionsMenu>;

export const DraftStatus: Story = {
  args: {
    courseId: '123',
    status: 'draft',
  },
};

export const PublishedStatus: Story = {
  args: {
    courseId: '123',
    status: 'published',
  },
};

export const PendingReviewStatus: Story = {
  args: {
    courseId: '123',
    status: 'pending_review',
  },
};

export const RejectedStatus: Story = {
  args: {
    courseId: '123',
    status: 'rejected',
  },
};
