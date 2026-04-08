import freeGlobal from 'lodash-es/_freeGlobal.js';

var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

var root = freeGlobal || freeSelf || globalThis;

export default root;
