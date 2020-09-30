const checkValidity = (value) => {
	let isValid = true;

	console.log(value.replace(/\s+/g, ""));

	isValid = value.trim() !== "" && isValid;

	const pattern = /^\d{8}-\d{4}\-\d{4}\-\d{4}\-\d{11}$/;
	isValid = pattern.test(value.replace(/\s+/g, "")) && isValid;
	return isValid;
};
export default checkValidity;
