import { TestBed } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { StoreModule } from '@ngrx/store';
import { FileService } from './file.service';

describe('FileService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFireStorage, useValue: null }],
      imports: [StoreModule.forRoot({})],
    });
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should has specified csv files base path', () => {
    // @ts-ignore
    expect(service.basePath).toEqual('/csv');
  });

  it('should get file path by file name', () => {
    // @ts-ignore
    expect(service.getFilePath('testFileName')).toEqual('/csv/testFileName');
  });

  it('should generate random file name', () => {
    // @ts-ignore
    expect(service.getRandomFileName('testFileName')).toBeInstanceOf(String);

    // @ts-ignore
    expect(service.getRandomFileName('testFileName') !== 'testFileName').toBeTrue();
  });
});
