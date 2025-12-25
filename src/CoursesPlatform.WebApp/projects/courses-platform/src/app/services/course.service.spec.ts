import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CourseService, Course, CreateCourseRequest, UpdateCourseRequest } from './course.service';
import { API_BASE_URL } from './api.config';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:5000';

  const mockCourse: Course = {
    courseId: '123',
    title: 'Test Course',
    subtitle: 'Test Subtitle',
    description: 'Test Description',
    status: 'Draft',
    level: 'Beginner',
    instructorId: '456',
    createdAt: new Date().toISOString(),
    learningObjectives: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: baseUrl }
      ]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCourses', () => {
    it('should get courses list', fakeAsync(() => {
      const mockResponse = {
        courses: [mockCourse],
        totalCount: 1,
        page: 1,
        pageSize: 10
      };

      let response: any;
      service.getCourses().subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/courses`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      tick();

      expect(response.courses.length).toBe(1);
      expect(response.totalCount).toBe(1);
    }));

    it('should pass query parameters', fakeAsync(() => {
      const params = {
        instructorId: '456',
        status: 1,
        page: 2,
        pageSize: 20
      };

      service.getCourses(params).subscribe();

      const req = httpMock.expectOne(
        r => r.url === `${baseUrl}/api/courses` &&
             r.params.get('instructorId') === '456' &&
             r.params.get('status') === '1' &&
             r.params.get('page') === '2' &&
             r.params.get('pageSize') === '20'
      );
      req.flush({ courses: [], totalCount: 0, page: 2, pageSize: 20 });
    }));
  });

  describe('getCourse', () => {
    it('should get single course', fakeAsync(() => {
      let response: any;
      service.getCourse('123').subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123`);
      expect(req.request.method).toBe('GET');
      req.flush({ course: mockCourse });

      tick();

      expect(response.course.courseId).toBe('123');
    }));
  });

  describe('createCourse', () => {
    it('should create course', fakeAsync(() => {
      const createRequest: CreateCourseRequest = {
        title: 'New Course',
        description: 'Description',
        level: 1
      };

      let response: any;
      service.createCourse(createRequest).subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/courses`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(createRequest);
      req.flush({ courseId: '123', course: mockCourse });

      tick();

      expect(response.courseId).toBe('123');
    }));
  });

  describe('updateCourse', () => {
    it('should update course', fakeAsync(() => {
      const updateRequest: UpdateCourseRequest = {
        title: 'Updated Course',
        description: 'Updated Description',
        level: 2
      };

      let response: any;
      service.updateCourse('123', updateRequest).subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123`);
      expect(req.request.method).toBe('PUT');
      req.flush({ success: true, course: { ...mockCourse, title: 'Updated Course' } });

      tick();

      expect(response.success).toBe(true);
    }));
  });

  describe('deleteCourse', () => {
    it('should delete course', fakeAsync(() => {
      let response: any;
      service.deleteCourse('123').subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, message: 'Course deleted' });

      tick();

      expect(response.success).toBe(true);
    }));
  });

  describe('publishCourse', () => {
    it('should publish course', fakeAsync(() => {
      let response: any;
      service.publishCourse('123').subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123/publish`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, course: { ...mockCourse, status: 'Published' } });

      tick();

      expect(response.success).toBe(true);
      expect(response.course.status).toBe('Published');
    }));
  });

  describe('unpublishCourse', () => {
    it('should unpublish course', fakeAsync(() => {
      let response: any;
      service.unpublishCourse('123').subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123/unpublish`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, course: { ...mockCourse, status: 'Unpublished' } });

      tick();

      expect(response.success).toBe(true);
    }));
  });

  describe('learning objectives', () => {
    it('should add objective', fakeAsync(() => {
      let response: any;
      service.addObjective('123', 'Learn testing').subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123/objectives`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ description: 'Learn testing' });
      req.flush({ success: true, objective: { learningObjectiveId: '789', description: 'Learn testing', sortOrder: 0 } });

      tick();

      expect(response.success).toBe(true);
    }));

    it('should update objective', fakeAsync(() => {
      let response: any;
      service.updateObjective('123', '789', 'Updated objective').subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123/objectives/789`);
      expect(req.request.method).toBe('PUT');
      req.flush({ success: true, objective: { learningObjectiveId: '789', description: 'Updated objective', sortOrder: 0 } });

      tick();

      expect(response.success).toBe(true);
    }));

    it('should delete objective', fakeAsync(() => {
      let response: any;
      service.deleteObjective('123', '789').subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123/objectives/789`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, message: 'Objective deleted' });

      tick();

      expect(response.success).toBe(true);
    }));

    it('should reorder objectives', fakeAsync(() => {
      const objectiveIds = ['789', '790', '791'];

      let response: any;
      service.reorderObjectives('123', objectiveIds).subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123/objectives/reorder`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ objectiveIds });
      req.flush({ success: true, objectives: [] });

      tick();

      expect(response.success).toBe(true);
    }));
  });
});
