import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [];

  if (current <= 4) {
    pages.push(1, 2, 3, "...", total - 2, total - 1, total);
  } else if (current >= total - 3) {
    pages.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, "...", current - 1, current, current + 1, "...", total);
  }

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {/* Prev */}
      <button
        className={styles.navBtn}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {/* Page numbers */}

      <div className={styles.page_numbers}>
        {pages.map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={[
                styles.pageBtn,
                page === currentPage ? styles.active : "",
              ].join(" ")}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ),
        )}
      </div>

      {/* Next */}
      <button
        className={[styles.navBtn, styles.nextBtn].join(" ")}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
