import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarUpload } from './avatar-upload';

describe('AvatarUpload', () => {
  let component: AvatarUpload;
  let fixture: ComponentFixture<AvatarUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarUpload, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AvatarUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return current avatar as display URL when no preview', () => {
    component.currentAvatar = 'https://example.com/avatar.jpg';
    expect(component.displayUrl).toBe('https://example.com/avatar.jpg');
  });

  it('should return preview URL when available', () => {
    component.currentAvatar = 'https://example.com/avatar.jpg';
    component.previewUrl = 'data:image/png;base64,abc123';
    expect(component.displayUrl).toBe('data:image/png;base64,abc123');
  });

  it('should set isDragOver on drag events', () => {
    // Mock DragEvent since it's not available in Node.js test environment
    const event = {
      type: 'dragover',
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
    } as unknown as DragEvent;

    component.onDragOver(event);
    expect(component.isDragOver).toBe(true);

    component.onDragLeave(event);
    expect(component.isDragOver).toBe(false);
  });

  it('should emit avatarRemove and clear preview on remove', () => {
    const removeSpy = vi.spyOn(component.avatarRemove, 'emit');
    component.previewUrl = 'data:image/png;base64,abc123';

    component.onRemove();

    expect(component.previewUrl).toBe('');
    expect(removeSpy).toHaveBeenCalled();
  });

  it('should reject files with invalid type', () => {
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    expect(component.errorMessage).toBe('Please upload a valid image file (JPEG, PNG, or GIF)');
  });

  it('should reject files that are too large', () => {
    const largeContent = new Array(6 * 1024 * 1024).fill('a').join('');
    const file = new File([largeContent], 'large.jpg', { type: 'image/jpeg' });
    const event = { target: { files: [file] } } as unknown as Event;

    component.onFileSelected(event);

    expect(component.errorMessage).toContain('File size must be less than');
  });
});
