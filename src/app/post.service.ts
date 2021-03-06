import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {

  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    // Send Http request
    this.http
      .post<{ name: string }>(
        'https://angular-api-learn.firebaseio.com/posts.json',
        postData,
        {
          observe : 'response' //return the full object 
        }
      )
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error);
      });
  }

  fetchPosts(): Observable<any> {

    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('new', 'value'); //this is how you can attach multiple search params

    //Get is a generic method, I do not have to specify the type in the map method
    //this.http.get<{ [key:string] : Post }>('https://angular-api-learn.firebaseio.com/posts.json')
    return this.http.get('https://angular-api-learn.firebaseio.com/posts.json', {
      headers : new HttpHeaders({'Custom-Header':'Hello'}),
      params : new HttpParams().set('print', 'pretty')
    })
      .pipe(
        map((responseData: { [key: string]: Post }) => { //{[key:string]:{ title: string; content: string }}
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) { //czy ma taką wartość, inaczej bedzie undefined
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorResponse => {
          //send to analytics for the errors in the map function
          return throwError(errorResponse); //create a new observable, since we need to return it and then use in the subscribe method
        })
      );
  }

  deleteAll() {
    this.http.delete('https://angular-api-learn.firebaseio.com/posts.json',
    {
      observe : 'events'
    }
    ).pipe(tap(event => {
      console.log(event);
      if (event.type === HttpEventType.Sent){
        console.log(event.type);
      }
      if (event.type === HttpEventType.Response){  //http events 
        console.log(event.body);
      }
    }))
    .subscribe();
  }
}