import PropTypes from 'prop-types';

export const ContactList = ({ items, onDelete }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} style={{ paddingBottom: '10px' }}>
          <span style={{ width: '220px' }}>
            {' '}
            {item.name} : {item.number}{' '}
          </span>
          <button
            onClick={() => {
              onDelete(item.id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired }))
    .isRequired,
  onDelete: PropTypes.func.isRequired,
};
