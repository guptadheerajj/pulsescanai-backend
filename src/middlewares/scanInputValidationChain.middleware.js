import { body } from "express-validator";

const createAgeChain = () =>
	body("age")
		.trim()
		.notEmpty()
		.withMessage("Please enter age")
		.isNumeric()
		.withMessage("Please enter a valida age");

const createGenderChain = () =>
	body("gender")
		.trim()
		.notEmpty()
		.withMessage("Please enter your gender")
		.isAlpha()
		.withMessage("Please provide valid gender");

const scanInputValidationChain = [createAgeChain(), createGenderChain()];

export { createAgeChain, createGenderChain, scanInputValidationChain };
