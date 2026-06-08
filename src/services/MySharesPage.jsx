import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageContainer from "../../components/layout/PageContainer";

import { getMyShares } from "../../services/shareService";

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

  return (
    <DashboardLayout>
      <PageContainer>
        <h1
          className="
            text-4xl
            font-bold
            mb-8
          "
        >
          My Share Links
        </h1>

        {shares.length === 0 ? (
          <p>
            No share links yet.
          </p>
        ) : (
          shares.map((share) => (
            <div
              key={share.id}
              className="
                bg-white
                p-5
                rounded-xl
                mb-4
              "
            >
              <h3>
                {
                  share.file_name
                }
              </h3>

              <p>
                Downloads:
                {" "}
                {
                  share.current_downloads
                }
                /
                {
                  share.max_downloads
                }
              </p>
            </div>
          ))
        )}
      </PageContainer>
    </DashboardLayout>
  );
};

export default MySharesPage;