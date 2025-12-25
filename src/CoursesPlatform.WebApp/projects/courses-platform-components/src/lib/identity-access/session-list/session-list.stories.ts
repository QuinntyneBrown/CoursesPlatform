import type { Meta, StoryObj } from '@storybook/angular';
import { SessionList, Session } from './session-list';

const mockSessions: Session[] = [
  {
    sessionId: '1',
    deviceType: 'desktop',
    browser: 'Chrome 120',
    operatingSystem: 'Windows 11',
    location: 'New York, US',
    ipAddress: '192.168.1.1',
    lastActivity: new Date(),
    isCurrent: true,
  },
  {
    sessionId: '2',
    deviceType: 'mobile',
    browser: 'Safari 17',
    operatingSystem: 'iOS 17',
    location: 'London, UK',
    ipAddress: '192.168.1.2',
    lastActivity: new Date(Date.now() - 3600000),
    isCurrent: false,
  },
  {
    sessionId: '3',
    deviceType: 'tablet',
    browser: 'Chrome 119',
    operatingSystem: 'iPadOS 17',
    location: 'Paris, FR',
    ipAddress: '192.168.1.3',
    lastActivity: new Date(Date.now() - 86400000),
    isCurrent: false,
  },
];

const meta: Meta<SessionList> = {
  title: 'Identity & Access/SessionList',
  component: SessionList,
  tags: ['autodocs'],
  argTypes: {
    isLoading: { control: 'boolean' },
    terminatingSessionId: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<SessionList>;

export const Default: Story = {
  args: {
    sessions: mockSessions,
    isLoading: false,
    terminatingSessionId: null,
  },
};

export const Loading: Story = {
  args: {
    sessions: [],
    isLoading: true,
    terminatingSessionId: null,
  },
};

export const Empty: Story = {
  args: {
    sessions: [],
    isLoading: false,
    terminatingSessionId: null,
  },
};

export const SingleSession: Story = {
  args: {
    sessions: [mockSessions[0]],
    isLoading: false,
    terminatingSessionId: null,
  },
};

export const TerminatingSession: Story = {
  args: {
    sessions: mockSessions,
    isLoading: false,
    terminatingSessionId: '2',
  },
};
