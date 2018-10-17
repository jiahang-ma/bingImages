export class ValidatorsConfig {
  static captchaErrorMsg = '验证码长度不对';
  static phoneNumberErrorMsg = '请输入正确格式的手机号码';
  static passwordErrorMsg = '密码为6-128位数字、字母或特殊字符';
  static equalToErrorMsg = '两次输入的密码不一致';
  static rangeLengthErrorMsg = '长度不对';
}

export type  CaptchaType = 'img' | 'mobile';
