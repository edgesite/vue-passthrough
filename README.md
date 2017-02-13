vue-passthrough
=================
vue-passthrough passthrough the event listener from parent to child component,
so its made a convenient way to create wrapper component.

# Example
## Mixin
```
import PassthroughMixin from 'vue-passthrough';

Vue.component('awesome-form', {
  template: `<awesome-input @keypress.enter="onEnterPress" @change="onChange" />`,
  methods: {
    // hit enter and you'll got "enter pressed" on console
    onEnterPress(e) {
      console.log('awesome-form: enter pressed', e);
    },
    // onChange won't executed cuz we've handled it in awesome-input internal
    onChange(e) {
      console.log("awesome-form: onChange", e);
    },
  },
});

Vue.component('awesome-input', {
  template: `<input ref="inner" @change="onChange" />`,
  mixins: [PassthroughMixin],
  methods: {
    // you'll got "awesome-input: onChange" on console
    onChange(e) {
      console.log("awesome-input: onChange", e);
    },
  },
});
```
## Decorator
```
import Passthrough from 'vue-passthrough/decorator';

@Passthrough
@Component
export default class {
  ...
}
```
or
```
export default Passthrough({
  ...
})

```

# Custom inner reference
```
import PassthroughMixin from 'vue-passthrough';

export default {
   mixins: [PassthroughMixin.create('custom-inner')],
   ...
}

@Passthrough('custom-inner')
@Component
export default class {
  ...
}
```
