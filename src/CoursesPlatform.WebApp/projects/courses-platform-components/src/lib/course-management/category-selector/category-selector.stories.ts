import type { Meta, StoryObj } from '@storybook/angular';
import { CategorySelector, Category } from './category-selector';

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
      { categoryId: '3-3', name: '3D & Animation' },
    ],
  },
  {
    categoryId: '4',
    name: 'Photography',
  },
];

const meta: Meta<CategorySelector> = {
  title: 'Course Management/CategorySelector',
  component: CategorySelector,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<CategorySelector>;

export const Default: Story = {
  args: {
    label: 'Category',
    categories: mockCategories,
  },
};

export const Empty: Story = {
  args: {
    label: 'Category',
    categories: [],
  },
};
