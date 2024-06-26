import classNames from "classnames/bind";
import { useParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { memo } from "react";

import styles from "./Restaurants.module.scss";

import ListSlider from "~/components/ListSlider/ListSlider";
import RestaurantList from "~/components/RestaurantList";
import BreadCrumb from "~/components/BreadCrumb/BreadCrumb";
import { SearchIcon } from "~/components/Icons";

const cx = classNames.bind(styles);

function Restaurants() {
  const { t } = useTranslation();
  const url = useLocation();
  const navigate = useNavigate();

  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");

  const query = searchParams.get("q");

  // kiểm tra xem đang là page restaurant hay restaurant by category
  const getPageType = () => {
    let pageType = "restaurants";
    if (url.pathname.includes("restaurants")) {
      pageType = "restaurants";
    }
    if (category) {
      pageType = "restaurantsBycategory";
    }
    return pageType;
  };
  const [currentPageType, setCurrentPageType] = useState(getPageType());

  const handleClick = (e) => {
    if (searchValue.trim()) {
      navigate(`/restaurants?q=${searchValue}`);
    }
    e.target.blur();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (url.pathname.includes("restaurants")) {
      setCurrentPageType("restaurants");
    }
    if (category) {
      setCurrentPageType("restaurantsBycategory");
    }
  }, [category, url.pathname, query]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container gx-5")}>
        <div className={cx("restaurant__search-container")}>
          <SearchIcon className={cx("restaurant__search-icon")} />
          <input
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleClick(e);
              }
            }}
            value={searchValue}
            id="restaurant-search"
            type="text"
            className={cx("restaurant__search")}
            placeholder=""
          />
          <label htmlFor="restaurant-search" className={cx("restaurant__search-label")}>
            {t("restaurant.placeholder")}
          </label>
        </div>
      </div>
      <div className={cx("restaurant__sparate")}></div>
      <div className={cx("container gx-5")}>
        <div className={cx("restaurant")}>
          <BreadCrumb className={cx("restaurant__breadcrumb")} />
          {currentPageType === "restaurants" && !query && (
            <div className={cx("restaurant__popular-list")}>
              <div className={cx("restaurant__popular-title")}>
                {t("restaurant.title01")} <span className={cx("restaurant__popular-title--highlight")}>HauiFood</span>
              </div>
              <ListSlider />

              <div className={cx("restaurant__popular-title")}>
                {t("restaurant.title02")} <span className={cx("restaurant__popular-title--highlight")}>HauiFood</span>
              </div>
            </div>
          )}

          {currentPageType === "restaurantsBycategory" && (
            <div className={cx("restaurant__popular-list")}>
              <div className={cx("restaurant__popular-title")}>
                {t("restaurant.title02")}
                <span className={cx("restaurant__popular-title--highlight")}>HauiFood</span>
              </div>
            </div>
          )}
          {query && (
            <div className={cx("restaurant__popular-title")}>
              {query} {t("restaurant.at")} <span className={cx("restaurant__popular-title--highlight")}>HauiFood</span>
            </div>
          )}
          <div className={cx("restaurant__list")}>
            <RestaurantList category={category} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Restaurants);
