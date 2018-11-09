function form() {
	this.instance = document.querySelector('form');
	this.messages = {
		success: 'Îți mulțumim pentru mesaj. Acesta a ajuns la destinație, iar echipa noastră de cercetare se pune pe treabă cât de curând. Te vom ține la curent cu vești despre acest program.',
		error: 'A apărut o eroare la trimiterea mesajului. Te rugăm să încerci din nou mai târziu.'
	}

	if (this.instance === null)
		return;

	if (Modernizr.formvalidation)
		this.instance.setAttribute('novalidate', '');

	var _this = this;

	this.instance.addEventListener('submit', function(e) {
		var fields = e.target.querySelectorAll('input, select, textarea'),
			valid = true,
			data = {};

		e.preventDefault();

		fields.forEach(function(field) {
			if (field.name == 'submit' || field.name == '_redirect')
				return;

			if (!_this.validate(field))
				valid = false;
		});

		if (!valid)
			return;

		_this.toggleSubmit(true);

		fields.forEach(function(field) {
			if (field.name == 'submit' || field.name == '_redirect')
				return;

			data[ field.name ] = field.value;
		});

		_this.send({
			url: _this.instance.action,
			method: _this.instance.method,
		}, data);
	});
}


form.prototype.toggleSubmit = function(disabled) {
	this.instance.submit.disabled = !!disabled;
}


form.prototype.showMessage = function(type) {
	var message = document.createElement('div'),
		target = document.getElementById('messages'),
		ntype;

	if (type == 'success') {
		ntype = 'is-success';
	} else if (type == 'error') {
		ntype = 'is-danger';
	} else {
		return;
	}

	message.classList.add('notification', ntype);
	message.innerText = this.messages[type];

	target.innerHTML = '';
	target.appendChild(message);
}


form.prototype.validate = function(input) {
	if (input.type == 'hidden')
		return true;

	var el = (input.type == 'select-one' ? input.parentNode : input);

	if (input.checkValidity()) {
		el.classList.remove('is-danger');
		el.nextElementSibling.classList.remove('is-danger');
		el.nextElementSibling.textContent = '';

		return true;
	}

	el.classList.add('is-danger');
	el.nextElementSibling.classList.add('is-danger');
	el.nextElementSibling.textContent = input.validationMessage;

	return false;
}


form.prototype.send = function(opts, data) {
	var request = new XMLHttpRequest(),
		urlEncodedDataPairs = [],
		urlEncodedData = '',
		_this = this;

	// Turn the data object into an array of URL-encoded key/value pairs.
	for (var name in data) {
		urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
	}

	// Combine the pairs into a single string and replace all %-encoded spaces to
	// the '+' character; matches the behaviour of browser form submissions.
	urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

	// Define what happens on successful data submission
	request.onload = function(event) {
		if (request.readyState === request.DONE) {
			console.log(request);
			if (request.status === 200) {
				_this.showMessage('success');
				console.log('Yeah! Data sent and response loaded.', event);
			} else {
				_this.showMessage('error');
				_this.toggleSubmit(false);
				console.log('Oops! Something goes wrong.', event);
			}
		}
	}

	// Define what happens in case of error
	request.onerror = function(event) {
		_this.showMessage('error');
		_this.toggleSubmit(false);
		console.log('Oops! Something goes wrong.', event);
	}

	// Set up our request
	request.open(opts.method, opts.url);

	// Add the required HTTP header for form data POST requests
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

	// Finally, send our data.
	request.send(urlEncodedData);
}


window.onload = (new form());
