import AuthForm from "../components/authentication/AuthForm";

// Landing page: renders authentication form
export default function LandingPage({ setToken }) {
  // Render AuthForm for login/register
  return <AuthForm setToken={setToken} />;
}
