

// global functions
function request(url, data, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	var loader = document.createElement('div');
	loader.className = 'loader';
	document.body.appendChild(loader);
	xhr.addEventListener('readystatechange', function () {
		if (xhr.readyState === 4) {
			if (callback) {
				callback(xhr.response);
			}
			loader.remove();
		}
	});

	var formdata = data ? (data instanceof FormData ? data : new FormData(document.querySelector(data))) : new FormData();

	var csrfMetaTag = document.querySelector('meta[name="csrf_token"]');
	if (csrfMetaTag) {
		formdata.append('csrf_token', csrfMetaTag.getAttribute('content'));
	}

	xhr.send(formdata);
}


// index.php
function logout() {
	request('php/logout.php', false, function (data) {
		if (data === '0') {
			window.location = 'login';
		}
	});
}
function deleteAccount() {
	if (confirm("Wollen sie wirklich diesen Account löschen?")) {
		request('../php/deleteAccount.php', '#editForm', function (data) {
			document.getElementById('errs').innerHTML = "";
			var transition = document.getElementById('errs').style.transition;
			document.getElementById('errs').style.transition = "none";
			document.getElementById('errs').style.opacity = 0;
			switch (data) {
				case '0':
					window.location = 'user.php';
					break;
				case '1':
					document.getElementById('errs').innerHTML += '<div class="err">Failed to delete account. Please try again later.</div>';
					break;
				case '2':
					document.getElementById('errs').innerHTML += '<div class="err">Failed to connect to database. Please try again later.</div>';
					break;
				case '3':
					document.getElementById('errs').innerHTML += '<div class="err">You are not logged in.</div>';
					break;
				case '4':
					document.getElementById('errs').innerHTML += '<div class="err">Invalid CSRF Token... Nice try</div>';
					break;
				case '5':
					document.getElementById('errs').innerHTML += '<div class="err">Posts not set. Please try again later.</div>';
					break;
				case '6':
					document.getElementById('errs').innerHTML += '<div class="err">You can\'t delete your own account.</div>';
					break;
				default:
					document.getElementById('errs').innerHTML += '<div class="err">An unknown error occurred. Please try again later.</div>';
			}
			setTimeout(function () {
				document.getElementById('errs').style.transition = transition;
				document.getElementById('errs').style.opacity = 1;
			}, 10);
		});
	}
}

function approve(approveID, eMail, name) {
	var data = new FormData();
	data.append('approveID', approveID);
	data.append('eMail', eMail);
	data.append('name', name);
	request('../php/approve.php', data, function (data) {
		document.getElementById('errs').innerHTML = "";
		var transition = document.getElementById('errs').style.transition;
		document.getElementById('errs').style.transition = "none";
		document.getElementById('errs').style.opacity = 0;
		switch (data) {
			case '0':
				window.location = 'approvals.php';
				break;
			case '1':
				document.getElementById('errs').innerHTML += '<div class="err">Failed to update account. Please try again later.</div>';
				break;
			case '2':
				document.getElementById('errs').innerHTML += '<div class="err">Failed to connect to database. Please try again later.</div>';
				break;
			case '3':
				document.getElementById('errs').innerHTML += '<div class="err">You are not logged in.</div>';
				break;
			case '4':
				document.getElementById('errs').innerHTML += '<div class="err">Invalid CSRF Token... Nice try</div>';
				break;
			case '5':
				document.getElementById('errs').innerHTML += '<div class="err">Failed to send Email</div>';
				break;
			case '6':
				document.getElementById('errs').innerHTML += '<div class="err">Posts not set. Please try again later.</div>';
				break;
			default:
				document.getElementById('errs').innerHTML += '<div class="err">An unknown error occurred. Please try again later.</div>';
		}
		setTimeout(function () {
			document.getElementById('errs').style.transition = transition;
			document.getElementById('errs').style.opacity = 1;
		}, 10);
	});
}

