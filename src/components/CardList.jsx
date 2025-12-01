import React, { useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Search from "./Search";

const CardList = ({ data }) => {
  const limit = 10;
  const defaultDataset = data.slice(0, limit);

  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(defaultDataset);
  const [filteredData, setFilteredData] = useState(data);

  const handlePagination = (direction) => {
    const newOffset = offset + direction * limit;
    if (newOffset >= 0 && newOffset < filteredData.length) {
      setOffset(newOffset);
    }
  };

  const filterTags = (searchTerm) => {
    if (!searchTerm) {
      setFilteredData(data);
      setOffset(0);
    } else {
      const filtered = data.filter((product) =>
        product.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered);
      setOffset(0);
    }
  };

  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, limit, filteredData]);

  const isLastPage = offset + limit >= filteredData.length;

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => handlePagination(-1)}
          disabled={offset === 0}
        />
        <Button
          text="Next"
          handleClick={() => handlePagination(1)}
          disabled={isLastPage}
        />
      </div>
    </div>
  );
};

export default CardList;