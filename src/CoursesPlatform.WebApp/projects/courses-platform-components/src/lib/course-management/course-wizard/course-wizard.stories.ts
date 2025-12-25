import type { Meta, StoryObj } from '@storybook/angular';
import { CourseWizard } from './course-wizard';
import { Category } from '../category-selector/category-selector';

const mockCategories: Category[] = [
  {
    categoryId: '1',
    name: 'Development',
    children: [
      { categoryId: '1-1', name: 'Web Development' },
      { categoryId: '1-2', name: 'Mobile Development' },
      { categoryId: '1-3', name: 'Game Development' },
    ],
  },
  {
    categoryId: '2',
    name: 'Business',
    children: [
      { categoryId: '2-1', name: 'Entrepreneurship' },
      { categoryId: '2-2', name: 'Marketing' },
      { categoryId: '2-3', name: 'Finance' },
    ],
  },
  {
    categoryId: '3',
    name: 'Design',
    children: [
      { categoryId: '3-1', name: 'Graphic Design' },
      { categoryId: '3-2', name: 'UX/UI Design' },
    ],
  },
];

const meta: Meta<CourseWizard> = {
  title: 'Course Management/CourseWizard',
  component: CourseWizard,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<CourseWizard>;

export const Default: Story = {
  args: {
    categories: mockCategories,
    initialData: {},
    isLoading: false,
  },
};

export const WithInitialData: Story = {
  args: {
    categories: mockCategories,
    initialData: {
      basicInfo: {
        title: 'Complete Angular Development Course',
        subtitle: 'Master Angular from beginner to advanced',
        description: 'This comprehensive course covers everything you need to know about Angular development.',
      },
    },
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    categories: mockCategories,
    initialData: {},
    isLoading: true,
  },
};