function reject(rejectID, eMail, name) {
	var data = new FormData();
	data.append('rejectID', rejectID);
	data.append('eMail', eMail);
	data.append('name', name);
	request('../php/reject.php', data, function (data) {
		document.getElementById('errs').innerHTML = "";
		var transition = document.getElementById('errs').style.transition;
		document.getElementById('errs').style.transition = "none";
		document.getElementById('errs').style.opacity = 0;
		switch (data) {
			case '0':
				window.location = 'admin.php';
				break;
			case '1':
				document.getElementById('errs').innerHTML += '<div class="err">Failed to update account. Please try again later.</div>';
				break;
			case '2':
				document.getElementById('errs').innerHTML += '<div class="err">Failed to connect to database. Please try again later.</div>';
				break;
			case '3':
				document.getElementById('errs').innerHTML += '<div class="err">You are not logged in.</div>';
				break;
			case '4':
				document.getElementById('errs').innerHTML += '<div class="err">Invalid CSRF Token... Nice try</div>';
				break;
			case '5':
				document.getElementById('errs').innerHTML += '<div class="err">Failed to send Email</div>';
				break;
			case '6':
				document.getElementById('errs').innerHTML += '<div class="err">Posts not set. Please try again later.</div>';
				break;
			default:
				document.getElementById('errs').innerHTML += '<div class="err">An unknown error occurred. Please try again later.</div>';
		}
		setTimeout(function () {
			document.getElementById('errs').style.transition = transition;
			document.getElementById('errs').style.opacity = 1;
		}, 10);
	});
}

function openEditUser(userID, url) {
	var f = document.createElement('form');
	f.action = url;
	f.method = 'POST';

	var i = document.createElement('input');
	i.type = 'hidden';
	i.name = 'userID';
	i.value = userID;
	f.appendChild(i);

	document.body.appendChild(f);
	f.submit();
	window.close();
}

function editUser() {
	request('../php/editUser.php', '#editForm', function (data) {
		document.getElementById('errs').innerHTML = "";
		var transition = document.getElementById('errs').style.transition;
		document.getElementById('errs').style.transition = "none";
		document.getElementById('errs').style.opacity = 0;

		document.getElementById('errs').innerHTML += '<div class="err">' + data + '</div>';


		switch (data) {
			case '0':
				window.location = 'user.php';
				break;
			case '1':
				document.getElementById('errs').innerHTML += '<div class="err">You can\'t change your own Admin status.</div>';
				break;
			case '2':
				document.getElementById('errs').innerHTML += '<div class="err">Failed to connect to database. Please try again later.</div>';
				break;
			case '3':
				document.getElementById('errs').innerHTML += '<div class="err">You are not logged in.</div>';
				break;
			case '4':
				document.getElementById('errs').innerHTML += '<div class="err">Invalid CSRF Token... Nice try</div>';
				break;
			case '5':
				document.getElementById('errs').innerHTML += '<div class="err">Posts not set. Please try again later.</div>';
				break;
			case '6':
				document.getElementById('errs').innerHTML += '<div class="err">Passwords don\'t match.</div>';
				break;
			default:
				document.getElementById('errs').innerHTML += '<div class="err">An unknown error occurred. Please try again later.</div>';
		}

		setTimeout(function () {
			document.getElementById('errs').style.transition = transition;
			document.getElementById('errs').style.opacity = 1;
		}, 10);
	});
}

// login.php
function login() {
	request('php/login.php', '#loginForm', function (data) {
		document.getElementById('errs').innerHTML = "";
		var transition = document.getElementById('errs').style.transition;
		document.getElementById('errs').style.transition = "none";
		document.getElementById('errs').style.opacity = 0;
		switch (data) {
			case '0':
				window.location = './';
				break;
			case '1':
				document.getElementById('errs').innerHTML += '<div class="err">Incorrect username or password</div>';
				break;
			case '2':
				document.getElementById('errs').innerHTML += '<div class="err">Failed to connect to database. Please try again later.</div>';
				break;
			case '3':
				document.getElementById('errs').innerHTML += '<div class="err">You have exceeded the max number of login attempts per hour. Try again in an hour.</div>';
				break;
			case '4':
				document.getElementById('errs').innerHTML += 'Your email has not been validated. Please check your email for a validation link or <a href="./validate">click here</a> to send another link</div>';
				break;
			case '5':
				document.getElementById('errs').innerHTML += '<div class="err">You have not been approved. Please wait, you will get an email when you are approved.</div>';
				break;
			default:
				document.getElementById('errs').innerHTML += '<div class="err">An unknown error occurred. Please try again later.</div>';
		}
		setTimeout(function () {
			document.getElementById('errs').style.transition = transition;
			document.getElementById('errs').style.opacity = 1;
		}, 10);
	});
}

