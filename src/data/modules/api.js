import { delay, race, call } from 'redux-saga/effects'
import { runSaga } from 'redux-saga'
import { 
	API_ENDPOINT_URL,
	APP_BASE_URL,
	API_RETRIES,
	API_TIMEOUT
} from '../constants/app'
import ApiError from './error'

function* get(url, overrideOptions={}) {
	const res = yield req(url, overrideOptions)

	var json = {}
	if (res.headers){
		const contentType = (res.headers.get('Content-Type')||'').toLowerCase()

		if (contentType.includes('application/json')){
			json = yield res.json()
			checkJSON(json)
		}
		else if (contentType.includes('text/plain'))
			return yield res.text()
	}

	return json;
}

function* put(url, data={}, options={}) {
	const res = yield req(url, {
		...options,
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	const json = yield res.json()
	checkJSON(json)

	return json;
}

function* post(url, data={}, options={}) {
	const res = yield req(url, {
		...options,
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	const json = yield res.json()
	checkJSON(json)

	return json;
}

/*
	url, {
		file: {uri, name, type:'image/jpeg'}
	}
*/
function* upload(url, _body, options={}) {
	const body = new FormData()

	for (const key in _body ) {
		const val = _body[key]
		body.append(key, val)
	}

	const res = yield req(url, {
		...options,
		method: 'PUT',
		body
	})

	const json = yield res.json()
	checkJSON(json)

	return json;
}

function* del(url, data={}, options={}) {
	const res = yield req(url, {
		...options,
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		...(data ? { body: JSON.stringify(data) } : {})
	})
	const json = yield res.json()
	checkJSON(json)

	return json;
}

function* req(url, options={}) {
	var finalURL = API_ENDPOINT_URL + url

	if (url.indexOf('/') == 0)
		finalURL = APP_BASE_URL + url
	else if (url.indexOf('http') == 0)
		finalURL = url

	let errorMessage = 'failed to load'

	for(let i = 0; i < API_RETRIES; i++){
		try{
			const winner = yield race({
				req: call(fetchWrap, finalURL, {...defaultOptions, ...options}),
				...( options.timeout !== 0 ? { t: delay(API_TIMEOUT) } : {}) //timeout could be turned off if options.timeout=0
			})

			if (!winner.req)
				throw new ApiError({ status: 408 })

			return winner.req;
		}catch(e){
			errorMessage = e.message || ''

			//stop if client error
			if (e && e.status && e.status >= 400 && e.status < 500)
				break;
			//retry
			else if(i < API_RETRIES-1) {
				yield delay(100 + (API_RETRIES * 100) ); //stop 100ms and try again
			}
		}
	}

	throw new ApiError({ errorMessage: `${errorMessage} ${finalURL}` })
}

const fetchWrap = (url, options)=>(
	fetch(url, options)
		.then((res)=>{
			if (res.status >= 200 && res.status < 300)
				return res
			else
				throw new ApiError({ status: res.status, errorMessage: 'fail_fetch_status' })
		})
)

const checkJSON = (json)=>{
	if (typeof json.auth === 'boolean')
		if (json.auth === false)
			throw new ApiError({ status: 401 })

	if (!json.result)
		if (json.error || json.errorMessage || json.status >= 300)
			throw new ApiError(json)
}

const defaultOptions = {
	credentials: 'include'
}

const convertGeneratorToPromise = (gen)=>function(){
	const a=arguments; 
	return runSaga({onError:()=>{}}, function*(){
		return yield gen(...a)
	}).toPromise()
}

export default {
	get,
	put,
	post,
	del,
	upload,

	_get: convertGeneratorToPromise(get),
	_put: convertGeneratorToPromise(put),
	_post: convertGeneratorToPromise(post),
	_del: convertGeneratorToPromise(del),
	_upload: convertGeneratorToPromise(upload)
}