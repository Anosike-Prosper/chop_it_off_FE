require('dotenv').config()
type RequestOptions = {
	method: string
	body?: {}
	headers?: {}
}

function getToken(){
	return localStorage.getItem('token')
}

export async function request(url: string, { method, body }: { method: string, body?: {} }) {
	const options: RequestOptions = { 
		method, 
		headers: {
			 "content-type": "application/json",
			 authorization:`Bearer ${getToken() ?? ""}`
			}
		}

	if (method.toLowerCase() != "get")
		options.body = body;

	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, options as RequestInit);
	const data = await response.json();

	console.log(response.status)
	if(!(response.status > 199 && response.status < 300)) 
		throw new Error(data.message);
	return data;
}