// register.php
function register() {
	request('php/register.php', '#registerForm', function (data) {
		document.getElementById('errs').innerHTML = "";
		var transition = document.getElementById('errs').style.transition;
		document.getElementById('errs').style.transition = "none";
		document.getElementById('errs').style.opacity = 0;
		try {
			data = JSON.parse(data);
			if (!(data instanceof Array)) { throw Exception('bad data'); }

			//Show errors to user
			for (var i = 0; i < data.length; ++i) {
				switch (data[i]) {
					case 0:
						document.getElementById('errs').innerHTML += '<div>Your account has been created!</div><div>Please validate your email by checking your inbox for a validation link before logging in.</div>';
						document.getElementById('registerForm').reset();
						break;
					case 1:
						document.getElementById('errs').innerHTML += '<div class="err">Invalid name entered. (only use letters, spaces, and hyphens)</div>';
						break;
					case 2:
						document.getElementById('errs').innerHTML += '<div class="err">Invalid email entered.</div>';
						break;
					case 3:
						document.getElementById('errs').innerHTML += '<div class="err">Email does not exist. (This domain does not have a mail server)</div>';
						break;
					case 4:
						document.getElementById('errs').innerHTML += '<div class="err">Password must contain: <ul><li>At least 8 characters</li><li>At least one lower case letter</li><li>At least one upper case letter</li><li>At least one number</li><li>At least one special character (~?!@#$%^&*)</li></ul></div>';
						break;
					case 5:
						document.getElementById('errs').innerHTML += '<div class="err">Passwords do not match. Please re-enter your confirmed password.</div>';
						break;
					case 6:
						document.getElementById('errs').innerHTML += '<div class="err">Failed to add account to database. Please try again later.</div>';
						break;
					case 7:
						document.getElementById('errs').innerHTML += '<div class="err">An account with this email already exists</div>';
						break;
					case 8:
						document.getElementById('errs').innerHTML += '<div class="err">Failed to connect to the database. Please try again later.</div>';
						break;
					case 9:
						document.getElementById('errs').innerHTML += '<div class="err">Invalid CSRF Token. Please try again later.</div>';
						break;
					case 10:
						document.getElementById('errs').innerHTML += '<div class="err">Failed to send email. Please try again later.</div>';
						break;
					case 11:
						document.getElementById('errs').innerHTML += '<div class="err">Failed to insert request into database. Please try again later.</div>';
						break;
					case 12:
						document.getElementById('errs').innerHTML += '<div class="err">You have exceeded your number of allowed validation requests per day</div>';
						break;
					case 13:
						document.getElementById('errs').innerHTML += '<div class="err">The user with this email is already validated</div>';
						break;
					case 14:
						document.getElementById('errs').innerHTML += '<div class="err">A user with this email does not exist</div>';
						break;
					case 15:
						document.getElementById('errs').innerHTML += '<div class="err">Failed to connect to database. Please try again later.</div>';
						break;
					default:
						document.getElementById('errs').innerHTML += '<div class="err">An unknown error occurred. Please try again later.</div>';
				}
			}
		}
		catch (e) {
			document.getElementById('errs').innerHTML = '<div class="err">An unknown error occurred. Please try again later.</div>';
		}
		setTimeout(function () {
			document.getElementById('errs').style.transition = transition;
			document.getElementById('errs').style.opacity = 1;
		}, 10);
	});
}

// validateEmail.php
function sendValidateEmailRequest() {
	request('php/sendValidationEmail.php', '#validateEmailForm', function (data) {
		document.getElementById('errs').innerHTML = "";
		var transition = document.getElementById('errs').style.transition;
		document.getElementById('errs').style.transition = "none";
		document.getElementById('errs').style.opacity = 0;

		switch (data) {
			case '0':
				document.getElementById('errs').innerHTML += '<div>Email Sent... Check your email and click the link in the email to validate your email.</div>';
				document.getElementById('validateEmailForm').reset();
				break;
			case '1':
				document.getElementById('errs').innerHTML += '<div class="err">Failed to send email. Please try again later.</div>';
				break;
			case '2':
				document.getElementById('errs').innerHTML += '<div class="err">Failed to insert request into database. Please try again later.</div>';
				break;
			case '3':
				document.getElementById('errs').innerHTML += '<div class="err">You have exceeded your number of allowed validation requests per day</div>';
				break;
			case '4':
				document.getElementById('errs').innerHTML += '<div class="err">The user with this email is already validated</div>';
				break;
			case '5':
				document.getElementById('errs').innerHTML += '<div class="err">A user with this email does not exist</div>';
				break;
			case '6':
				document.getElementById('errs').innerHTML += '<div class="err">Failed to connect to database. Please try again later.</div>';
				break;
			default:
				document.getElementById('errs').innerHTML += '<div class="err">An unknown error occurred. Please try again later.</div>';
		}
		setTimeout(function () {
			document.getElementById('errs').style.transition = transition;
			document.getElementById('errs').style.opacity = 1;
		}, 10);
	});
}

