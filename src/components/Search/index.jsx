export const Search = ({ search, setSearch }) => {
  return (
    <div className="root">
      {console.log('search', search)}
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(event) => {
          console.log(event);
        }}
      />
    </div>
  );
};
export default Search;
