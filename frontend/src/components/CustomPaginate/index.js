import Paginate from 'react-paginate';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "./index.scss";

const CustomPaginate = ({pageCount, changePage}) => {
  const handlePageChange = (e) => {
    console.log("changing page", e);
    changePage(e);
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, .1);
  };

  //see which of the classnames are actually needed
  return (
    <Paginate
        previousLabel={<FaChevronLeft className="icon-custom" />}
        nextLabel={<FaChevronRight className="icon-custom" />}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        previousClassName="pagination__arrow"
        nextClassName="pagination__arrow"
        disabledClassName="pagination__link--disabled"
        activeClassName="pagination__link--active"
        pageClassName="pagination__link"
      />
  )
}

export default CustomPaginate;