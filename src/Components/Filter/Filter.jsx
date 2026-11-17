const Filter = ({ category, setCategory }) => {
  return (
    <select
      className="filter"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
    >
      <option value="All">All Categories</option>
      <option value="Skincare">Skincare</option>
      <option value="Haircare">Haircare</option>
      <option value="Makeup">Makeup</option>
      <option value="Body Care">Body Care</option>
    </select>
  );
};

export default Filter;