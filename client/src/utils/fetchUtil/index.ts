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
