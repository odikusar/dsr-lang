import { FileNamePipe } from './file-name.pipe';

describe('FileNamePipe', () => {
  it('create an instance', () => {
    const pipe = new FileNamePipe();
    expect(pipe).toBeTruthy();
  });

  it('should contain FILENAME_LENGTH equal to 12', () => {
    const pipe = new FileNamePipe();

    // @ts-ignore
    expect(pipe.FILENAME_LENGTH).toEqual(12);
  });

  it('should return file name without extension and max length 12', () => {
    const pipe = new FileNamePipe();

    expect(
      pipe.transform({
        id: 'testId',
        userId: 'testUserName',
        name: 'testFileName',
        initialName: 'testInitialName.csv',
        url: 'testUrl',
      })
    ).toEqual('testInitialN');
  });
});
