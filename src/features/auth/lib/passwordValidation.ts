/**
 * Password Validation Utilities
 * Shared password validation logic for signup and reset password flows
 */

// Password validation regex
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*()_+=\\₹-])[A-Za-z\d!@#$%&*()_+=\\₹-]{8,}$/;

// Password strength validation rules
export interface PasswordStrength {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  score: number; // 0-5
  label: 'weak' | 'fair' | 'good' | 'strong';
}

export function checkPasswordStrength(password: string): PasswordStrength {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%&*()_+=\\₹-]/.test(password);

  const score = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar].filter(Boolean).length;

  let label: PasswordStrength['label'] = 'weak';
  if (score >= 5) label = 'strong';
  else if (score >= 4) label = 'good';
  else if (score >= 3) label = 'fair';

  return {
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar,
    score,
    label,
  };
}
