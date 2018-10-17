import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'kylinArticleClassify'
})
export class ArticleClassifyPipe implements PipeTransform {

  transform(value: number | string, args?: any): string {
    Number(value);
    switch (value) {
      case 1:
        return '技术产品';
      case 2:
        return '论文专利';
      case 3:
        return '技术规程';
      case 4:
        return '集成示范';
      default:
        return '';
    }
  }

}
