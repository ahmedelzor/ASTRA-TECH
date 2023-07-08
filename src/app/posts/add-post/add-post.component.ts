import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { Post } from 'src/app/models/post';
import { ApifunctionsService } from 'src/app/shard/apifunctions.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent  {

  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: ApifunctionsService  , private router: Router) {
    this.postForm = this.fb.group({
      post_image: [null, Validators.required],
      post_message: [null, Validators.required],
      post_title: [null, Validators.required]
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
    formData.append('post_image', post.post_image);
    formData.append('post_message', post.post_message);
    formData.append('post_title', post.post_title);

    this.postService.addPost(formData).subscribe(
      {
        next: response => {console.log('Post added successfully') },
        error: error => {console.log('Error:', error); this.router.navigateByUrl('/')}
      }
    );

    this.postForm.reset();


  }
}