import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { BookService } from 'src/app/Services/book.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  newBookform : FormGroup
  fileUploading = false;
  fileUrl : string;
  fileUploaded =false;

  constructor(private bookService:BookService
              , private formBuilder: FormBuilder,
              private router :Router) { }

  ngOnInit(): void {
    this.initForm()
  }
  initForm(){
    this.newBookform = this.formBuilder.group({
      title:['', Validators.required],
      author:['', Validators.required]
    })
  }
  onAddBook(){
    const title = this.newBookform.get('title')?.value
    const author = this.newBookform.get('author')?.value;
    const newBook= new Book(title,author);
    if(this.fileUrl && this.fileUrl!==''){
        newBook.photos= this.fileUrl
    }
    this.bookService.createBook(newBook)
    this.router.navigate(['books'])
  }
  onUploadFile(file:File){
    this.fileUploading=true; 
    this.bookService.uploadFile(file).then(
      (url:any)=>{
        this.fileUrl= url
        this.fileUploading=false;
        this.fileUploaded=true
      }
    )
  }
  detectFile(event: any){
    this.onUploadFile(event.target.files[0])
  }

}
