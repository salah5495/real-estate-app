import { useSearch } from "../../context/search";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { GOOGLE_PLACES_KEY } from "../../config";
import { sellPrices, rentPrices } from "../../helpers/priceList";
import queryString from "query-string";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SearchForm() {
  // context
  const [search, setSearch] = useSearch();
  // hooks
  const navigate = useNavigate();

  // console.log(sellPrices, rentPrices);

  const handleSearch = async () => {
    setSearch({ ...search, loading: false });
    try {
      const { results, page, price, ...rest } = search;
      const query = queryString.stringify(rest);
      // console.log(query);

      const { data } = await axios.get(`/search?${query}`);

      if (search?.page !== "/search") {
        setSearch((prev) => ({ ...prev, results: data, loading: false }));
        navigate("/search");
      } else {
        setSearch((prev) => ({
          ...prev,
          results: data,
          page: window.location.pathname,
          loading: false,
        }));
      }
    } catch (err) {
      console.log(err);
      setSearch({ ...search, loading: false });
    }
  };

  return (
    <>
      <div className="container m-5">
        <div className="row">
          <div className="col-lg-12 form-control">
            <GooglePlacesAutocomplete
              apiKey={GOOGLE_PLACES_KEY}
              apiOptions="au"
              selectProps={{
                defaultInputValue: search?.address,
                placeholder: "Search for address..",
                onChange: ({ value }) => {
                  setSearch({ ...search, address: value.description });
                },
              }}
            />
          </div>
        </div>

        <div className="d-flex justify-content-center mt-3">
          <button
            onClick={() => setSearch({ ...search, action: "Buy", price: "" })}
            className="btn btn-primary col-lg-2 square"
          >
            {search.action === "Buy" ? "✅ Buy" : "Buy"}
          </button>
          <button
            onClick={() => setSearch({ ...search, action: "Rent", price: "" })}
            className="btn btn-primary col-lg-2 square"
          >
            {search.action === "Rent" ? "✅ Rent" : "Rent"}
          </button>
          <button
            onClick={() => setSearch({ ...search, type: "House", price: "" })}
            className="btn btn-primary col-lg-2 square"
          >
            {search.type === "House" ? "✅ House" : "House"}
          </button>
          <button
            onClick={() => setSearch({ ...search, type: "Land", price: "" })}
            className="btn btn-primary col-lg-2 square"
          >
            {search.type === "Land" ? "✅ Land" : "Land"}
          </button>

          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle square"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              &nbsp; {search?.price ? search.price : "Price"}
            </button>

            <ul className="dropdown-menu">
              {search.action === "Buy" ? (
                <>
                  {sellPrices.map((item) => (
                    <li key={item._id}>
                      <a
                        onClick={() => {
                          setSearch({
                            ...search,
                            price: item.name,
                            priceRange: item.array,
                          });
                        }}
                        className="dropdown-item"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {rentPrices.map((item) => (
                    <li key={item._id}>
                      <a
                        onClick={() => {
                          setSearch({
                            ...search,
                            price: item.name,
                            priceRange: item.array,
                          });
                        }}
                        className="dropdown-item"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <button
            onClick={handleSearch}
            className="btn btn-danger col-lg-2 square"
          >
            Search
          </button>
        </div>

        {/* <pre>{JSON.stringify(search, null, 4)}</pre> */}
      </div>
    </>
  );
}
