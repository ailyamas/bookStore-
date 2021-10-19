import { Injectable } from '@angular/core';
import { DataSnapshot } from '@angular/fire/compat/database/interfaces';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Subject } from 'rxjs';
import { Book } from 'src/app/model/book.model'
import { AngularFireStorage } from '@angular/fire/compat/storage';
import * as firebase from "firebase/compat/app"
@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: Book[]=[] 
  bookSubject= new Subject<Book[]>()
  constructor(private db:AngularFireDatabase,
              private storage:AngularFireStorage) {
    this.getBooks();
   }
   
   uploadFile(file:File){
    return new Promise((resolve, reject)=>{
      
      const almostUniqueFileName= Date.now().toString();
      const upload = firebase.default.storage().ref()
            .child('images/'+almostUniqueFileName +file.name)
            .put(file);
          upload.on(firebase.default.storage.TaskEvent.STATE_CHANGED,
            ()=>{
              console.log("chargement...")
            },
            (error)=>{
              console.log("error occured", +error)
              reject();
            },
            ()=>{
              console.log("chargement complet ")
              resolve(upload.snapshot.ref.getDownloadURL())
            }
            )
      
    }
    )
  }
 
  onsaveBook(){
    this.db.database.ref('/BookManag').set(this.books)
  }
  getBooks(){
    return this.db.database.ref('/BookManag').on('value',
    (data:DataSnapshot) => {
      this.books= data.val()? data.val():[];
    }
    )
  }
  getSingleBook(id:number){
      return new Promise((resolve,reject) => {
        this.db.database.ref('/BookManag/'+id).once('value').then(
          (data:DataSnapshot)=>{
            resolve(data.val());
          },
          (error) => reject(error)
        )
    
      }) 
  }
  createBook(newBook:Book){
    this.books.push(newBook);
    this.onsaveBook();
    this.emitBooks();
  }
  removeBook(book:Book){
    const bookRemvId = this.books.findIndex(
      (bookEl)=>{
        if(bookEl === book){
          return true;
        }else{
        return false;
        }
      }
     )
     this.books.splice(bookRemvId, 1);
     this.onsaveBook();
     this.emitBooks(); 
  }
  
  emitBooks(){
    this.bookSubject.next(this.books)
  }
}
