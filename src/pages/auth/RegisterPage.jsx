import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import AuthLayout from "../../layouts/AuthLayout";

import {
  registerUser,
} from "../../services/authService";

const RegisterPage = () => {
  const navigate =
    useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] =
    useState({
      email: "",
      username: "",
      password: "",
      confirm_password: "",
    });

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        form.password !==
        form.confirm_password
      ) {
        alert(
          "Passwords do not match"
        );
        return;
      }

      try {
        setLoading(true);

        await registerUser({
          email: form.email,
          username:
            form.username,
          password:
            form.password,
        });

        navigate("/login");
      } catch (error) {
        alert(
          "Registration failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start sharing files in seconds"
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
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username:
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

        <Input
          type="password"
          placeholder="Confirm Password"
          value={
            form.confirm_password
          }
          onChange={(e) =>
            setForm({
              ...form,
              confirm_password:
                e.target.value,
            })
          }
        />

        <Button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </Button>

        <p
          className="
            text-center
            text-sm
            text-slate-500
          "
        >
          Already have an
          account?{" "}
          <Link
            to="/login"
            className="
              text-blue-600
              font-medium
            "
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;