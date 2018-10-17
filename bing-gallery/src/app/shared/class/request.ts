import {HttpParams} from '@angular/common/http';

export class RequestParams {
  [param: string]: string | string[]
}

export type CustomRequestParams = HttpParams | RequestParams;

