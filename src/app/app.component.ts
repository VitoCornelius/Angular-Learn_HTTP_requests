import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.http
      .post<{name : string}>(
        'https://angular-api-learn.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;

    //Get is a generic method, I do not have to specify the type in the map method

    //this.http.get<{ [key:string] : Post }>('https://angular-api-learn.firebaseio.com/posts.json')

    this.http.get('https://angular-api-learn.firebaseio.com/posts.json')
    .pipe(map((responseData : { [key:string] : Post }) => { //{[key:string]:{ title: string; content: string }}
      const postsArray : Post[] = [];
      for (const key in responseData){
        if (responseData.hasOwnProperty(key)){ //czy ma taką wartość, inaczej bedzie undefined
          postsArray.push({ ...responseData[key], id:key});
        }
      }
      return postsArray;
    }))
    .subscribe(posts => {
      console.log(posts);
      this.isFetching = false;
      this.loadedPosts = posts;
    })
  }
}
