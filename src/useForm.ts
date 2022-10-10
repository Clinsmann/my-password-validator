import { ChangeEvent, useCallback, useEffect, useState } from "react";

// The \d metacharacter matches any digit (0 – 9) in the string
// white space as a special character
// Return /[0-9]/.test(str)
const EMAIL_REGX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const DEFAULT_PASSWORD_LENGTH = 8;

export type ValidationParameter =
  | "specialCharacters"
  | "decimalCharacters"
  | "lowercaseLetters"
  | "uppercaseLetters"
  | "minCharacters";

interface LoginForm {
  password: string;
  email: string;
}

interface ValidationError {
  email: boolean;
  password: {
    [name in ValidationParameter]: boolean;
  };
}

type ValidationMessage = {
  [name in ValidationParameter]: string;
};

const DEFAULT_FORM: LoginForm = {
  password: "",
  email: "",
};

export const valitaionMessages: ValidationMessage = {
  minCharacters: "8+ characters",
  lowercaseLetters: "Lowercase letters",
  uppercaseLetters: "Uppercase letters",
  decimalCharacters: "Number",
  specialCharacters: "Special characters",
};

const validatePassword = (password: string) => ({
  minCharacters: password.length >= DEFAULT_PASSWORD_LENGTH,
  specialCharacters: /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password),
  decimalCharacters: /[0-9]/.test(password),
  lowercaseLetters: /[a-z]/.test(password),
  uppercaseLetters: /[A-Z]/.test(password),
});

const DEFAULT_VALIDATION: ValidationError = {
  password: {
    minCharacters: false,
    specialCharacters: false,
    decimalCharacters: false,
    lowercaseLetters: false,
    uppercaseLetters: false,
  },
  email: false,
};

export const useForm = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [form, setForm] = useState<LoginForm>({ ...DEFAULT_FORM });
  const [errors, setErrors] = useState<ValidationError>({
    ...DEFAULT_VALIDATION,
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  useEffect(() => {
    setErrors({
      email: EMAIL_REGX.test(form.email),
      password: validatePassword(form.password),
    });
  }, [form]);

  useEffect(() => {
    const isPasswordValid = Object.values(errors.password).every(
      (param) => param
    );
    setIsFormValid(isPasswordValid && errors.email);
  }, [errors.password]);

  return { isFormValid, onChange, errors, form };
};
