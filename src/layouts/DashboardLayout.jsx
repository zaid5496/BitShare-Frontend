import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = ({
  children,
}) => {
  return (
    <div
      className="
        min-h-screen

        bg-[#0f1117]

        flex
      "
    >
      <Sidebar />

      <main
        className="
          flex-1
          overflow-y-auto
        "
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;