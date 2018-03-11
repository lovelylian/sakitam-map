/**
 * from https://github.com/iliakan/detect-node
 * @type {boolean}
 */
const IS_NODE = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]' && !process.versions['electron'] && !process.versions['nw'] && !process.versions['node-webkit'];

/* eslint no-useless-escape: "off" */
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
const byteToHex = [];
const rnds = new Array(16);
for (let i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

const trim = function (string) {
  return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '')
}

const camelCase = function (name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}

/**
 * stamp string
 * @param obj
 * @returns {*}
 */
const stamp = function (obj) {
  let key = '_event_id_'
  obj[key] = obj[key] || (uuid())
  return obj[key]
}

/**
 * check is null
 * @param obj
 * @returns {boolean}
 */
const isNaN = (obj) => {
  return obj == null;
}

/**
 * check is number
 * @param val
 * @returns {boolean}
 */
const isNumber = (val) => {
  return (typeof val === 'number') && !isNaN(val);
}

/**
 * 判断是否为对象
 * @param value
 * @returns {boolean}
 */
const isObject = value => {
  const type = typeof value
  return value !== null && (type === 'object' || type === 'function')
}

/**
 * 判断是否为合法字符串
 * @param value
 * @returns {boolean}
 */
const isString = (value) => {
  if (value == null) {
    return false;
  }
  return typeof value === 'string' || (value.constructor !== null && value.constructor === String);
}

/**
 * form uuid
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 * @param buf
 * @param offset
 * @returns {string}
 */
const bytesToUuid = (buf, offset) => {
  let i = offset || 0;
  const bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] + '-' +
    bth[buf[i++]] + bth[buf[i++]] +
    bth[buf[i++]] + bth[buf[i++]] +
    bth[buf[i++]] + bth[buf[i++]];
}

/**
 * math rng
 * @returns {any[]}
 */
const mathRNG = () => {
  for (let i = 0, r; i < 16; i++) {
    if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
    rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
  }
  return rnds;
};

/**
 * get uuid
 * @param options
 * @param buf
 * @param offset
 * @returns {*|string}
 */
const uuid = (options, buf, offset) => {
  /* eslint-disable */
  const i = buf && offset || 0;
  if (typeof (options) === 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};
  const rnds = options.random || (options.rng || mathRNG)();
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;
  // Copy bytes to buffer, if provided
  if (buf) {
    for (let ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }
  return buf || bytesToUuid(rnds);
};

/**
 * merge
 * @param target
 * @returns {*}
 */
const merge = (target) => {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }
  return target
};

/**
 * check isEmpty object
 * @param object
 * @returns {boolean}
 */
const isEmpty = (object) => {
  let property;
  for (property in object) {
    return false;
  }
  return !property;
};

export {
  IS_NODE,
  stamp,
  uuid,
  merge,
  trim,
  isNaN,
  isEmpty,
  isString,
  isObject,
  isNumber,
  camelCase
}
