const leet = require('leet');

module.exports = function (config, auth) {
	return {
		commands: [
			'leet',
			'yodify'
		],
		leet: {
			usage: '<message>',
			description: 'converts boring regular text to 1337',
			process: (msg, suffix, isEdit, cb) => {
				cb(leet.convert(suffix), msg);
			}
		},
		yodify: {
			usage: '<statement>',
			description: 'Translate to Yoda speak',
			process: (msg, suffix, isEdit, cb) => {
				if (!suffix) {
					return cb('Your statement, I must have.', msg);
				}
		
				require('soap').createClient('http://www.yodaspeak.co.uk/webservice/yodatalk.php?wsdl',
					function (err, client) {
						if (err) {
							return cb('Lost, I am. Not found, the web service is. Hrmm...', msg);
						}
		
						client.yodaTalk({ inputText: suffix }, function (err, result) {
							if (err) {
								return cb('Confused, I am. Disturbance in the force, there is. Hrmm...', msg);
							}
							return cb(result.return, msg);
						});
					}
				);
			}
		}
	};
};
