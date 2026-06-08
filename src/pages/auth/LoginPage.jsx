import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import AuthLayout from "../../layouts/AuthLayout";

import { loginUser } from "../../services/authService";

import {
  setTokens,
} from "../../utils/token";

import {
  useAuth,
} from "../../context/AuthContext";

const LoginPage = () => {
  const navigate =
    useNavigate();

  const { loadUser } =
    useAuth();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const data =
          await loginUser(form);

        setTokens(
          data.access,
          data.refresh
        );

        await loadUser();

        navigate(
          "/dashboard"
        );
      } catch (error) {
        alert(
          "Login failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue"
    >
      <form
        onSubmit={
          handleSubmit
        }
        className="
          space-y-5
        "
      >
        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target.value,
            })
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value,
            })
          }
        />

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </Button>

        <p
          className="
            text-center
            text-sm
            text-slate-500
          "
        >
          Don't have an
          account?{" "}
          <Link
            to="/register"
            className="
              text-violet-400
              hover:text-violet-300
              font-medium
            "
          >
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;