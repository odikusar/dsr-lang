import { TestBed } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FireApiService } from './fire-api.service';

describe('FireApiService', () => {
  let service: FireApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireStorage, useValue: null },
        { provide: AngularFirestore, useValue: null },
      ],
      imports: [AngularFirestoreModule],
    });
    service = TestBed.inject(FireApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain memoFiles collection name', () => {
    // @ts-ignore
    expect(service.memoFilesCollection).toEqual('memoFiles');
  });

  it('should contain usersCollection collection name', () => {
    // @ts-ignore
    expect(service.usersCollection).toEqual('users');
  });
});
