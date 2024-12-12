import { TestBed } from '@angular/core/testing';
import { SupabaseService } from './supabase.service';

describe('SupabaseService', () => {
  let service: SupabaseService;
  let supabaseServiceMock: Partial<SupabaseService>;

  beforeEach(() => {
    // Crear un mock del servicio
    supabaseServiceMock = {
      signUp: jasmine.createSpy('signUp').and.returnValue(Promise.resolve({ data: { user: { email: 'test@example.com' } }, error: null }))
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: SupabaseService, useValue: supabaseServiceMock }
      ]
    });

    // Inyectar el servicio mockeado
    service = TestBed.inject(SupabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign up', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    const result = await service.signUp(email, password);

    // Verificar que el mock se haya llamado con los argumentos esperados
    expect(supabaseServiceMock.signUp).toHaveBeenCalledWith(email, password);

    // Verificar que la respuesta no sea nula
    expect(result).toBeTruthy();
    // Aquí puedes agregar más verificaciones si lo deseas
  });
});
