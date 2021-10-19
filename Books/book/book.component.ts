import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {
  bookSub : Subscription;
  books :Book[];
  constructor(private bookService: BookService,
              private router:Router) { }

  ngOnInit() {
    this.bookSub = this.bookService.bookSubject.subscribe(
      (books:Book[]) =>{
        this.books = books;
      }
       );
       this.bookService.emitBooks();
  }
  onDeleteBook(book:Book){
    this.bookService.removeBook(book)
  }
  onViewBook(id:number){
    this.router.navigate(['books','view-book',id])

  }
  onNewBook(){
    this.router.navigate(['books/new-book'])
  }
  ngOnDestroy(){
    this.bookSub.unsubscribe()
  }


}
