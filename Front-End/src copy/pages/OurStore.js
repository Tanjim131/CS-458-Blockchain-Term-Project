import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";

function OurStore() {
    const [ grid, setGrid ] = useState(4);

  return (
    <>
      <Meta title="Patient" />
      <BreadCrumb title="Patient Registration" />
      <div className="store-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-9">
              <div className="products-list pb-5">
                <div className="d-flex flex-wrap gap-10 align-item-center">
                    <ProductCard grid={grid} type="abc"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OurStore;
