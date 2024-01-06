"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { GrPrevious, GrNext } from "react-icons/gr";

const Pagination = ({ totalPages }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { replace } = useRouter();

  const handleClick = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber);
    replace(`${pathname}?${params.toString()}#header`);
  };

  const returnPaginationItems = () => {
    const elements = [];
    const createElement = (label, key, page = null) => {
      if (!page) {
        return (
          <button className="mx-2 bg-w_gray" key={key}>
            {label}
          </button>
        );
      }
      return (
        <button
          className={`${currentPage == label ? "bg-w_orange" : "bg-w_gray"
            } mx-2 h-10 w-10 rounded-full shadow-md`}
          key={key}
          onClick={() => handleClick(page)}
        >
          <span className="block">{label}</span>
        </button>
      );
    };

    if (currentPage > 1) {
      elements.push(
        createElement(<GrPrevious className="mx-auto" />, -5, currentPage - 1),
      );
    }
    elements.push(createElement(1, 1, 1));

    if (currentPage > 4) {
      elements.push(createElement("...", -3));
    }

    const x = 2;
    const r1 = currentPage - x;
    const r2 = currentPage + x;

    for (let i = r1 > 2 ? r1 : 2; i <= Math.min(totalPages, r2); i++) {
      elements.push(createElement(i, i, i));
    }

    if (r2 + 1 < totalPages) {
      elements.push(createElement("...", -2));
    }
    if (r2 < totalPages) {
      elements.push(createElement(totalPages, totalPages, totalPages));
    }

    if (currentPage < totalPages) {
      elements.push(
        createElement(<GrNext className="mx-auto" />, -4, currentPage + 1),
      );
    }

    return elements;
  };

  return (
    <div className="w-full text-center mt-12">
      <div className="inline-block mx-auto">{returnPaginationItems()}</div>
    </div>
  );
};

export default Pagination;
