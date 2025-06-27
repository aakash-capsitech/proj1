import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GoogleLoginButton = () => {
  const navigate = useNavigate()
  const handleSuccess = async (credentialResponse: any) => {
    const res = await fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: credentialResponse.credential })
    });
    const data = await res.json();
    console.log(data)
    // TODO: Handle token/save to localStorage or context
    navigate("/")

  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log('Login Failed')}
    />
  );
};

export default GoogleLoginButton;
