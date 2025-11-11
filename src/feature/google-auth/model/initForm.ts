export type SignupFormState = {
  name: string;
  studentNumber: string;
  nameError?: string;
  studentNumberError?: string;
};

export const initialState: SignupFormState = {
  name: '',
  studentNumber: '',
  nameError: undefined,
  studentNumberError: undefined,
};
