import {Injectable} from '@angular/core';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitoringService {
  interval: any;

  constructor(private router: Router) {
  }

  collectData: { path: string; usedTime: number } = null;

  init() {
    if (this.interval) {
      return;
    }
    let startTime = new Date().getTime();
    this.interval = setInterval(() => {
      const usedTime = new Date().getTime() - startTime;
      this.handler(usedTime);
      startTime = new Date().getTime();
    }, 100);
  }

  destroy() {
    if (!this.interval) {
      return;
    }
    clearInterval(this.interval);
    this.interval = null;
  }

  private handler(usedTime: number) {
    if (usedTime > 0) {
      const path = this.router.routerState.snapshot.url;
      console.log(usedTime);
      console.log(path);
      this.collectData = {path, usedTime};
    }
  }

  /**
   * 统计一段时间这些 t 值超过某个阈值的次数，比如设置的间隔是 100ms，t 值过了 200 的次数和总次数的比。我们定义这个值为页面渲染的 CPU 占比；
   * 如何优化 原则是每段连续执行的 JS 都尽量在 16.7ms 内完成，主要可以按以下方案进行：
   *
   一:减少会引起页面重绘（redraw）的方法的调用

   这些值的列表如下（不完整，如果你不确定可以写个循环测试一下）：

   clientHeight, clientLeft, clientTop, clientWidth, focus(), getBoundingClientRect(), getClientRects(),
   innerText, offsetHeight, offsetLeft, offsetParent, offsetTop, offsetWidth, outerText, scrollByLines(),
   scrollByPages(), scrollHeight, scrollIntoView(), scrollIntoViewIfNeeded(), scrollLeft, scrollTop, scrollWidth

   如果要使用尽量吧这些值缓存起来，不要再循环中直接调用。
   除了缓存还可以直接不去获取，因为这些值可能我们是能够预测的，不要要再让浏览器计算

   二:将某些耗时的操作放到空闲的时候再去做（requestAnimationFrame、setTimeout）

   但是如果你的这个耗时计算耗时太长了你可以考虑是否能将一些不是立即需要的任务分拆掉，平均的分配到各个帧。

   三:涉及到页面的动画元素能用 GPU 最佳

   我们可以给某些元素加上：

   -webkit-transform: translateZ(0);

   强制让浏览器用 GPU 渲染这个层，不过这样做要适量，多了也容易出问题。

   四:釜底抽薪：降级

   你可以通过某种方式检测到浏览器太卡了，那么降级之……

   五:这个监控对页面本身性能的影响
   由于页面被注入了这个一个定时器，可能会对页面造成影响的，虽然这个影响非常低但是还是必须要考虑：

   第一层，强力优化这部分代码的性能：

   在定时器中执行的任务都是纯 JS 运算，我们统计过这个部分的代码的消耗平均不到 0.04ms，占一帧时间的 0.23%。

   第二层，抽样少量的数据进行数据采集，目前采样 1% 的。
   */
}
