import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SessionList, Session } from './session-list';

describe('SessionList', () => {
  let component: SessionList;
  let fixture: ComponentFixture<SessionList>;

  const mockSessions: Session[] = [
    {
      sessionId: '1',
      deviceType: 'desktop',
      browser: 'Chrome',
      operatingSystem: 'Windows',
      location: 'New York, US',
      ipAddress: '192.168.1.1',
      lastActivity: new Date(),
      isCurrent: true,
    },
    {
      sessionId: '2',
      deviceType: 'mobile',
      browser: 'Safari',
      operatingSystem: 'iOS',
      location: 'London, UK',
      ipAddress: '192.168.1.2',
      lastActivity: new Date(Date.now() - 3600000),
      isCurrent: false,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionList, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionList);
    component = fixture.componentInstance;
    component.sessions = mockSessions;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct device icon', () => {
    expect(component.getDeviceIcon('desktop')).toBe('computer');
    expect(component.getDeviceIcon('mobile')).toBe('smartphone');
    expect(component.getDeviceIcon('tablet')).toBe('tablet');
    expect(component.getDeviceIcon('unknown')).toBe('devices');
  });

  it('should format last activity correctly', () => {
    const now = new Date();
    expect(component.formatLastActivity(now)).toBe('Just now');

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60000);
    expect(component.formatLastActivity(fiveMinutesAgo)).toBe('5 minutes ago');

    const twoHoursAgo = new Date(Date.now() - 2 * 3600000);
    expect(component.formatLastActivity(twoHoursAgo)).toBe('2 hours ago');

    const threeDaysAgo = new Date(Date.now() - 3 * 86400000);
    expect(component.formatLastActivity(threeDaysAgo)).toBe('3 days ago');
  });

  it('should emit terminateSession event', () => {
    const terminateSpy = vi.spyOn(component.terminateSession, 'emit');
    component.onTerminateSession('2');
    expect(terminateSpy).toHaveBeenCalledWith('2');
  });

  it('should emit terminateAllOther event', () => {
    const terminateAllSpy = vi.spyOn(component.terminateAllOther, 'emit');
    component.onTerminateAllOther();
    expect(terminateAllSpy).toHaveBeenCalled();
  });

  it('should detect other sessions', () => {
    expect(component.hasOtherSessions).toBe(true);

    component.sessions = [mockSessions[0]];
    expect(component.hasOtherSessions).toBe(false);
  });
});
