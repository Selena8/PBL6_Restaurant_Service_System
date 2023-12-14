// @ts-ignore
import { toast } from "react-hot-toast";
import { isEmail, isEmpty } from "validator";

export function unValidTextField(field: string) {
  return isEmpty(field) || /\d/.test(field);
}

export function unValidNumberField(field: string) {
  return isEmpty(field) || /[a-zA-Z]/.test(field);
}

export function unValidPassword(password: string) {
  const isNotEmpty = !isEmpty(password);
  const hasMinimumLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialChars = /[!@#$%^&*()\-=_+[\]{};':"|,.<>/?]/.test(password);

  return !(
    isNotEmpty &&
    hasMinimumLength 
    && hasUppercase &&
    hasLowercase &&
    hasSpecialChars
  );
}

export function unValidEmail(email: string) {
  return isEmpty(email) || !isEmail(email);
}

// export function validatePhoneNumber(phone: string) {
//   var re = /^\d{10}$/;
//   return re.test(phone);
// }

export function hasNumber(name: string) {
  return /\d/.test(name);
}

export function capitalize (value: string) {
  return value[0].toUpperCase() + value.slice(1);
}

export function unValidPhoneNumber(phoneNumber: string) {
  const regexPhoneNumber = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/;

  return !regexPhoneNumber.test(phoneNumber)
}

export function formatTime(datetime: string) {
  const date = new Date(datetime)
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);

  return `${hours}:${minutes}`;
}
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}
export function formatDatetime(datetime: string) {
  const dtObject = new Date(datetime);

  const day = dtObject.getDate().toString().padStart(2, '0');
  const month = (dtObject.getMonth() + 1).toString().padStart(2, '0');
  const year = dtObject.getFullYear();
  const hours = dtObject.getHours().toString().padStart(2, '0');
  const minutes = dtObject.getMinutes().toString().padStart(2, '0');

  const period = (dtObject.getHours() >= 12) ? 'PM' : 'AM';

  const formattedDatetime = `${day}/${month}/${year} ${hours}:${minutes} ${period}`;

  return formattedDatetime;
}

export function formatNumber(number: number) {
  return new Intl.NumberFormat('vi-VN').format(number);
}

export const showMessage = (message: string, isSuccess: boolean) => {
  if(isSuccess) {
    toast.success(message, {
      position: "top-center",
    });
  } else {
    toast.error(message, {
      position: "top-center",
    });
  }
}