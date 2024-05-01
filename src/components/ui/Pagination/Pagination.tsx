import cls from "./styles.module.scss";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const maxVisibleButtons = 3; // Number of page buttons to display at a time

  let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

  if (endPage - startPage + 1 < maxVisibleButtons) {
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  return (
    <div className={cls.pagination}>
      <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
        &lt;&lt;
      </button>
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        &lt;
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
        <button key={startPage + i} onClick={() => handlePageChange(startPage + i)} disabled={currentPage === startPage + i}>
          {startPage + i}
        </button>
      ))}
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        &gt;
      </button>
      <button onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
