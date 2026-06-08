import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageContainer from "../../components/layout/PageContainer";

import ShareCard from "../../components/shares/ShareCard";

import {
  getMyShares,
} from "../../services/shareService";

const MySharesPage = () => {
  const [shares, setShares] =
    useState([]);

  useEffect(() => {
    loadShares();
  }, []);

  const loadShares =
    async () => {
      try {
        const data =
          await getMyShares();

        setShares(data);
      } catch (error) {
        console.error(error);
      }
    };

  const activeShares =
    shares.filter(
      (share) =>
        share.is_active
    ).length;

  const revokedShares =
    shares.filter(
      (share) =>
        !share.is_active
    ).length;

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
          Share Links
        </h1>

        <p
          className="
            mt-3
            text-slate-400
          "
        >
          Manage your active
          and revoked links.
        </p>
      </div>

      <div
        className="
          grid
          md:grid-cols-3
          gap-5
          mb-10
        "
      >
        <div
          className="
            bg-[#171923]
            border
            border-[#262a35]

            rounded-2xl
            p-6
          "
        >
          <p className="text-slate-400">
            Total Links
          </p>

          <h2
            className="
              text-white
              text-3xl
              font-bold
              mt-2
            "
          >
            {shares.length}
          </h2>
        </div>

        <div
          className="
            bg-[#171923]
            border
            border-[#262a35]

            rounded-2xl
            p-6
          "
        >
          <p className="text-slate-400">
            Active
          </p>

          <h2
            className="
              text-green-400
              text-3xl
              font-bold
              mt-2
            "
          >
            {activeShares}
          </h2>
        </div>

        <div
          className="
            bg-[#171923]
            border
            border-[#262a35]

            rounded-2xl
            p-6
          "
        >
          <p className="text-slate-400">
            Revoked
          </p>

          <h2
            className="
              text-red-400
              text-3xl
              font-bold
              mt-2
            "
          >
            {revokedShares}
          </h2>
        </div>
      </div>

      {shares.length === 0 ? (
        <div
          className="
            bg-[#171923]

            border
            border-[#262a35]

            rounded-2xl

            p-12

            text-center
          "
        >
          <h3
            className="
              text-white
              text-xl
              font-semibold
            "
          >
            No Share Links
          </h3>

          <p
            className="
              mt-2
              text-slate-400
            "
          >
            Create one from
            your files page.
          </p>
        </div>
      ) : (
        <div
          className="
            grid
            lg:grid-cols-2
            gap-5
          "
        >
          {shares.map(
            (share) => (
              <ShareCard
                key={share.id}
                share={share}
                refresh={
                  loadShares
                }
              />
            )
          )}
        </div>
      )}

    </PageContainer>
    </DashboardLayout>
  );
};

export default MySharesPage;