import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common'; // 由此模块给其他模块提供common服务
import {FormsModule} from '@angular/forms';  // 表单基础依赖
import {ReactiveFormsModule} from '@angular/forms'; // 响应式表单依赖
import {RouterModule} from '@angular/router';  // 在html标签使用 RouterLink 等指令
import {NgZorroAntdModule} from 'ng-zorro-antd'; // ng-zorro

// 注册ng-zorro语言包
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

// ngx-echarts
import {NgxEchartsModule} from 'ngx-echarts';

// 无限滚动
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

// 管道
import {ArticleClassifyPipe} from './pipes/article-classify.pipe';
import {DatePipePipe} from './pipes/date-pipe.pipe';
import {ReplacePipe} from './pipes/replace.pipe';
// 指令

// 组件
import {ShareComponent} from './components/share/share.component';
// 常量

const components = [ShareComponent];
const directives = [];
const pipes = [ArticleClassifyPipe, DatePipePipe, ReplacePipe];


@NgModule({
    imports: [
        CommonModule,
        NgZorroAntdModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgxEchartsModule,
        InfiniteScrollModule
    ],

    declarations: [...components, ...directives, ...pipes],
    providers: [],
    exports: [ReactiveFormsModule, CommonModule, FormsModule, InfiniteScrollModule,
        NgZorroAntdModule, RouterModule, NgxEchartsModule,
        ...components, ...directives, ...pipes]
})
export class SharedModule {
}
