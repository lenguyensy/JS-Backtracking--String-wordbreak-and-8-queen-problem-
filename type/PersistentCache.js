/*
cache by page (key pair val)
persistent cache, will use sessionStorage if supported, otherwise will use object literal instead.

it is very useful when you have single page app, json data will be persisted because it's not a full page load.
 */
var PersistentCache = (function () {
	var isCacheSupported = typeof sessionStorage != 'undefined';
	var cache = isCacheSupported ? sessionStorage : {};
	var MAX_STORAGE = 30; //maximum of cache items.


	return function (namespace) {
		var t = this;

		//private method
		function getCacheKey(key) {
			return t.namespace + '.' + key;
		}

		//lru is used here to recycle cache
		function recycle() {
			var newList = [];

			for (var k in cache) {
				if (cache.hasOwnProperty(k))
					try {
						newList.push($.extend(JSON.parse(cache[k]), {
								key : k
							}));
					} catch (ex) {}
			}

			if (newList.length > MAX_STORAGE) {
				//reverse populate
				if (isCacheSupported)
					cache.clear();
				else
					cache = {};

				newList.sort(function (a, b) {
					return a.date - b.date;
				});

				newList.splice(0, newList.length - MAX_STORAGE);

				//clientside version
				for (var i = 0; i < newList.length; i++) {
					var curitem = newList[i];
					cache[curitem.key] = JSON.stringify({
							data : curitem.data,
							time : curitem.time
						});
				}
			}
		}

		//set public varv
		t.namespace = namespace;

		//public method
		t.setCache = function (key, val) {
			var completeKey = getCacheKey(key);

			//recycle
			recycle();

			//store data into cache
			cache[completeKey] = JSON.stringify({
					time : new Date(),
					data : val
				});
		};

		t.getCache = function (key) {
			var ret = null;
			var completeKey = getCacheKey(key);

			if (cache[completeKey] !== null) {
				//data is from cache
				ret = JSON.parse(cache[completeKey]).data;

				//update timestamp
				cache[completeKey] = JSON.stringify({
						time : new Date(),
						data : ret
					});
			}

			return ret;
		};
	};
})();

//how to use it
var contactsCache = new PersistentCache('contact.org');
contactsCache.setCache('610-11-2222', {
	name : 'Sy Le'
}); //key is ssn and value is the contact info
console.log(contactsCache.getCache('610-11-2222'));
