import { node } from 'prop-types';
import '../scss/style.scss';
import User from './user.js';
import Profile from './components/Profile';
import CreateParty from './components/CreateParty';
import Chart from './components/Chart';
export default users;
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
let users = [];
let userId = 1001;

// Loading data from JSON file
$.getJSON('http://localhost:8070/users', (data) => {
	users = data;
	console.log(users);
});
// Checking user's credentials
loginForm.submit((e) => {
	e.preventDefault();
	users.forEach((user) => {
		if (user.email == $('.input').eq(0).val() && user.password == $('.input').eq(1).val()) {
			$('#loginPage').hide();
			$('#mainPage').show();
		}
		setFormMessage('#loginForm', 'error', 'Invalid email/password combination');
	});
});
//Creating a new user
createAccount.submit((e) => {
	e.preventDefault();
	const fName = $('.input-1').val();
	const lName = $('.input-2').val();
	const email = $('.input-3').val();
	const password = $('.input-4').val();
	const confirmPassword = $('.input-5').eq(2).val();
	//  Input error message
	if ($('#password1').val() !== $('#password1').val()) {
		$('.form-message').text('Passwords do not match');
		$('.form-message').addClass('form-message-error');
	} else if (fName === '' || lName === '' || email === '' || password === '' || confirmPassword === '') {
		setFormMessage('#createAccountForm', 'error', 'Please fill up the form');
	} else {
		let newUser = new User(userId, fName, lName, email);
		users.push(newUser);

		// fetch('http://localhost:8070/submit', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(newUser),
		// }).then(function (response) {
		// 	return response.json();
		// })
		// $.ajax({
		//   type: "POST",
		//   url: "http://localhost:8070/users",
		//   data: JSON.stringify(newUser),
		//   contentType: "application/json",
		//   success: function() {
		// 		setFormMessage('#createAccountForm', 'success', 'Account created successfully');
		// 	  //  $('#loginPage').hide();
		// 	  //  $('#mainPage').show();
		// 		console.log(users);
		//   },
		//   error: function() {
		// 		setFormMessage('#createAccountForm', 'error', 'Failed to create account');
		//   }
		//  });
		$.post('http://localhost:8070/users', newUser, (data, status) => {
			if(status === "success") {
				console.log(data);
			}
		},
		"json");

		// const url = 'http://localhost:8070/users';
		// let xhr = new XMLHttpRequest();
		// userId++;
	 }
});

// Clear input error
$('.input').on('input', () => {0
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
