import { Component, OnInit } from '@angular/core';
import { ResourcesModel } from 'src/app/Model/ResourceModel';
import { Response, ResponseStatus } from 'src/app/Model/Response';
import { ResourceService } from 'src/app/Service/resource.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { BookDialogComponent } from 'src/app/component/book-dialog/book-dialog.component';

@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css']
})

export class ResourceTableComponent implements OnInit {
  allResource: Array<ResourcesModel>;
  displayedColumns: string[] = ['id', 'name', 'actions'];
  constructor(private resourceService: ResourceService,private _snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit() {
    this.resourceService.GeAllResources().subscribe(
      (res: Response) => {
        if (res.status == ResponseStatus.Success) {
          this.allResource = res.data as Array<ResourcesModel>
        }
      },
      err => {
        this._snackBar.open("Error With Getting Data", "Close");
      }
    );
  }
  Book(Resource: ResourcesModel) {
    this.dialog.open(BookDialogComponent, {
      width: '320px',
      data: {resource: Resource}
    });
  }

}
