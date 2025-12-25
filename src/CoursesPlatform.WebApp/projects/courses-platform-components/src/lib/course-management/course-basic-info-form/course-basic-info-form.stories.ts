import type { Meta, StoryObj } from '@storybook/angular';
import { CourseBasicInfoForm } from './course-basic-info-form';

const meta: Meta<CourseBasicInfoForm> = {
  title: 'Course Management/CourseBasicInfoForm',
  component: CourseBasicInfoForm,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CourseBasicInfoForm>;

export const Empty: Story = {
  args: {
    initialData: null,
  },
};

export const WithInitialData: Story = {
  args: {
    initialData: {
      title: 'Complete Angular Development Course',
      subtitle: 'Master Angular from beginner to advanced with hands-on projects',
      description: 'This comprehensive course covers everything you need to know about Angular development. From basic concepts to advanced techniques, you will learn how to build modern, responsive web applications using the Angular framework. The course includes practical projects and real-world examples.',
    },
  },
};
