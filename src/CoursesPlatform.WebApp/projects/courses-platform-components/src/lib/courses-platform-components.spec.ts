import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesPlatformComponents } from './courses-platform-components';

describe('CoursesPlatformComponents', () => {
  let component: CoursesPlatformComponents;
  let fixture: ComponentFixture<CoursesPlatformComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesPlatformComponents]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesPlatformComponents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
