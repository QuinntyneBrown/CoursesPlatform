import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CategoryService, Category } from './category.service';
import { API_BASE_URL } from './api.config';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://localhost:5000';

  const mockCategories: Category[] = [
    {
      categoryId: '1',
      name: 'Programming',
      description: 'Programming courses',
      subcategories: [
        {
          categoryId: '1-1',
          name: 'Web Development',
          subcategories: []
        },
        {
          categoryId: '1-2',
          name: 'Mobile Development',
          subcategories: []
        }
      ]
    },
    {
      categoryId: '2',
      name: 'Design',
      description: 'Design courses',
      subcategories: []
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_URL, useValue: baseUrl }
      ]
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCategories', () => {
    it('should fetch categories', fakeAsync(() => {
      let response: any;
      service.getCategories().subscribe(r => response = r);

      const req = httpMock.expectOne(`${baseUrl}/api/categories`);
      expect(req.request.method).toBe('GET');
      req.flush({ categories: mockCategories });

      tick();

      expect(response.categories.length).toBe(2);
      expect(response.categories[0].name).toBe('Programming');
      expect(response.categories[0].subcategories.length).toBe(2);
    }));

    it('should update categories$ observable', fakeAsync(() => {
      let categories: Category[] = [];
      service.categories$.subscribe(c => categories = c);

      service.getCategories().subscribe();

      const req = httpMock.expectOne(`${baseUrl}/api/categories`);
      req.flush({ categories: mockCategories });

      tick();

      expect(categories.length).toBe(2);
    }));
  });
});
