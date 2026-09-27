import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  MapPin,
  Store,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";

import products from "../data/product";
import shops from "../data/Shops";

import "./SearchResults.css";

const SearchResults = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";

  const results = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return [];
    }

    return products
      .filter((product) =>
        product.name?.toLowerCase().includes(search)
      )
      .map((product) => {
        const shop = shops.find(
          (shop) => String(shop.id) === String(product.shopId)
        );

        return {
          product,
          shop,
        };
      })
      .filter((result) => result.shop);
  }, [query]);

  return (
    <div className="search-results-page">

      <div className="search-results-container">

        {/* Header */}
        <div className="search-results-header">

          <Link to="/" className="back-link">
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <div className="search-results-title">
            <span className="search-results-label">
              Product Search
            </span>

            <h1>
              Results for "{query}"
            </h1>

            <p>
              Find this product at local shops and compare
              their available prices.
            </p>
          </div>

        </div>

        {/* Results */}
        {results.length > 0 ? (
          <>
            <div className="results-summary">
              <div>
                <Search size={18} />
                <span>
                  {results.length} shop
                  {results.length !== 1 ? "s" : ""} found
                </span>
              </div>
            </div>

            <div className="product-shop-results">

              {results.map(({ product, shop }) => (

                <div
                  className="product-shop-card"
                  key={`${product.id}-${shop.id}`}
                >

                  {/* Product Image */}
                  <div className="result-product-image">

                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                      />
                    ) : (
                      <ShoppingBag size={32} />
                    )}

                  </div>

                  {/* Information */}
                  <div className="result-product-info">

                    <div className="result-product-heading">

                      <div>
                        <span className="result-product-label">
                          Product
                        </span>

                        <h2>{product.name}</h2>
                      </div>

                      <div className="result-price">
                        Rs. {product.price}
                      </div>

                    </div>

                    <div className="result-shop-info">

                      <div className="shop-icon">
                        <Store size={19} />
                      </div>

                      <div>
                        <strong>{shop.name}</strong>

                        <span>
                          <MapPin size={14} />
                          {shop.location}
                        </span>
                      </div>

                    </div>

                    <div className="result-actions">

                      <Link
                        to={`/shop/${shop.id}`}
                        className="view-shop-btn"
                      >
                        View Shop
                      </Link>

                      <Link
                        to={`/product/${product.id}`}
                        className="view-product-btn"
                      >
                        View Product
                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          </>
        ) : (
          <div className="no-search-results">

            <div className="no-results-icon">
              <Search size={32} />
            </div>

            <h2>
              No shops found
            </h2>

            <p>
              We couldn't find "{query}" in the available
              products.
            </p>

            <Link
              to="/all-shops"
              className="browse-shops-btn"
            >
              <Store size={18} />
              Browse Local Shops
            </Link>

          </div>
        )}

      </div>

    </div>
  );
};

export default SearchResults;