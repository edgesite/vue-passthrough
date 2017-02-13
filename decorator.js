import createMixin from './src/mixin';
import defaultMixin from './';

export default function Passthrough(refNameOrTarget) {
  let mixin;
  function decorator(target) {
    if (!target.mixins) target.mixins = [];
    target.mixins.push(mixin);
    return target;
  }
  if (typeof refNameOrTarget === 'string') {
    mixin = createMixin(refNameOrTarget);
    return decorator;
  } else {
    mixin = defaultMixin;
    return decorator(refNameOrTarget);
  }
}