// resetPassword.php
function passwordResetRequest() {
	request('php/passwordResetRequest.php', '#resetPasswordForm', function (data) {
		document.getElementById('errs').innerHTML = "";
		var transition = document.getElementById('errs').style.transition;
		document.getElementById('errs').style.transition = "none";
		document.getElementById('errs').style.opacity = 0;

		switch (data) {
			case '0':
				document.getElementById('errs').innerHTML += '<div>An email has been sent if an account with that email exists</div>';
				document.getElementById('resetPasswordForm').reset();
				break;
			case '1':
				document.getElementById('errs').innerHTML += '<div class="err">Failed to send email. Please try again later.</div>';
				break;
			case '2':
				document.getElementById('errs').innerHTML += '<div class="err">Failed to insert request into database. Please try again later.</div>';
				break;
			case '3':
				document.getElementById('errs').innerHTML += '<div class="err">You have exceeded your number of allowed reset requests per day. Try again later.</div>';
				break;
			case '4':
				document.getElementById('errs').innerHTML += '<div class="err">Failed to connect to database. Please try again later.</div>';
				break;
			case '5':
				document.getElementById('errs').innerHTML += '<div class="err">Invalid CSRF token</div>';
				break;
			case '6':
				document.getElementById('errs').innerHTML += '<div class="err">You must enter an email</div>';
				break;
			default:
				document.getElementById('errs').innerHTML += '<div class="err">An unknown error occurred. Please try again later.</div>';
		}
		setTimeout(function () {
			document.getElementById('errs').style.transition = transition;
			document.getElementById('errs').style.opacity = 1;
		}, 10);
	});
}
function changePassword() {
	request('../../php/changePassword.php', '#changePasswordForm', function (data) {
		document.getElementById('errs').innerHTML = "";
		var transition = document.getElementById('errs').style.transition;
		document.getElementById('errs').style.transition = "none";
		document.getElementById('errs').style.opacity = 0;
		try {
			data = JSON.parse(data);
			if (!(data instanceof Array)) { throw Exception('bad data'); }

			//Show errors to user
			for (var i = 0; i < data.length; ++i) {
				switch (data[i]) {
					case 0:
						document.getElementById('errs').innerHTML += '<div>Your password has been reset! You can now <a href="../../login">login</a></div>';
						document.getElementById('changePasswordForm').reset();
						break;
					case 1:
					case 2:
					case 7:
						document.getElementById('errs').innerHTML += '<div class="err">Invalid password reset request. If this is a mistake send a new request and click the link in the email.</div>';
						break;
					case 3:
						document.getElementById('errs').innerHTML += '<div class="err">Password must contain: <ul><li>At least 8 characters</li><li>At least one lower case letter</li><li>At least one upper case letter</li><li>At least one number</li><li>At least one special character (~?!@#$%^&*)</li></ul></div>';
						break;
					case 4:
						document.getElementById('errs').innerHTML += '<div class="err">Passwords do not match. Please re-enter your confirmed password.</div>';
						break;
					case 5:
						document.getElementById('errs').innerHTML += '<div class="err">Failed to update password in the database. Please try again later.</div>';
						break;
					case 6:
						document.getElementById('errs').innerHTML += '<div class="err">This password reset request has expired. Please send another email.</div>';
						break;
					case 8:
						document.getElementById('errs').innerHTML += '<div class="err">Failed to connect to the database. Please try again later.</div>';
						break;
					case 9:
						document.getElementById('errs').innerHTML += '<div class="err">Invalid CSRF Token. Please try again later.</div>';
						break;
					default:
						document.getElementById('errs').innerHTML += '<div class="err">An unknown error occurred. Please try again later.</div>';
				}
			}
		}
		catch (e) {
			document.getElementById('errs').innerHTML = '<div class="err">An unknown error occurred. Please try again later.</div>';
		}
		setTimeout(function () {
			document.getElementById('errs').style.transition = transition;
			document.getElementById('errs').style.opacity = 1;
		}, 10);
	});
}
