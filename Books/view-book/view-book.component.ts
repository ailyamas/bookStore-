import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {
  book:Book

  constructor(private bookService: BookService, 
              private route: ActivatedRoute,
              private router:Router) { }

  ngOnInit(){
    this.book = new Book('','');
    const id = this.route.snapshot.params['id'];
    this.bookService.getSingleBook(+id).then(
      (book:any)=>{
        this.book = book;
        
      }
    )
  }
  onBack(){
    this.router.navigate(['books'])
  }

}
