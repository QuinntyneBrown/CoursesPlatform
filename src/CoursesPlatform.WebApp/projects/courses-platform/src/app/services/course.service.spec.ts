import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
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
    it('should get courses list', async () => {
      const mockResponse = {
        courses: [mockCourse],
        totalCount: 1,
        page: 1,
        pageSize: 10
      };

      const responsePromise = firstValueFrom(service.getCourses());

      const req = httpMock.expectOne(`${baseUrl}/api/courses`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      const response = await responsePromise;

      expect(response.courses.length).toBe(1);
      expect(response.totalCount).toBe(1);
    });

    it('should pass query parameters', async () => {
      const params = {
        instructorId: '456',
        status: 1,
        page: 2,
        pageSize: 20
      };

      const responsePromise = firstValueFrom(service.getCourses(params));

      const req = httpMock.expectOne(
        r => r.url === `${baseUrl}/api/courses` &&
             r.params.get('instructorId') === '456' &&
             r.params.get('status') === '1' &&
             r.params.get('page') === '2' &&
             r.params.get('pageSize') === '20'
      );
      req.flush({ courses: [], totalCount: 0, page: 2, pageSize: 20 });

      await responsePromise;
    });
  });

  describe('getCourse', () => {
    it('should get single course', async () => {
      const responsePromise = firstValueFrom(service.getCourse('123'));

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123`);
      expect(req.request.method).toBe('GET');
      req.flush({ course: mockCourse });

      const response = await responsePromise;

      expect(response.course.courseId).toBe('123');
    });
  });

  describe('createCourse', () => {
    it('should create course', async () => {
      const createRequest: CreateCourseRequest = {
        title: 'New Course',
        description: 'Description',
        level: 1
      };

      const responsePromise = firstValueFrom(service.createCourse(createRequest));

      const req = httpMock.expectOne(`${baseUrl}/api/courses`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(createRequest);
      req.flush({ courseId: '123', course: mockCourse });

      const response = await responsePromise;

      expect(response.courseId).toBe('123');
    });
  });

  describe('updateCourse', () => {
    it('should update course', async () => {
      const updateRequest: UpdateCourseRequest = {
        title: 'Updated Course',
        description: 'Updated Description',
        level: 2
      };

      const responsePromise = firstValueFrom(service.updateCourse('123', updateRequest));

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123`);
      expect(req.request.method).toBe('PUT');
      req.flush({ success: true, course: { ...mockCourse, title: 'Updated Course' } });

      const response = await responsePromise;

      expect(response.success).toBe(true);
    });
  });

  describe('deleteCourse', () => {
    it('should delete course', async () => {
      const responsePromise = firstValueFrom(service.deleteCourse('123'));

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, message: 'Course deleted' });

      const response = await responsePromise;

      expect(response.success).toBe(true);
    });
  });

  describe('publishCourse', () => {
    it('should publish course', async () => {
      const responsePromise = firstValueFrom(service.publishCourse('123'));

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123/publish`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, course: { ...mockCourse, status: 'Published' } });

      const response = await responsePromise;

      expect(response.success).toBe(true);
      expect(response.course?.status).toBe('Published');
    });
  });

  describe('unpublishCourse', () => {
    it('should unpublish course', async () => {
      const responsePromise = firstValueFrom(service.unpublishCourse('123'));

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123/unpublish`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, course: { ...mockCourse, status: 'Unpublished' } });

      const response = await responsePromise;

      expect(response.success).toBe(true);
    });
  });

  describe('learning objectives', () => {
    it('should add objective', async () => {
      const responsePromise = firstValueFrom(service.addObjective('123', 'Learn testing'));

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123/objectives`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ description: 'Learn testing' });
      req.flush({ success: true, objective: { learningObjectiveId: '789', description: 'Learn testing', sortOrder: 0 } });

      const response = await responsePromise;

      expect(response.success).toBe(true);
    });

    it('should update objective', async () => {
      const responsePromise = firstValueFrom(service.updateObjective('123', '789', 'Updated objective'));

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123/objectives/789`);
      expect(req.request.method).toBe('PUT');
      req.flush({ success: true, objective: { learningObjectiveId: '789', description: 'Updated objective', sortOrder: 0 } });

      const response = await responsePromise;

      expect(response.success).toBe(true);
    });

    it('should delete objective', async () => {
      const responsePromise = firstValueFrom(service.deleteObjective('123', '789'));

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123/objectives/789`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, message: 'Objective deleted' });

      const response = await responsePromise;

      expect(response.success).toBe(true);
    });

    it('should reorder objectives', async () => {
      const objectiveIds = ['789', '790', '791'];

      const responsePromise = firstValueFrom(service.reorderObjectives('123', objectiveIds));

      const req = httpMock.expectOne(`${baseUrl}/api/courses/123/objectives/reorder`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ objectiveIds });
      req.flush({ success: true, objectives: [] });

      const response = await responsePromise;

      expect(response.success).toBe(true);
    });
  });
});
