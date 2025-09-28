import { body } from "express-validator";

const createUsernameChain = () =>
	body("username")
		.trim()
		.notEmpty()
		.withMessage("Please enter an email")
		.isAlphanumeric()
		.withMessage("Username must only contain alphnuemric characters")
		.isLength({ min: 3, max: 15 })
		.withMessage("Username must between 3 to 15 characters");

const createEmailChain = () =>
	body("email")
		.trim()
		.notEmpty()
		.withMessage("Please enter an email")
		.isEmail()
		.withMessage("Please enter a valid email");

const createPasswordChain = () =>
	body("password")
		.trim()
		.notEmpty()
		.withMessage("Please enter a password")
		.matches(/^[a-zA-Z0-9]+$/)
		.withMessage("Password must contain only letters and numbers.")
		.isLength({ min: 3, max: 15 })
		.withMessage("Password must between 3 to 15 characters");

const userValidationChain = [
	createUsernameChain(),
	createEmailChain(),
	createPasswordChain(),
];

export { userValidationChain };
