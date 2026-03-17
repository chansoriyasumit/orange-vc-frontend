/**
 * Auth Library Exports
 */

export { AuthProvider, useAuth } from './AuthContext';
export { ApiAuthRepository } from './ApiAuthRepository';

// Export singleton instance for direct use (e.g., in forms)
import { ApiAuthRepository } from './ApiAuthRepository';
export const authRepository = new ApiAuthRepository();
