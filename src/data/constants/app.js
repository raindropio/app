export const
	APP_DOMAIN 			= 'raindrop.io'

export const
	APP_BASE_URL 		= `https://${APP_DOMAIN}`,
	STELLA_BASE_URL		= `https://stella.${APP_DOMAIN}`

export const
	API_ENDPOINT_URL 	= `${process.env.NODE_ENV == 'production' ? 'https://api.raindrop.io' : 'http://localhost:3000' }/v1/`,
	API_RETRIES 		= 3,
	API_TIMEOUT 		= 30000,
	THUMB_URL 			= `${STELLA_BASE_URL}/imager/thumb.jpg?url=`,
	SCREENSHOT_URL		= `${STELLA_BASE_URL}/imager/screenshot.jpg?url=`