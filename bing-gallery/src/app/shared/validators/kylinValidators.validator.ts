import {AbstractControl, ValidatorFn} from '@angular/forms';
import {ValidatorsConfig, CaptchaType} from './kylinValidators';

// 自定义表单校验都是静态方法,直接引用即可

export class CustomValidators {

  public static captchaValidator(type: CaptchaType): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value) {
        if (type === 'img' && control.value.length === 4) {
          return null;
        } else if (type === 'mobile' && control.value.length === 6) {
          return null;
        } else {
          return {'captcha': {value: control.value, errorMsg: ValidatorsConfig.captchaErrorMsg}}; // errorMsg 就是报错的消息提示
        }
      } else {
        return null; // 如果没有值传入 不管
      }
    };
  }

  public static phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value) {
        if (this.checkPhone(control.value)) {
          return null;
        } else {
          return {'phoneNumber': {value: control.value, errorMsg: ValidatorsConfig.phoneNumberErrorMsg}};
        }
      } else {
        return null;
      }
    };
  }

  public static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value) {
        if (control.value.length >= 6 && control.value.length <= 128) {
          return null;
        } else {
          return {'password': {value: control.value, errorMsg: ValidatorsConfig.passwordErrorMsg}};
        }
      } else {
        return null;
      }
    };
  }

  public static equalToValidator(value): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (value.value) {
        if (value.value === control.value) {
          return null;
        } else {
          return {'equalTo': {value: control.value, errorMsg: ValidatorsConfig.equalToErrorMsg}};
        }
      } else {
        return null;
      }
    };
  }

  public static rangeLengthValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value) {
        const countCode = this.countCode(control.value);
        if (countCode >= min && countCode <= max) {
          return null;
        } else {
          return {'rangeLength': {value: control.value, errorMsg: `不能大于${max}个字符或${max / 2}个汉字`}};
        }
      } else {
        return null;
      }
    };
  }

  private static countCode(str: string): Number {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      const c = str.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        count++;
      } else {
        count += 2;
      }
    }
    return count;
  }

  private static checkPhone(phoneNumber: string): Boolean {
    return /^1[34578]\d{9}$/.test(phoneNumber);
  }

}




