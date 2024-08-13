export const Search = ({ search, setSearch }) => {
  return (
    <div className="root">
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </div>
  );
};
export default Search;
