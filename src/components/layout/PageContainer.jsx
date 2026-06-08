const PageContainer = ({
  children,
}) => {
  return (
    <div
      className="
        max-w-6xl

        mx-auto

        px-8
        py-10
      "
    >
      {children}
    </div>
  );
};

export default PageContainer;