import PropTypes from 'prop-types';

const Paginate = ({ totalItems, itemsPerPage, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  return (
    <div className='flex py-4'>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li key={number} className={number === paginate? 'page-item-active' : 'page-item'}>
              <a onClick={() => paginate(number)} className='page-link'>{number}</a>
            </li>
          ))}
        </ul>
  
    </div>
  )
}

Paginate.propTypes = {
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired
}

export default Paginate