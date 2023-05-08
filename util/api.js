
import {request} from './request.js'

export const postPayload=(url,data)=>{
	return request({
		method:'post',
		url:url,
		data:data
	})
}
export const postFormdata=(url,data)=>{
	return request({
		method:'post',
		url:url,
		data:data,
		header:{
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		}
	})
}
export const putFormdata=(url,data)=>{
	return request({
		method:'PUT',
		url:url,
		data:data,
		header:{
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		}
	})
}
export const deleteFormdata=(url,data)=>{
	return request({
		method:'DELETE',
		url:url,
		data:data,
		header:{
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		}
	})
}
export const getString=(url,data)=>{
	return request({
		method: 'GET',
		url:url,
		data: data,
		header:{
			'X-Requested-With': 'XMLHttpRequest',
			"Accept": "application/json",
			"Content-Type": "application/json; charset=UTF-8"
		}
	})
}
