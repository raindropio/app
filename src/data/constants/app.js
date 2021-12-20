export const
	APP_DOMAIN 			= 'raindrop.io'

export const
	APP_BASE_URL 		= `https://${APP_DOMAIN}`,
	WORKERS_BASE_URL	= 'https://rdl.ink',
	LEGACY_WORKERS_BASE_URL=`https://stella.${APP_DOMAIN}`

export const
	API_ENDPOINT_URL 	= `${process.env.NODE_ENV == 'production' || RAINDROP_ENVIRONMENT == 'react-native' ? 'https://api.raindrop.io' : 'http://localhost:3000' }/v1/`,
	API_RETRIES 		= 3,
	API_TIMEOUT 		= 30000,
	FAVICON_URL 		= `${WORKERS_BASE_URL}/favicon`,
	RENDER_URL 			= `${WORKERS_BASE_URL}/render`