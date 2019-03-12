export function throttle<F extends (...args: any[]) => any>(func: F, 
	wait: number, 
	options: { leading?: boolean, trailing?: boolean } = {}) {
		
	var context: any, args: any, result: any;
	var timeout: any = null;
	var previous = 0;
	options || (options = {});

	var later = function () {
		previous = options.leading === false ? 0 : Date.now();
		timeout = null;
		result = func.apply(context, args);
		context = args = null;
	};

	return function (this: any) {
		var now = Date.now();
		if (!previous && options.leading === false) previous = now;

		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0) {
			clearTimeout(timeout);
			timeout = null;
			previous = now;
			result = func.apply(context, args);
			context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};
};
