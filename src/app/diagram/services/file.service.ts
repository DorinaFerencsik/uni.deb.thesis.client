import { Injectable } from '@angular/core';
import { Base64 } from 'js-base64';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  public readFile<T>(file: File, info: any): Observable<T> {
    // TODO: checks

    return new Observable((o: Observer<T>) => {
      const reader = new FileReader();

      reader.onerror = err => o.error(err);
      reader.onabort = err => o.error(err);
      reader.onload = () => o.next({
        ...info,
        content: Base64.encode(reader.result as string),
      });
      reader.onloadend = () => o.complete();

      return reader.readAsText(file);
    });
  }

  public getFilename(fullName: string): string {
    return fullName.split('.').slice(0, -1).join('.');
  }
}
