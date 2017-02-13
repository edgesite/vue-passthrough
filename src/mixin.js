function getVnodeByRef(vnode, refName) {
  const { data, children } = vnode;
  if (data && data.ref == refName) {
    return vnode;
  }
  if (!children) {
    return null;
  }
  for (let i = 0; i < children.length; i++) {
    const node = getVnodeByRef(children[i], refName);
    if (node) {
      return node;
    }
  }
  return null;
}

export default function createMixin(innerRefName) {
  return {
    mounted() {
      const inner = getVnodeByRef(this._vnode, innerRefName);
      if (!inner) {
        throw new Error(`ref "${innerRefName}" not found`);
      }
      let listeners = this.$options._parentListeners;
      if (!listeners) {
        return;
      }
      const interceptedEvents = inner.data.on || {};
      Object.keys(listeners)
        .filter(eventName => !interceptedEvents[eventName])
        .forEach(eventName =>
          inner.elm.addEventListener(eventName, listeners[eventName].invoker));
    },
  };
}
