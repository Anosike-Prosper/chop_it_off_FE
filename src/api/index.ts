import { request } from "@/utils/utils";

export async function signup(body: any) {
	return await request('/auth/signup', { method: 'post', body: JSON.stringify(body) })
}

export async function login(body: any) {
	return await request('/auth/login', { method: 'post', body: JSON.stringify(body) })
}

export async function geturl(body: any) {
	return await request('/url/', { method: 'post', body: JSON.stringify(body) })
}

export async function geturls() {
	return await request('/url/', { method: 'get' })
}

export async function createqr(body: any) {
	return await request('/url/qrcode', { method: 'post', body: JSON.stringify(body)  })
}


export async function getUrlInfo(id: string) {
	return await request(`/url/info/${id}`, { method: 'get' })
}