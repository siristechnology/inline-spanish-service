exports.handler = async request => {
	console.log('Printing request', request)

	return { statusCode: 200, body: 'dummy function called' }
}
