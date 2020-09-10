export function scrollbarIsObtrusive() {
    var parent = document.createElement('div');
    parent.style.cssText = `
      width:30px;height:30px;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-style: -ms-autohiding-scrollbar;
    `
  
    var child = document.createElement('div');
    child.setAttribute('style', 'width:100%;height:40px');
    parent.appendChild(child);
    document.body.appendChild(parent);
  
    // Measure the child element, if it is not
    // 30px wide the scrollbars are obtrusive.
    var scrollbarWidth = 30 - parent.firstChild.clientWidth;
  
    document.body.removeChild(parent);
  
    return scrollbarWidth ? true : false
}