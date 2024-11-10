export type ListenReturnFunction = {
  remove: () => void
}
type TargetElement = (v: string, callback: EventListenerOrEventListenerObject) => void;


const EventListener = {
  /**
   * Listen to DOM events during the bubble phase.
   *
   * @param {DOMEventTarget} target DOM element to register listener on.
   * @param {string} eventType Event type, e.g. 'click' or 'mouseover'.
   * @param {function} callback Callback function.
   * @param {object} Object with a 'remove' method.
   */
  listen (target: Element | Window, eventType: string, callback: EventListenerOrEventListenerObject): ListenReturnFunction {
    if ('addEventListener' in target) {
      target.addEventListener(eventType, callback, false)
      return {
        remove () {
          target.removeEventListener(eventType, callback, false)
        }
      }
    } else if ('attachEvent' in target && "detachEvent" in target) {
      (target["attachEvent"] as TargetElement)('on' + eventType, callback)
      return {
        remove () {
          (target["detachEvent"] as TargetElement)('on' + eventType, callback)
        }
      }
    }
    return {
      remove() {
      }
    };
  }
}

export default EventListener
