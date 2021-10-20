import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { BookingModel } from 'src/app/Model/BookingModel';
import { BookingService } from 'src/app/Service/booking.service';
import { Response } from 'src/app/Model/Response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-dialog',
  templateUrl: './book-dialog.component.html',
  styleUrls: ['./book-dialog.component.css']
})
export class BookDialogComponent implements OnInit {
  booking:BookingModel ;
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<BookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private bookingService:BookingService,private _snackBar: MatSnackBar,fb: FormBuilder) {
      this.booking=new BookingModel();
      this.booking.resourceId=data.resource.id;
      this.form = fb.group({
        dateFrom: [this.booking.dateFrom ,[Validators.required]],
        dateTo:   [this.booking.dateTo , [Validators.required]],
        bookedQuantity:[this.booking.bookedQuantity, [Validators.required,Validators.min(1)]]
    });
     }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  BookResource(): void
  {
    debugger;
    if (this.form.valid) {
      this.bookingService.BookResource(this.booking).subscribe(
        (res:Response)=>
        {
          this._snackBar.open(res.message, "Close");
        },
        (err:any)=>
        {
          this._snackBar.open(err.error.message, "Close");
        }
      );
  } else {
    if(this.form.controls.dateFrom.invalid)
    {
      this._snackBar.open("invalid From Date", "Close");
    }else if(this.form.controls.dateTo.invalid)
    {
      this._snackBar.open("invalid To Date", "Close");
    }else if(this.form.controls.bookedQuantity.invalid)
    {
      this._snackBar.open("invalid booked Quantity", "Close");
    }
  }
    
  }
}
