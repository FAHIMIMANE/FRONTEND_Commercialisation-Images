// @ts-ignore
// @ts-ignore

import {Component, NgModule, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/controller/service/Auth.service';
import {Router} from '@angular/router';
import {PhotoService} from '../../../demo/service/photoservice';


@Component({
  selector: 'app-login-client',
 templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.scss']
})
 export class LoginClientComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  images: any;
  responsiveOptions: any;
    displayStyle = 'none';
    imageObject: Array<object> = [{
        image: 'https://source.unsplash.com/1000x828',
        thumbImage: 'https://source.unsplash.com/1000x828',
        alt: 'alt of image',

    },
        {
            image: 'https://source.unsplash.com/1000x829',
            thumbImage: 'https://source.unsplash.com/1000x829',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x830',
            thumbImage: 'https://source.unsplash.com/1000x830',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x831',
            thumbImage: 'https://source.unsplash.com/1000x831',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x832',
            thumbImage: 'https://source.unsplash.com/1000x832',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x833',
            thumbImage: 'https://source.unsplash.com/1000x833',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x834',
            thumbImage: 'https://source.unsplash.com/1000x834',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x848',
            thumbImage: 'https://source.unsplash.com/1000x848',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x849',
            thumbImage: 'https://source.unsplash.com/1000x849',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x850',
            thumbImage: 'https://source.unsplash.com/1000x850',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x851',
            thumbImage: 'https://source.unsplash.com/1000x851',
            alt: 'alt of image',

        },
        {
        image: 'https://source.unsplash.com/1000x835', // Support base64 image
        thumbImage: 'https://source.unsplash.com/1000x835', // Support base64 image
         //Optional: You can use this key if want to show image with title
        alt: 'Image alt', //Optional: You can use this key if want to show image with alt
        order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
    }
    ];
    imageObjet: Array<object> =[{
        image: 'https://source.unsplash.com/1000x836',
        thumbImage: 'https://source.unsplash.com/1000x836',
        alt: 'alt of image',

    },
        {
            image: 'https://source.unsplash.com/1000x837',
            thumbImage: 'https://source.unsplash.com/1000x837',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x838',
            thumbImage: 'https://source.unsplash.com/1000x838',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x839',
            thumbImage: 'https://source.unsplash.com/1000x839',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x840',
            thumbImage: 'https://source.unsplash.com/1000x840',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x841',
            thumbImage: 'https://source.unsplash.com/1000x841',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x842',
            thumbImage: 'https://source.unsplash.com/1000x842',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x843', // Support base64 image
            thumbImage: 'https://source.unsplash.com/1000x843', // Support base64 image
            //Optional: You can use this key if want to show image with title
            alt: 'Image alt', //Optional: You can use this key if want to show image with alt
            order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
        },
        {
            image: 'https://source.unsplash.com/1000x844',
            thumbImage: 'https://source.unsplash.com/1000x844',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x845',
            thumbImage: 'https://source.unsplash.com/1000x845',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x846',
            thumbImage: 'https://source.unsplash.com/1000x846',
            alt: 'alt of image',

        },
        {
            image: 'https://source.unsplash.com/1000x847',
            thumbImage: 'https://source.unsplash.com/1000x847',
            alt: 'alt of image',

        },

    ];

  ngOnInit(): void {
  }
  submit(){
    const formValues = this.loginForm.value;
    const username = formValues.username;
    const passowrd = formValues.password;
    this.authService.loginClient(username, passowrd);

  }
    register(){
    this.router.navigate(['/client/register']);
  }

    openPopup() {
        this.displayStyle = 'block';
    }
    closePopup() {
        this.displayStyle = 'none';
    }
}




