import type { Meta, StoryObj } from '@storybook/angular';
import { ObjectivesList } from './objectives-list';

const meta: Meta<ObjectivesList> = {
  title: 'Course Management/ObjectivesList',
  component: ObjectivesList,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    minObjectives: { control: 'number' },
    maxObjectives: { control: 'number' },
    minLength: { control: 'number' },
    maxLength: { control: 'number' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<ObjectivesList>;

export const Empty: Story = {
  args: {
    label: 'Learning Objectives',
    minObjectives: 4,
    maxObjectives: 10,
    minLength: 10,
    maxLength: 200,
    placeholder: 'Students will be able to...',
  },
};

export const WithObjectives: Story = {
  args: {
    label: 'Learning Objectives',
    minObjectives: 4,
    maxObjectives: 10,
    minLength: 10,
    maxLength: 200,
    placeholder: 'Students will be able to...',
  },
  render: (args) => ({
    props: {
      ...args,
      ngModel: [
        'Understand the fundamentals of Angular framework',
        'Build modern, responsive web applications',
        'Implement state management using RxJS',
        'Write unit tests for Angular components',
      ],
    },
  }),
};

export const PartiallyFilled: Story = {
  args: {
    label: 'Learning Objectives',
    minObjectives: 4,
    maxObjectives: 10,
    minLength: 10,
    maxLength: 200,
    placeholder: 'Students will be able to...',
  },
  render: (args) => ({
    props: {
      ...args,
      ngModel: [
        'Understand the fundamentals of Angular framework',
        'Build modern, responsive web applications',
      ],
    },
  }),
};
