// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from "firebase/auth";
// import { FIREBASE_WEB_CLIENT_ID } from "@env";
// import FirebaseApp from "../services/firebaseApp";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { httpService } from "./httpService";

/* const signInWithGoogle = async () => {
	try {
		GoogleSignin.configure({
			webClientId: FIREBASE_WEB_CLIENT_ID, // From Firebase Console
		});
		await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
		const userInfo = await GoogleSignin.signIn();
		// Create a new Firebase credential with the token
		const {idToken} = userInfo;
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);
		// Sign-in the user with the credential
		const userCredential = await auth().signInWithCredential(googleCredential);

		const user = userCredential.user;
		const fullName = user.displayName;
		const email = user.email;

		const userData = await checkAndSaveUserToFirestore(
			user.uid,
			fullName,
			email,
		);

		console.log('Google Sign In Successed!');

		return userData;
	} catch (error) {
		console.log(error);
	}
}; */

const checkAndSaveUserToFirestore = async (
  userId: string,
  fullName: string | null,
  email: string | null
) => {
  try {
    const payload = { userId, full_name: fullName, email };
    const response = await httpService({
      url: `users/signup`,
      method: "POST",
      data: payload,
    });

    let userData = { ...response, userId: userId };

    userData = mappingUserData(userData);
    return userData;
  } catch (error) {
    return null;
  }
};

const getCurrentUserData = async (userId: string) => {
  try {
    const payload = { userId };
    const response = await httpService({
      url: `users/userinfo`,
      method: "POST",
      data: payload,
    });

    if (response !== null) {
      let userData = { ...response, userId: userId };

      userData = mappingUserData(userData);
      return userData;
    }

    return null;
  } catch (error) {
    return null;
  }
};

const updateUserProfile = async (userData: any) => {
  try {
    const payload = {
      userId: userData.userId,
      full_name: userData.fullName,
      user_name: userData.userName,
      email: userData.email,
      phone_number: userData.phoneNumber,
      country: userData.country,
      countryFlag: userData.countryFlag,
      gender: userData.gender,
      user_address: userData.address,
      birthday: userData.birthday,
    };

    const response = await httpService({
      url: `users/updateprofile`,
      method: "POST",
      data: payload,
    });

    let updatedUserData = { ...response, userId: payload.userId };

    updatedUserData = mappingUserData(updatedUserData);
    return updatedUserData;
  } catch (error) {
    return null;
  }
};

const mappingUserData = (userDataFromBackend: any) => {
  const userData = {
    userId: userDataFromBackend.userId || null,
    fullName: userDataFromBackend.full_name || null,
    userName: userDataFromBackend.user_name || null,
    email: userDataFromBackend.email || null,
    address: userDataFromBackend.user_address || null,
    birthday: userDataFromBackend.birthday || null,
    country: userDataFromBackend.country || null,
    countryFlag: userDataFromBackend.countryFlag || null,
    gender: userDataFromBackend.gender || null,
    phoneNumber: userDataFromBackend.phone_number || null,
    createdAt: userDataFromBackend.createdAt || null,
  };
  return userData;
};

const validateOrganizeEmail = async (email: string) => {
  try {
    const payload = { email };
    const response = await httpService({
      url: `users/validateorgemail`,
      method: "POST",
      data: payload,
    });
    return response.isValid;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/* const sendSignInLinkForSSO = async (email: string) => {
	try {
		const actionCodeSettings = {
			handleCodeInApp: true,
			url: 'https://needfulapp.page.link/',
			iOS: {
				bundleId: 'com.your-app-name',
			},
			android: {
				packageName: 'com.needful_app',
				installApp: true,
			},
		};

		await FirebaseApp.auth.sendSignInLinkToEmail(email, actionCodeSettings);
		await AsyncStorage.setItem('emailForSSO', email);
		return true;
	} catch (error) {
		console.error('Error sending sign-in link:', error);
		console.log('Error', 'Failed to send sign-in link. Please try again.');
		return false;
	}
}; */

const AuthService = {
  // signInWithGoogle,
  validateOrganizeEmail,
  // sendSignInLinkForSSO,
  checkAndSaveUserToFirestore,
  getCurrentUserData,
  updateUserProfile,
  mappingUserData,
};

export default AuthService;
