import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageContainer from "../../components/layout/PageContainer";

import { useAuth } from "../../context/AuthContext";

import { getDashboardStats } from "../../services/dashboardService";

const StatCard = ({
  title,
  value,
}) => {
  return (
    <div
      className="
        bg-[#171923]

        border
        border-[#262a35]

        rounded-2xl

        p-6
      "
    >
      <p
        className="
          text-slate-400
          text-sm
        "
      >
        {title}
      </p>

      <h3
        className="
          text-3xl
          font-bold
          text-white
          mt-2
        "
      >
        {value}
      </h3>
    </div>
  );
};

const DashboardPage = () => {
  const { user } =
    useAuth();

  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats =
    async () => {
      try {
        const data =
          await getDashboardStats();

        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <DashboardLayout>
      <PageContainer>

        <div className="mb-10">
          <h1
            className="
              text-4xl
              font-bold
              text-white
            "
          >
            Welcome back 👋
          </h1>

          <p
            className="
              mt-3
              text-slate-400
            "
          >
            {user?.email}
          </p>
        </div>

        {!stats ? (
          <div
            className="
              text-slate-400
            "
          >
            Loading dashboard...
          </div>
        ) : (
          <div
            className="
              grid
              md:grid-cols-3
              gap-5
            "
          >
            <StatCard
              title="Files"
              value={stats.total_files}
            />

            <StatCard
              title="Links"
              value={stats.total_shares}
            />

            <StatCard
              title="Active Links"
              value={stats.active_shares}
            />
          </div>
        )}

      </PageContainer>
    </DashboardLayout>
  );
};

export default DashboardPage;