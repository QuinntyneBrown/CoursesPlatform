import type { Meta, StoryObj } from '@storybook/angular';
import { CourseCard, CourseCardData } from './course-card';

const mockCourse: CourseCardData = {
  courseId: '1',
  title: 'Complete Angular Development Course',
  subtitle: 'Master Angular from beginner to advanced',
  thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=320&h=180&fit=crop',
  status: 'published',
  enrollmentCount: 1250,
  rating: 4.7,
  lastUpdated: new Date('2024-12-15'),
};

const meta: Meta<CourseCard> = {
  title: 'Course Management/CourseCard',
  component: CourseCard,
  tags: ['autodocs'],
  argTypes: {
    showActions: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<CourseCard>;

export const Published: Story = {
  args: {
    course: mockCourse,
    showActions: true,
  },
};

export const Draft: Story = {
  args: {
    course: { ...mockCourse, status: 'draft', enrollmentCount: 0 },
    showActions: true,
  },
};

export const PendingReview: Story = {
  args: {
    course: { ...mockCourse, status: 'pending_review' },
    showActions: true,
  },
};

export const NoThumbnail: Story = {
  args: {
    course: { ...mockCourse, thumbnailUrl: undefined },
    showActions: true,
  },
};

export const NoRating: Story = {
  args: {
    course: { ...mockCourse, rating: undefined },
    showActions: true,
  },
};

export const WithoutActions: Story = {
  args: {
    course: mockCourse,
    showActions: false,
  },
};
