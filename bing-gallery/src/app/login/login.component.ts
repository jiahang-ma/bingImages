import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {SkipService} from '@skip';
import {LoginService} from './login.service';
import {StorageService} from '@storage';
import {TokenService} from '@token';
import {NzMessageService} from 'ng-zorro-antd';

import {SiderData} from './login';
import {CustomValidators} from '@validator';
import {UserService} from '@user';


@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit, AfterViewInit {

  // todo 添加响应式表单校验
  /**
   * 声明响应式表单
   */
  loginForm: FormGroup;
  loading = false;

  constructor(private routingJumpService: SkipService,
              private fb: FormBuilder,
              private storageService: StorageService,
              private loginService: LoginService,
              private message: NzMessageService,
              private tokenService: TokenService,
              private userService: UserService
  ) {
  }

  /**
   * 此方法用创建响应式表单
   */
  ngOnInit(): void {
    this.clearStorage(); // 进入此页面清空所有浏览器缓存
    this.loginFormInit();
    this.AccountInfoInit(); // 必须在loginFormInit后执行
  }

  ngAfterViewInit(): void {
  }

  /**
   * 此方法用来提交登陆表单
   */
  submitForm(): void {
    if (!this.loginForm.valid) {
      for (const i in this.loginForm.controls) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    this.loading = true;
    this.loginService.doLogin(this.loginForm.value.mobile.trim(), this.loginForm.value.passWord.trim())
      .then(res => {
        this.loading = false;
        if (res.result === '00000000') {
          console.log(`登陆成功:拿到的数据是`);
          console.log(res.data);
          this.storeData(res.data);
          this.tokenService.setToken(res.data.user.token); // 缓存token
          this.handleAccountInfo();
          this.userService.set(res.data.user);
          this.routeJump('/home/article-management');
        } else {
          console.warn(res.msg);
          this.message.create('error', res.msg);
        }
      })
      .catch(err => {
        this.loading = false;
        console.warn(err);
        this.message.create('error', `登陆失败`);
      });

  }


  /**
   * 用来路由跳转
   * @param {string} path
   */
  routeJump(path: string) {
    this.routingJumpService.path(path);
  }

  /**
   * 此方法用来向localStorage写入登陆成功以后从后端获取来sider相关数据
   * @param {SiderData} siderData
   */
  private storeData(siderData: SiderData) {
    this.storageService.setLocal('siderData', siderData);
  }

  private loginFormInit() {
    this.loginForm = this.fb.group({
      mobile: ['18966506837', [Validators.required, CustomValidators.phoneNumberValidator()]],
      passWord: ['123456', [Validators.required]],
      agree: [true]
    });
  }

  private handleAccountInfo() {
    const info = this.loginForm.value;
    if (info.agree) {
      this.loginService.saveAccountInfo({mobile: info.mobile, passWord: info.passWord});
    } else {
      this.loginService.deleteAccountInfo();
    }
  }

  private AccountInfoInit() {
    const info = this.loginService.getAccountInfo();
    if (info) {
      this.loginForm.get('mobile').setValue(info.mobile);
      this.loginForm.get('passWord').setValue(info.passWord);
    }
  }

  private clearStorage() {
    this.storageService.removeItem('siderData');
  }

}

