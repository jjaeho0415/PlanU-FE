type IUpdateUserProfileRequest = {
  name: string | null;
  email: string | null;
  password: string | null;
  birthDate: string | null;
  profileImage: File | null;
};

type IUpdateNoBirthDateProfileRequest = {
  name: string | null;
  email: string | null;
  password: string | null;
  profileImage: File | null;
};

type IVerifyPasswordRequest = {
  password: string;
};

type IChangePasswordRequest = {
  newPassword: string;
  confirmPassword: string;
};
