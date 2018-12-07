import {Component, OnInit, ElementRef, AfterViewInit} from '@angular/core';
import {HttpService} from '@http';
import {ConfigService} from '../config/config.service';

@Component({
    templateUrl: './light-gallery.component.html',
    styleUrls: ['./light-gallery.component.css']
})
export class LightGalleryComponent implements OnInit, AfterViewInit {

    imagePath: string;
    images: { path: string, title: string }[];
    imgHostname: string;

    constructor(private elementRef: ElementRef,
                private http: HttpService,
                private config: ConfigService) {
        this.imagePath = '/images';
        this.imgHostname = config.imgHostname;
    }

    fetchImagesData() {
        this.http.get(this.imagePath)
            .then(res => {
                this.images = res.data.map(i => {
                    return {path: this.imgHostname + '/' + i, title: i};
                });
                setTimeout(() => {
                    this.lightGalleryInit();
                }, 0);
            })
            .catch(err => {

            });
    }

    openLightGallery() {
        const firstImg = this.elementRef.nativeElement.querySelector('.img-item');
        firstImg.click();
    }

    private lightGalleryInit() {
        lightGallery(document.getElementById('aniimated-thumbnials'), {
            thumbnail: true
        });
    }

    ngOnInit() {
        this.fetchImagesData();
    }

    ngAfterViewInit() {

    }

}
