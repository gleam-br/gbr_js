'use strict';

export const toArray = function (collection) {
  return Array.prototype.slice.call(collection);
};

export const cloneArray = toArray;

// fn.op = {
//   '+': function (value1, value2) {
//     return value1 + value2;
//   },
//   '-': function (value1, value2) {
//     return value1 - value2;
//   },
//   '*': function (value1, value2) {
//     return value1 * value2;
//   },
//   '/': function (value1, value2) {
//     return value1 / value2;
//   },
//   '==': function (value1, value2) {
//     /*eslint-disable eqeqeq */
//     return value1 == value2;
//     /*eslint-enable eqeqeq */
//   },
//   '===': function (value1, value2) {
//     return value1 === value2;
//   }
// };

export const type = function (value) {
  // If the value is null or undefined, return the stringified name,
  // otherwise get the [[Class]] and compare to the relevant part of the value
  return value == null ?
    '' + value :
    Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};

export const is = function (type, value) {
  return type === fn.type(value);
};

export const apply = function (handler, args) {
  return handler.apply(null, args);
};

export const concat = function () {
  var args = fn.toArray(arguments);
  var first = args[0];

  if (!fn.is('array', first) && !fn.is('string', first)) {
    first = args.length ? [first] : [];
  }

  return first.concat.apply(first, args.slice(1));
};

export const partial = function () {
  var args = fn.toArray(arguments);
  var handler = args[0];
  var partialArgs = args.slice(1);

  return function () {
    return fn.apply(handler, fn.concat(partialArgs, fn.toArray(arguments)));
  };
};

export const identity = function (arg) {
  return arg;
};

const currier = function makeCurry(rightward) {
  return function (handler, arity) {
    if (handler.curried) {
      return handler;
    }

    arity = arity || handler.length;

    var curry = function curry() {
      var args = fn.toArray(arguments);

      if (args.length >= arity) {
        var transform = rightward ? 'reverse' : 'identity';
        return fn.apply(handler, fn[transform](args));
      }

      var inner = function () {
        return fn.apply(curry, args.concat(fn.toArray(arguments)));
      };

      inner.curried = true;

      return inner;
    };

    curry.curried = true;

    return curry;
  };
};

export const curry = currier(false);

export const curryRight = currier(true);

export const properties = function (object) {
  var accumulator = [];

  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      accumulator.push(property);
    }
  }

  return accumulator;
};

export const each = function (handler, collection, params) {
  for (var index = 0, collectionLength = collection.length; index < collectionLength; index++) {
    fn.apply(handler, fn.concat([collection[index], index, collection], params));
  }
};

export const reduce = function (handler, accumulator, collection, params) {
  fn.each(function (value, index) {
    accumulator = fn.apply(handler, fn.concat([accumulator, value, index], params));
  }, collection);

  return accumulator;
};

export const filter = function (expression, collection) {
  return fn.reduce(function (accumulator, item, index) {
    expression(item, index) && accumulator.push(item);
    return accumulator;
  }, [], collection);
};

// fn.op['++'] = fn.partial(fn.op['+'], 1);
// fn.op['--'] = fn.partial(fn.op['+'], -1);

export const map = function (handler, collection, params) {
  return fn.reduce(function (accumulator, value, index) {
    accumulator.push(fn.apply(handler, fn.concat([value, index, collection], params)));
    return accumulator;
  }, [], collection);
};

export const reverse = function (collection) {
  return fn.cloneArray(collection).reverse();
};

export const pipeline = function () {
  var functions = fn.toArray(arguments);

  return function () {
    return fn.reduce(function (args, func) {
      return [fn.apply(func, args)];
    }, fn.toArray(arguments), functions)[0];
  };
};

export const compose = function () {
  return fn.apply(fn.pipeline, fn.reverse(arguments));
};

export const prop = fn.curry(function (name, object) {
  return object[name];
});

export const merge = function () {
  return fn.reduce(function (accumulator, value) {
    fn.each(function (property) {
      accumulator[property] = value[property];
    }, fn.properties(value));

    return accumulator;
  }, {}, fn.toArray(arguments));
};

export const memoize = function memoize(handler, serializer) {
  var cache = {};

  return function () {
    var args = fn.toArray(arguments);
    var key = serializer ? serializer(args) : memoize.serialize(args);

    return key in cache ?
      cache[key] :
      cache[key] = fn.apply(handler, args);
  };
};

export const memoize_serialize = function (values) {
  return fn.type(values[0]) + '|' + JSON.stringify(values[0]);
};

export const flip = function (handler) {
  return function () {
    return fn.apply(handler, fn.reverse(arguments));
  };
};

export const delay = function (handler, msDelay) {
  return setTimeout(handler, msDelay);
};

export const delayFor = fn.flip(fn.delay);

export const delayed = function (handler, msDelay) {
  return function () {
    return fn.delay(fn.partial(handler, fn.toArray(arguments)), msDelay);
  };
};

export const delayedFor = fn.flip(fn.delayed);

export const async = fn.compose(fn.partial(fn.delayedFor, 0));

export const throttle = function (handler, msDelay) {
  var throttling;

  return function () {
    var args = fn.toArray(arguments);

    if (throttling) {
      return;
    }

    throttling = fn.delay(function () {
      throttling = false;

      fn.apply(handler, args);
    }, msDelay);
  };
};

export const debounce = function (handler, msDelay) {
  var debouncing;

  return function () {
    var args = fn.toArray(arguments);

    if (debouncing) {
      clearTimeout(debouncing);
    }

    debouncing = fn.delay(function () {
      debouncing = false;

      fn.apply(handler, args);
    }, msDelay);
  };
};

export const contains = function (haystack, needle) {
  return haystack.indexOf(needle) !== -1;
};
