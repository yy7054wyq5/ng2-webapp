import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/sampleTime';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/empty';
import { Observable } from 'rxjs/Observable';
export declare function sampleObservable(obs: Observable<any>, scheduler?: any): Observable<any>;
export declare const getScrollListener: (scrollTarget: any) => Observable<any>;
