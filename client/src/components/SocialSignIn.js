import React from 'react';
import { doSocialSignIn } from '../firebase/FirebaseFunctions';

const SocialSignIn = () => {
  const socialSignOn = async (provider) => {
    try {
      await doSocialSignIn(provider);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <img
        onClick={() => socialSignOn('google')}
        alt="google signin"
        src="/imgs/btn_google_signin.png"
        width = "190"
        height = "46"
      />
      <img
        onClick={() => socialSignOn('facebook')}
        alt= "facebook signin"
        src= "/imgs/btn_facebook_signin.png"
        width = "190"
        height = "43"
      />
    </div>
  );
};

export default SocialSignIn;
