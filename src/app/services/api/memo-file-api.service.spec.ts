import { TestBed } from '@angular/core/testing';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MemoFileApiService } from './memo-file-api.service';

describe('MemoFileApiService', () => {
  let service: MemoFileApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFireStorage, useValue: null },
        { provide: AngularFirestore, useValue: null },
      ],
      imports: [AngularFirestoreModule],
    });
    service = TestBed.inject(MemoFileApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should contain collection name', () => {
    // @ts-ignore
    expect(service.collectionName).toEqual('memoFiles');
  });
});
