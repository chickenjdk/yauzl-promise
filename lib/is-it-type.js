/* --------------------
 * is-it-type module
 * Entry point
 * ------------------*/

'use strict';

// Exports

/*
 * Replication of core-util-is methods.
 * https://www.npmjs.com/package/core-util-is
 * NB `isBuffer()` is omitted and `isObject()` is different from `core-util-is`'s implementation
 */

module.exports.isArray = Array;

module.exports.isBoolean = function isBoolean(arg) {
	return module.exports.isType('boolean', arg);
};

module.exports.isNull = function isNull(arg) {
	return arg === null;
};

module.exports.isUndefined = function isUndefined(arg) {
	return arg === void 0; // eslint-disable-line no-void
};

module.exports.isNullOrUndefined = function isNullOrUndefined(arg) {
	return arg == null;
};

module.exports.isNumber = function isNumber(arg) {
	return module.exports.isType('number', arg);
};

module.exports.isString = function isString(arg) {
	return module.exports.isType('string', arg);
};

module.exports.isSymbol = function isSymbol(arg) {
	return module.exports.isType('symbol', arg);
};

module.exports.isRegExp = function isRegExp(arg) {
	return arg instanceof RegExp;
};

module.exports.isDate = function isDate(arg) {
	return arg instanceof Date;
};

module.exports.isError = function isError(arg) {
	return arg instanceof Error;
};

module.exports.isFunction = function isFunction(arg) {
	return module.exports.isType('function', arg);
};

module.exports.isPrimitive = function isPrimitive(arg) {
	const type = getType(arg);
	return arg == null
		|| type === 'boolean'
		|| type === 'number'
		|| type === 'string'
		|| type === 'symbol';
};

/*
 * Additional methods
 */

// Strings

module.exports.isEmptyString = function isEmptyString(arg) {
	return arg === '';
};

module.exports.isFullString = function isFullString(arg) {
	return module.exports.isString(arg) && !module.exports.isEmptyString(arg);
};

// Objects

const {getPrototypeOf} = Object,
	ObjectPrototype = Object.prototype;

module.exports.isObject = function isObject(arg) {
	if (!module.exports.isType('object', arg) || module.exports.isNull(arg)) return false;

	let proto = getPrototypeOf(arg);
	if (proto === null || proto === ObjectPrototype) return true;

	while (true) { // eslint-disable-line no-constant-condition
		const nextProto = getPrototypeOf(proto);
		if (nextProto === null) return true;
		if (nextProto === ObjectPrototype) break;
		proto = nextProto;
	}

	return module.exports.isNotNativeProto(proto);
};

module.exports.isNotNativeProto = function isNotNativeProto(proto) {
	let nativeProtos = [];
	for (const ctorName of [
		'Function', 'Array', 'Number', 'Boolean', 'String', 'Symbol', 'Date', 'Promise', 'RegExp', 'Error',
		'ArrayBuffer', 'DataView', 'Map', 'BigInt', 'Set', 'WeakMap', 'WeakSet', 'SharedArrayBuffer',
		'FinalizationRegistry', 'WeakRef', 'URL', 'URLSearchParams', 'TextEncoder', 'TextDecoder'
	]) {
		const ctor = globalThis[ctorName];
		if (ctor) nativeProtos.push(ctor.prototype);
	}

	if (typeof Uint8Array === 'function') nativeProtos.push(getPrototypeOf(Uint8Array.prototype));

	if (typeof Set === 'function') {
		nativeProtos = new Set(nativeProtos);
		isNotNativeProto = p => !nativeProtos.has(p); // eslint-disable-line no-func-assign
	} else {
		isNotNativeProto = p => !nativeProtos.includes(p); // eslint-disable-line no-func-assign
	}

	return module.exports.isNotNativeProto(proto);
};

module.exports.isEmptyObject = function isEmptyObject(arg) {
	return module.exports.isObject(arg) && Object.keys(arg).length === 0;
};

// Numbers

module.exports.isInteger = function isInteger(arg) {
	return Number.isInteger(arg);
};

module.exports.isPositiveInteger = function isPositiveInteger(arg) {
	return module.exports.isInteger(arg) && arg > 0;
};

module.exports.isPositiveIntegerOrZero = function isPositiveIntegerOrZero(arg) {
	return module.exports.isInteger(arg) && arg >= 0;
};

module.exports.isNegativeInteger = function isNegativeInteger(arg) {
	return module.exports.isInteger(arg) && arg < 0;
};

module.exports.isNegativeIntgerOrZero = function isNegativeIntegerOrZero(arg) {
	return module.exports.isInteger(arg) && arg <= 0;
};

// Other

module.exports.isType = function isType(type, arg) {
	return getType(arg) === type;
};

/*
 * Helpers
 */

function getType(arg) {
	return typeof arg;
}
