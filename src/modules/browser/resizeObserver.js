const ResizeObserver = 'ResizeObserver' in window === false ? 
    require('@juggle/resize-observer').ResizeObserver : 
    window.ResizeObserver

export { ResizeObserver }