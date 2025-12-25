import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
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
    it('should fetch categories', async () => {
      const responsePromise = firstValueFrom(service.getCategories());

      const req = httpMock.expectOne(`${baseUrl}/api/categories`);
      expect(req.request.method).toBe('GET');
      req.flush({ categories: mockCategories });

      const response = await responsePromise;

      expect(response.categories.length).toBe(2);
      expect(response.categories[0].name).toBe('Programming');
      expect(response.categories[0].subcategories.length).toBe(2);
    });

    it('should update categories$ observable', async () => {
      let categories: Category[] = [];
      service.categories$.subscribe(c => categories = c);

      const responsePromise = firstValueFrom(service.getCategories());

      const req = httpMock.expectOne(`${baseUrl}/api/categories`);
      req.flush({ categories: mockCategories });

      await responsePromise;

      expect(categories.length).toBe(2);
    });
  });
});
