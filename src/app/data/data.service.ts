import {Injectable} from '@angular/core';
import {Post} from '../Post';
import {Observable, of} from 'rxjs';

@Injectable()
export class DataService {

  Posts: Post[] = [];

  InitialPosts: Post[] = [
    {position: 0, title: 'Post One', category: 'Web Development', date_posted: new Date(), body: 'Body 1'},
    {position: 1, title: 'Post Two', category: 'Android Development', date_posted: new Date(), body: 'Body 2'},
    {position: 2, title: 'Post Three', category: 'IOS Development', date_posted: new Date(), body: 'Body 3'},
    {position: 3, title: 'Post Four', category: 'Android Development', date_posted: new Date(), body: 'Body 4'},
    {position: 4, title: 'Post Five', category: 'IOS Development', date_posted: new Date(), body: 'Body 5'},
    {position: 5, title: 'Post Six', category: 'Web Development', date_posted: new Date(), body: 'Body 6'},
  ];
  categories = [
    {value: 'Web-Development', viewValue: 'Web Development'},
    {value: 'Android-Development', viewValue: 'Android Development'},
    {value: 'IOS-Development', viewValue: 'IOS Development'}
  ];

  constructor()  { 

    console.log('Checking local storage for posts...');
    this.Posts = JSON.parse(localStorage.getItem('posts'));

    if(!this.Posts){
      console.log('No Local Posts found. Intializing...');
      this.Posts = this.InitialPosts;
      localStorage.setItem('posts', JSON.stringify(this.Posts));
      console.log('${Posts.length} posts were saved to local storage.');
    }
    else
    {
      console.log('Loaded ${Posts.length} posts from local storage.');
    }
  }

   getData(): Observable<Post[]> {
    console.log('getData() called...');
    return of<Post[]>(this.Posts);
  }

  getCategories() {
    return this.categories;
  }

  addPost(data) {
    this.Posts.push(data);
    this.updateLocalStorage();
  }

  deletePost(index) {
    this.Posts = [...this.Posts.slice(0, index), ...this.Posts.slice(index + 1)];
    this.updateLocalStorage();
  }

  dataLength() {
    return this.Posts.length;
  }

  private updateLocalStorage(){
    localStorage.setItem('posts', JSON.stringify(this.Posts));
  }
}
