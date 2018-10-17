import {Pipe, PipeTransform} from '@angular/core';

interface Arg {
  searchValue: string;
  replaceValue: string;
}

@Pipe({
  name: 'kylinReplace'
})

export class ReplacePipe implements PipeTransform {
  /**
   *
   * @param value
   * @param args 如果目标需要替换多个字符串,那么就传入多个数组就可以了
   */
  transform(value: string, args: Array<Arg>): string {
    args.forEach(arg => {
      value = value.replace(new RegExp(arg.searchValue, 'gm'), arg.replaceValue);
    });
    return value;
  }

}
