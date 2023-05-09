import { node } from 'prop-types';
import '../scss/style.scss';
import User from './user.js';
import Profile from './componets/Profile';
import CreateParty from './componets/CreateParty';
import Chart from './componets/Chart';
// Single Page Aplication

const pages = [
	{ path: '#/page1', template: Chart },
	{ path: '#/page2', template: CreateParty },
	{ path: '#/page3', template: Profile },
];
const appEl = document.querySelector('#app');

const render = () => {
	const page = pages.find((page) => page.path === location.hash);
	appEl.innerHTML = page ? page.template : Chart;
};

window.addEventListener('popstate', render);

render();

// Login Code
const loginForm = $('#loginForm');
const createAccount = $('#createAccountForm');
let userList = new Map();
let users = null;
let userId = 1000;

// Loading data from JSON file
$.getJSON('http://localhost:8070/users', (data) => {
	users = data;
	console.log(users);
});
// Checking user's credentials
loginForm.submit((e) => {
	e.preventDefault();
	users.forEach((user) => {
		if (
			user.email == $('.input').eq(0).val() &&
			user.password == $('.input').eq(1).val()
		) {
			$('#loginPage').hide();
			$('#mainPage').show();
		}
		setFormMessage('#loginForm', 'error', 'Invalid email/password combination');
	});
});
//Creating a new user
createAccount.submit((e) => {
	e.preventDefault();
	const name = $('.input').eq(0).val();
	const password = $('.input').eq(1).val();
	const confirmPassword = $('.input').eq(2).val();
	userId += userList.size;

	//  Input error message
	if ($('#password1').val() !== $('#password1').val()) {
		$('.form-message').text('Passwords do not match');
		$('.form-message').addClass('form-message-error');
	} else if (name === '' || password === '' || confirmPassword === '') {
		setFormMessage('#createAccountForm', 'error', 'Please fill up the form');
	} else {
		let newUser = new User(userId, name, password, confirmPassword);
		userList.set(newUser);
		$('#loginPage').hide();
		$('#mainPage').show();
		console.log(newUser);

		 // Send user data to server
		 $.ajax({
			type: "POST",
			url: "http://localhost:8070/users",
			data: JSON.stringify(newUser),
			contentType: "application/json",
			success: function() {
				 setFormMessage('#createAccountForm', 'success', 'Account created successfully');
			},
			error: function() {
				 setFormMessage('#createAccountForm', 'error', 'Failed to create account');
			}
		  });
	 
		  userId++;
		}
});

// Clear input error
$('.input').on('input', () => {
	$('.form-message').hide('form-message-error');
});

// Hide login and display create account form
$('.noaccount').click((e) => {
	e.preventDefault();
	loginForm.hide();
	createAccount.show();
});
// Hide create account and display login form
$('.account').click((e) => {
	e.preventDefault();
	createAccount.hide();
	loginForm.show();
});

// Setting the form message
function setFormMessage(formElement, type, message) {
	const messageElement = $(`${formElement} .form-message`);

	messageElement.text(message);
	messageElement.removeClass('form-message-success', 'form-message-error');
	messageElement.addClass(`form-message-${type}`);
}

// get data from server
// async function getData() {
//   try {
//     const response = await fetch("http://localhost:8070/users");
//     const userList = await response.json();
//     return userList;
//     // do something with the data
//   } catch (error) {
//     console.log(error);
//   }
// }
// getData()
//   .then((userList) => {
//     console.log(userList);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
