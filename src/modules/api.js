import config from './config';
import 'whatwg-fetch'
import XMLHttpRequestPromise from 'xhr-promise';
import environment from '~modules/environment'

function isQuotaExceeded(e) {
  var quotaExceeded = false;
  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22:
          quotaExceeded = true;
          break;
        case 1014:
          // Firefox
          if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true;
          }
          break;
      }
    } else if (e.number === -2147024882) {
      // Internet Explorer 8
      quotaExceeded = true;
    }
  }
  return quotaExceeded;
}

export default {
    timeout: 300000,
    defaultHeaders: {

    },

    makeFinalURL: function(url) {
        if (url.indexOf('http')==0)
            return url;
        else
            return config.apiPrefix + url;
    },

    errorHappen: function(url) {
        if (typeof Toasts != "undefined")
            Toasts.show({title: t.s("server"), text: url, status: "error"});
    },

    checkStatus: function(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    },

    httpClient(url, options) {
        var isEdge = (window.navigator.userAgent.indexOf('Edge/')>0);

        if (!isEdge)
            return fetch(url,options);

        var xhrPromise = new XMLHttpRequestPromise();
        return xhrPromise.send(Object.assign({
                url: url,
                data: options.body||null,
                withCredentials: true
            }, options||{}))
            .then(function(res){
                res.text = function() {
                    if (typeof res.responseText != "undefined")
                        return res.responseText;
                    return "";
                }

                res.json = function() {
                    if (typeof res.responseText != "undefined")
                        return res.responseText;
                    return {};
                }

                return res;
            })
    },

    getText: function(url, callback) {
        this.timeoutPromise(this.httpClient(this.makeFinalURL(url), {
                headers: this.defaultHeaders,
                credentials: 'include'
            }))
            .then(this.checkStatus)
            .then((response)=>{
                return response.text()
            })
            .then((text)=>{
                callback(text);
            })
            .catch((e)=>{
                this.errorHappen(url);
                callback("");
                return;
            })
    },

    "get": function(url,callback,conf) {
        conf = conf || {};

        this.timeoutPromise(this.httpClient(this.makeFinalURL(url), Object.assign({
                headers: this.defaultHeaders,
                credentials: 'include',
                cache: 'no-cache'
            },conf)))
            .then(this.checkStatus)
            .then(function(response) {
                return response.json()
            })
            .then((json)=>{
                callback(json);
            })
            .catch((e)=>{
                console.log(e)
                this.errorHappen(url);
                callback({});
            })
    },

    post: function(url,data,callback) {
        this.timeoutPromise(this.httpClient(this.makeFinalURL(url), {
                method: 'POST',
                headers: Object.assign(this.defaultHeaders, {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }),
                credentials: 'include',
                body: JSON.stringify(data)
            }))
            .then(this.checkStatus)
            .then(function(response) {
                return response.json()
            })
            .then((json)=>{
                callback(json);
            })
            .catch((e)=>{
                console.log(e)
                this.errorHappen(url);
                callback({});
            })
    },

    put: function(url,data,callback) {
        this.timeoutPromise(this.httpClient(this.makeFinalURL(url), {
                method: 'PUT',
                headers: Object.assign(this.defaultHeaders, {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }),
                credentials: 'include',
                body: JSON.stringify(data)
            }))
            .then(this.checkStatus)
            .then(function(response) {
                return response.json()
            })
            .then((json)=>{
                callback(json);
            })
            .catch((e)=>{
                console.log(e)
                this.errorHappen(url);
                callback({});
            })
    },

    del: function(url) {
        var body, callback

        if (arguments.length == 2)
            callback = arguments[1]
        else{
            body = JSON.stringify(arguments[1])
            callback = arguments[2]
        }

        this.timeoutPromise(this.httpClient(this.makeFinalURL(url), {
                method: 'DELETE',
                headers: Object.assign(this.defaultHeaders, {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }),
                credentials: 'include',
                body: body
            }))
            .then(this.checkStatus)
            .then(function(response) {
                return response.json()
            })
            .then((json)=>{
                callback(json);
            })
            .catch((e)=>{
                console.log(e)
                this.errorHappen(url);
                callback({});
            })
    },

    upload: function(url, file, onProgress, callback) {
        var data = new FormData()
        data.append(file.name, file.file, file.file.name);

        var xhr = new XMLHttpRequest()
        xhr.open('PUT', this.makeFinalURL(url));
        xhr.withCredentials = true;
        xhr.onload = function() {
            callback(JSON.parse(xhr.responseText));
        }
        xhr.onerror = function(e) {
            console.log(e);
            this.errorHappen(url);
            callback({});
        }
        xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
                var progress = Math.round((event.loaded / event.total) * 100)
                //if ((progress % 20 === 0)||(progress===100))
                    onProgress(progress);
            }
        }
        xhr.send(data);
    },

    uploadPost: function(url, file, onProgress, callback) {
        var data = new FormData()
        data.append(file.name, file.file, file.file.name);

        var xhr = new XMLHttpRequest()
        xhr.open('POST', this.makeFinalURL(url));
        xhr.withCredentials = true;
        xhr.onload = function() {
            callback(JSON.parse(xhr.responseText));
        }
        xhr.onerror = function(e) {
            console.log(e);
            this.errorHappen(url);
            callback({});
        }
        xhr.upload.onprogress = function (event) {
            if (event.lengthComputable) {
                var progress = Math.round((event.loaded / event.total) * 100)
                //if ((progress % 20 === 0)||(progress===100))
                    onProgress(progress);
            }
        }
        xhr.send(data);
    },

    getItem: function(key) {
        var LST;
        try {
            LST = localStorage || window.localStorage;
        } catch(e) {}

        if (LST)
            return LST.getItem(key);
        else
            return null;
    },

    setItem: function(key, value) {
        var LST;
        try {
            LST = localStorage || window.localStorage;
        } catch(e) {}

        if (LST)
            try {
                LST.setItem(key, value);
            } catch(e) {
                if (isQuotaExceeded(e)) {
                    // Storage full, maybe notify user or do some clean-up
                    LST.clear();
                }
            }
        else
            console.log("No localStorage access");
    },

    removeItem: function(key) {
        var LST;
        try {
            LST = localStorage || window.localStorage;
        } catch(e) {}

        if (LST){
            LST.removeItem(key);
        }
        else
            console.log("No localStorage access");
    },

    clear: function() {
        var LST;
        try {
            LST = localStorage || window.localStorage;
        } catch(e) {}

        if (LST){
            LST.clear();
        }
        else
            console.log("No localStorage access");
    },

    timeoutPromise(promise) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
              reject(new Error("promise timeout"))
            }, this.timeout);
            promise.then(
              (res) => {
                clearTimeout(timeoutId);
                resolve(res);
              },
              (err) => {
                clearTimeout(timeoutId);
                reject(err);
              }
            );
        });
    }
}
