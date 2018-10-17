import {Component, OnInit, Input, AfterViewInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {Location} from '@angular/common';
import {ShareService} from './share.service';
import {ConfigService} from '../../../config/config.service';


@Component({
  selector: 'kylin-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.less'],
  providers: [ShareService]
})
export class ShareComponent implements OnInit, AfterViewInit, OnDestroy {
  defaultPicUrl = this.configService.shareHostname + '/assets/images/logo.png'; // 默认图片地址
  url = this.configService.shareHostname + '/%23' + this.location.path();
  url_wx = this.configService.shareHostname + '/#' + this.location.path();
  _title = '棉花化肥农药减施技术信息平台';
  _picUrl = this.defaultPicUrl;

  /**
   *
   * @param value 如果value中不包含/img说明传入的字符串并不是完整的图片路径,所以依然采用默认图片
   */
  @Input()
  set picUrl(value: string) {
    // 避免没有picUrl输入时，报错
    if (value && value.indexOf('/img') !== -1) {
      this._picUrl = value;
    }
  }

  get picUrl() {
    return this._picUrl;
  }

  @Input() targetUrl: string;

  @Input()
  set title(value: string) {
    if (value) {
      this._title = value;
    }
  }

  get title(): string {
    return this._title;
  }

  @ViewChild('qrcode') qrcodeDom: ElementRef;
  @ViewChild('qrcodeWrapper') qrcodeWrapperDom: ElementRef;

  constructor(private location: Location, private configService: ConfigService) {
  }

  ngOnInit() {
    this.url = this.configService.shareHostname + '/%23' + (this.targetUrl || this.location.path());
    this.url_wx = this.configService.shareHostname + '/#' + (this.targetUrl || this.location.path());
  }

  ngAfterViewInit() {
    this.QRcodesInit();
    document.addEventListener('click', this.listener);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.listener);
  }

  private listener = (event) => {
    const qrcodeWrapper: any = this.qrcodeWrapperDom.nativeElement;
    qrcodeWrapper.style.display = 'none';
  }

  shareToSina() {
    const sharesinastring = 'http://v.t.sina.com.cn/share/share.php?title=' +
      this._title + '&url=' + this.url + '&content=utf-8&sourceUrl=' + this.url + '&pic=' + this._picUrl;
    window.open(sharesinastring, 'newwindow', 'height=400,width=400,top=100,left=100');
  }

  shareToqqzone() {
    const shareqqzonestring = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title=' +
      this._title + '&url=' + this.url + '&pics=' + this._picUrl;
    window.open(shareqqzonestring, 'newwindow', 'height=400,width=400,top=100,left=100');
  }

  QRcodesInit() {
    const qrcode = new QRCode(this.qrcodeDom.nativeElement, {
      width: 128,
      height: 128,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
    qrcode.makeCode(this.url_wx);
  }

  changeQrcodeDisplay(event, type: string) {
    event.stopPropagation();
    Array.from(document.getElementsByClassName('qrcode-wrapper')).map(item => {
      // 当页面上存在多个分享组件的二维码框时，关闭其他的二维码框
      (item as any).style.display = 'none';
    });
    const qrcodeWrapper: any = this.qrcodeWrapperDom.nativeElement;
    qrcodeWrapper.style.display = type;
  }
}
