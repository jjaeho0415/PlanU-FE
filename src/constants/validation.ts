export const USER_ID_VALIDATION = /^[A-Za-z0-9]{5,12}$/;
export const PASSWORD_VALIDATION =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&()])[A-Za-z\d@$!%*?&()]{8,15}$/;
export const EMAIL_VALIDATION = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
