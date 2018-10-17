import {Component, OnInit, ElementRef, AfterViewInit} from '@angular/core';

interface Image {
  title: string;
  path: string;
}

@Component({
  templateUrl: './light-gallery.component.html',
  styleUrls: ['./light-gallery.component.css']
})
export class LightGalleryComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef) {
  }

  images: Array<Image> = [
    {
      title: '美泉宫花园的秋日景色， 奥地利维也纳',
      path: '1.jpg'
    },
    {
      title: '1846年8月10日成立的史密森尼学会',
      path: '2.jpg'
    },
    {
      title: '安东尼奥港的景色，牙买加',
      path: '3.jpg'
    },
    {
      title: '费城爱心公园内的罗伯特·印第安纳的雕塑Love',
      path: '4.jpg'
    },
    {
      title: '节日期间爱丁堡城堡上空的烟花',
      path: '5.jpg'
    },
    {
      title: '凯恩戈姆山国家公园内的苏格兰野猫，苏格兰',
      path: '6.jpg'
    },
    {
      title: '瓦伊纳皮克丘山周围的云雾，秘鲁',
      path: '7.jpg'
    },
    {
      title: '在恶地国家公园骑行的飞车党，美国南达科他州',
      path: '8.jpg'
    }
  ];
  imgHostname = '../../../assets/previews/';

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
  }

  ngAfterViewInit() {
    this.lightGalleryInit();
  }

}
