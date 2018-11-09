const aws       = require('aws-sdk'),
	querystring = require('querystring'),

	ses         = new aws.SES(),
	corsDomain  = process.env.CORS_DOMAIN,
	emailFrom   = process.env.EMAIL_FROM,
	emailTo     = process.env.EMAIL_TO.split(','),
	form        = require('./form.json');

function response(statusCode, payload, redirect = false) {
	let headers = {
		'Access-Control-Allow-Origin': corsDomain,
		'Access-Control-Allow-Headers': 'x-requested-with',
		'Access-Control-Allow-Credentials': true,
	};

	let body = JSON.stringify(payload);

	if (!!redirect) {
		headers['Location'] = process.env.CORS_DOMAIN;
		headers['Content-Type'] = 'text/html';
		statusCode = 302;
		body = '';
	}

	return {
		statusCode: statusCode,
		headers: headers,
		body: body,
	}
}

function parseForm(body) {
	let data = {};

	form.fields.forEach((field) => {
		if (typeof body[field.name] == 'undefined') {
			if (!field.required)
				return;

			throw new Error(`Field ${field.name} is required and missing.`);
		}

		if (field.type == 'select' && !field.options.includes( body[field.name] )) {
			throw new Error(`Invalid value for ${field.name}.`);
		}

		if (field.type == 'submit')
			return;

		data[ field.name ] = {
			label: field.label,
			value: body[ field.name ]
		};
	});

	return data;
}

function generateEmailParams(body) {
	let data = parseForm(body),
		text = '';

	for (var key in data) {
		text+= `${data[key].label}:\n${data[key].value}\n\n`
	}

	return {
		Source: emailFrom,
		Destination: {
			ToAddresses: emailTo
		},
		ReplyToAddresses: [
			data.email.value
		],
		Message: {
			Body: {
				Text: {
					Charset: 'UTF-8',
					Data: text
				}
			},
			Subject: {
				Charset: 'UTF-8',
				Data: '[cetetine] Semnalare problemă'
			}
		}
	};
}

exports.handler = async (event) => {
	try {
		let body = querystring.parse(event.body);

		const emailParams = generateEmailParams(body)
		const data = await ses.sendEmail(emailParams).promise()

		return response(200, data, !!body['_redirect']);
	} catch (err) {
		return response(500, err.message);
	}
}
