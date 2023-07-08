import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApifunctionsService } from 'src/app/shard/apifunctions.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
  allData: any[] = [];
  constructor(private service: ApifunctionsService, private router:Router){
    this.getallpost()
  }
  ngOnInit(): void {

  }
  getallpost(){
    this.service.getpost().subscribe((data : any)=>{
    this.allData = data
     })
  }
  remove(id:any){
    this.service.deletepost(id).subscribe({
      next: response => console.log('Post delete successfully'),
      error: error => {console.log('Error:',error); this.router.navigateByUrl('/');this.getallpost()}
    })
  }
  update(id:any){
    this.service.updatepost(id).subscribe(data=>{
      this.router.navigateByUrl('/listp')
    })
  }


}
