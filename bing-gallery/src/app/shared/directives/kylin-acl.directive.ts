import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';


import {Button} from '../../login/login';

@Directive({
  selector: '[kylinAcl]'
})
export class KylinAclDirective {

  buttonList: Array<Button>; // 所有应该显示的按钮的名称
  private hasView = false; // 是否有视图
  private allow = false; // 是否允许按钮显示

  constructor(
    private siderDataService: SiderDataService,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef) {
    this.buttonList = siderDataService.getSiderData().buttonList;
  }

  /**
   *
   * @param {string} buttonName 按钮的名称
   */
  @Input() set kylinAcl(buttonName: string) {
    this.buttonList.forEach((allowName) => {
      if (allowName.menuCode === buttonName) {
        this.allow = true;
      }
    });

    if (this.allow) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!this.allow) {
      this.viewContainerRef.clear();
      this.hasView = false;
    }

  }
}
