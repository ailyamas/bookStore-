import { Component, OnInit } from '@angular/core';
import { BookService } from  'src/app/Services/book.service'
import { Book} from 'src/app/model/book.model'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  books:Book[]=[]
  bookSub:Subscription
  displayedColumn:string[]=["title"]
  listData:MatTableDataSource<any>
  constructor(private bookService : BookService, private  router:Router ) { }

  ngOnInit() {
    
    this.bookSub = this.bookService.bookSubject.subscribe(
      (books:Book[]) =>{
        this.books = books;
      }
       )
       this.bookService.emitBooks();
       this.listData= new MatTableDataSource(this.books)
  }
     
        //this.listData= new MatTableDataSource(array)
      
    
    

 }
  


