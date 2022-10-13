import * as fs from 'fs';

export default class CreateDirectory {
  createDirectory(
    path: string,
    mask: number,
    callback: (arg0: NodeJS.ErrnoException) => any,
  ): any {
    if (typeof mask == 'function') {
      callback = mask;
      mask = 0o744;
    }
    fs.mkdir(path, mask, function (error) {
      if (error) {
        if (error.code == 'EEXIST') {
          callback(null);
        } else {
          callback(error);
        }
      } else {
        callback(null);
      }
    });
  }
}
