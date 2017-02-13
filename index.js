import createMixin from './src/mixin';

const defaultMixin = createMixin('inner');
defaultMixin.create = createMixin;

export default defaultMixin;
