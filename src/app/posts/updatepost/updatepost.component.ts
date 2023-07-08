import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApifunctionsService } from 'src/app/shard/apifunctions.service';

@Component({
  selector: 'app-updatepost',
  templateUrl: './updatepost.component.html',
  styleUrls: ['./updatepost.component.css']
})
export class UpdatepostComponent implements OnInit, AfterViewInit {
  postForm: FormGroup;
  postId: any;
  postlist: any;
  post: any;

  constructor(
    private fb: FormBuilder,
    private postService: ApifunctionsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      post_image: [null, Validators.required],
      post_message: [null, Validators.required],
      post_title: [null, Validators.required]
    });
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.postId = params.get('id');
      this.postService.getpost().subscribe((data: any) => {
        this.postlist = data;
        this.post = this.postlist.find(
          (post: any) => post.id === Number(params.get('id'))
        );
      });
    });
  }

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.postForm.patchValue({
      post_image: file
    });
  }

  onSubmit() {
    const post = this.postForm.value;
    const formData = new FormData();
    formData.append('id', this.postId);
    formData.append('post_image', post.post_image);
    formData.append('post_message', post.post_message);
    formData.append('post_title', post.post_title);

    this.postService.updatepost(formData).subscribe({
      next: response => {
        console.log('Post updated successfully');
        // Optionally, you can navigate to a different route after successful update
        this.router.navigateByUrl('/');
      },
      error: error => {
        console.log('Error:', error);
      }
    });

    this.postForm.reset();
  }
}
