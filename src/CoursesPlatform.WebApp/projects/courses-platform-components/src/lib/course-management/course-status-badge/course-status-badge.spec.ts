import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CourseStatusBadge } from './course-status-badge';

describe('CourseStatusBadge', () => {
  let component: CourseStatusBadge;
  let fixture: ComponentFixture<CourseStatusBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseStatusBadge, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseStatusBadge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return draft config by default', () => {
    expect(component.config.label).toBe('Draft');
    expect(component.config.icon).toBe('edit_note');
    expect(component.config.color).toBe('default');
  });

  it('should return correct config for published status', () => {
    component.status = 'published';
    expect(component.config.label).toBe('Published');
    expect(component.config.icon).toBe('check_circle');
    expect(component.config.color).toBe('primary');
  });

  it('should return correct config for pending_review status', () => {
    component.status = 'pending_review';
    expect(component.config.label).toBe('Pending Review');
    expect(component.config.icon).toBe('pending');
    expect(component.config.color).toBe('accent');
  });

  it('should return correct config for unpublished status', () => {
    component.status = 'unpublished';
    expect(component.config.label).toBe('Unpublished');
    expect(component.config.icon).toBe('visibility_off');
    expect(component.config.color).toBe('warn');
  });

  it('should return correct config for rejected status', () => {
    component.status = 'rejected';
    expect(component.config.label).toBe('Rejected');
    expect(component.config.icon).toBe('cancel');
    expect(component.config.color).toBe('warn');
  });
});
