import { TestBed } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UserApiService } from './user-api.service';

describe('FireApiService', () => {
  let service: UserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireStorage, useValue: null },
        { provide: AngularFirestore, useValue: null },
      ],
      imports: [AngularFirestoreModule],
    });
    service = TestBed.inject(UserApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain collection name', () => {
    // @ts-ignore
    expect(service.collectionName).toEqual('users');
  });
});
