const style = (el, prop) => {
    return typeof getComputedStyle !== 'undefined' ? getComputedStyle(el, null).getPropertyValue(prop) : el.style[prop];
  };
const overflow = (el) => {
    return style(el, 'overflow') + style(el, 'overflow-y') + style(el, 'overflow-x')
  }
export const scrollParent = (el) => {
  //   if (!inBrowser) return
    if (!(el instanceof HTMLElement)) {
      return window}
    let parent = el
    while (parent) {
      if (parent === document.body || parent === document.documentElement) {
        break}
      if (!parent.parentNode) {
        break}
      if (/(scroll)/.test(overflow(parent))) {
          // console.log('hie')
        return parent}
      parent = parent.parentNode}
    return window}

export function debounce2(fn, miliseconds = 50, context) {
        let timer = null;
        return function (...args) {
          const self = context || this;
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            fn.apply(self, args);
            timer = null;
          }, miliseconds);
        };
      }

export  function debounce(fn,time=50,ctx){
          let timer = null
          let self = ctx || this;
          return function(...args){
              if (timer!=null){
                  clearTimeout(timer)
              }
              timer = setTimeout(()=>{
                  fn.apply(self,args)
                  timer = null
              },time)

          }
     }
export class Listener{
        constructor(options){
            this.$el = options.el;
            this.load = false;
            this.src=options.src;
            this.parent = options.parent;
        }
        getsize(father){
        const rect = this.$el.getBoundingClientRect();
          const rect2 = father.getBoundingClientRect();
            return (
                rect.bottom<rect2.bottom &&
                 rect.top>rect2.top
            );
        }
        update(){
                this.$el.src = this.src;
                this.load = true
            }
    }
