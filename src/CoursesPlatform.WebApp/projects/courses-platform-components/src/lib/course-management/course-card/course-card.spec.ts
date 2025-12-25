import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CourseCard, CourseCardData } from './course-card';

describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  const mockCourse: CourseCardData = {
    courseId: '1',
    title: 'Test Course',
    subtitle: 'A test course subtitle',
    thumbnailUrl: 'https://example.com/thumb.jpg',
    status: 'draft',
    enrollmentCount: 150,
    rating: 4.5,
    lastUpdated: new Date('2024-01-15'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format date correctly', () => {
    const formatted = component.formatDate(new Date('2024-01-15'));
    expect(formatted).toContain('Jan');
    expect(formatted).toContain('15');
    expect(formatted).toContain('2024');
  });

  it('should emit edit event', () => {
    const editSpy = vi.spyOn(component.edit, 'emit');
    component.onEdit();
    expect(editSpy).toHaveBeenCalledWith('1');
  });

  it('should emit preview event', () => {
    const previewSpy = vi.spyOn(component.preview, 'emit');
    component.onPreview();
    expect(previewSpy).toHaveBeenCalledWith('1');
  });

  it('should emit publish event', () => {
    const publishSpy = vi.spyOn(component.publish, 'emit');
    component.onPublish();
    expect(publishSpy).toHaveBeenCalledWith('1');
  });

  it('should emit unpublish event', () => {
    const unpublishSpy = vi.spyOn(component.unpublish, 'emit');
    component.onUnpublish();
    expect(unpublishSpy).toHaveBeenCalledWith('1');
  });

  it('should emit delete event', () => {
    const deleteSpy = vi.spyOn(component.delete, 'emit');
    component.onDelete();
    expect(deleteSpy).toHaveBeenCalledWith('1');
  });

  it('should provide default thumbnail when none exists', () => {
    component.course = { ...mockCourse, thumbnailUrl: undefined };
    expect(component.defaultThumbnail).toContain('data:image/svg+xml');
  });
});
