import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { StoreModule } from '@ngrx/store';
import { MemoService } from './memo.service';

describe('MemoService', () => {
  let service: MemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFireStorage, useValue: null }],
      imports: [StoreModule.forRoot({})],
    });
    service = TestBed.inject(MemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate first and last indexes by pages', () => {
    expect(service.getBoundaryRowsIndexes([0, 1, 2], 400, 53)).toEqual({
      firstRowIndex: 0,
      lastRowIndex: 158,
    });
  });

  it('should return selected rows indexes', () => {
    expect(service.getSelectedRowsIndexes([0, 2, 4, 5], 4, 15, 5)).toEqual([4, 10, 11, 12, 13, 14]);
  });
});
