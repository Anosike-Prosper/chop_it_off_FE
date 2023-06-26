
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

	const response = await fetch(`http://localhost:4000${url}`, options as RequestInit);
	const data = await response.json();

	console.log(response.status)
	if(!(response.status > 199 && response.status < 300)) 
		throw new Error(data.message);
	return data;
}

