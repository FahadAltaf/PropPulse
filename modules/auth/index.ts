import { 
  signUp,
  signIn,
  signOut,
  sendInvites,
  resendVerificationEmail,
  acceptInvite,
  deleteUser,
  onAuthStateChange,
  signInWithOtp,
  verifyOtp,
  signInWithOAuth,
  resetPasswordForEmail,
  updatePassword,
  verifyRecoveryOtp,
  setSession,
  AuthSignupData 
} from './services/auth-service';
import { 
  GET_USER_BY_ID,
  UPDATE_USER_PROFILE,
} from './services/auth-graphql';

export { 
  // Export all auth functions
  signUp,
  signIn,
  signOut,
  sendInvites,
  resendVerificationEmail,
  acceptInvite,
  deleteUser,
  onAuthStateChange,
  signInWithOtp,
  verifyOtp,
  signInWithOAuth,
  resetPasswordForEmail,
  updatePassword,
  verifyRecoveryOtp,
  setSession,
  // Export GraphQL queries and utilities
  GET_USER_BY_ID,
  UPDATE_USER_PROFILE,
};
export type { AuthSignupData }; 