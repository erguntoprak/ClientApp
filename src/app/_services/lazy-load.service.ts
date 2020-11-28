import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class LazyLoadService {

  constructor(@Inject(DOCUMENT) private readonly document: Document) { }

  loadScripts(dynamicScripts: string[]) {
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      this.document.body.appendChild(node);
    }
  }
  loadCss(dynamicCss: string[]) {
    for (let i = 0; i < dynamicCss.length; i++) {
      const node = document.createElement('link');
      node.type = 'text/css';
      node.href = dynamicCss[i];
      node.rel = 'stylesheet';
      this.document.head.appendChild(node);
    }
  }

}
