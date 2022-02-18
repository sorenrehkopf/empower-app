import consts from '../../consts';

const { DevApiBaseUrl } = consts;

export type fetchUtilArgs = {
	endpoint: string,
	method?: string,
	body?: {}
};

export type fetchResponse = {
	data?: any,
	error?: any,
	ok: boolean,
};

export const getBaseUrl = (): string | undefined => ({
	localhost: DevApiBaseUrl
})[window.location.hostname];

/* This is a simple utility to provide some config, serialization, and error handling when fething data.
 * In the future this would be a convenient place to handle the client side of token authentication.
 *
 * endpoint - string - The endpoint for the request.
 * method - string - default 'GET' - The method for the request.
 * body - json - The body to include for post and put requests.
 */
export const fetchRequest = ({ endpoint, method = 'GET', body }: fetchUtilArgs): Promise<fetchResponse> => {
	const request: Request = new Request(`${getBaseUrl()}${endpoint}`)
	const init: RequestInit = {
		method,
		headers: {
			Accept: 'application/json'
		}
	};

	try{
		if (body) {
			init.body = JSON.stringify(body);
		}

		return fetch(request, init)
			.then(async response => ({
				data: await response.json(),
				ok: response.ok
			}))
			.catch(e => ({
				ok: false,
				error: e
			}));
	} catch (e) {
		return Promise.resolve({
			error: e,
			ok: false
		});
	}
};
