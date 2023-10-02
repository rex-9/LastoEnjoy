const Pagination = ({
  pages,
  currentPage,
  navToPage,
}: {
  pages: number[];
  currentPage: number;
  navToPage: (page: number) => void;
}) => {
  return (
    <div className="w-full flex justify-center items-center my-8">
      <div className="w-1/4 flex justify-between items-center">
        {pages.map((page: number) => (
          <button
            className="px-2 border-2 rounded-lg border-gray-400 hover:border-red-500"
            style={{
              backgroundColor: currentPage === page ? "red" : "transparent",
            }}
            onClick={() => navToPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
