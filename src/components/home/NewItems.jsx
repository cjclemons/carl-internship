import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import CountDown from "../CountDown/CountDown";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  async function fetchNewItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItems(data);
  }

  useEffect(() => {
    fetchNewItems();
  }, []);

  function NextArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="custom-arrow next"
        style={arrowStyle("right")}
      >
        <i className="fa fa-chevron-right" style={{ fontSize: 16 }} />
      </div>
    );
  }
  function PrevArrow({ onClick }) {
    return (
      <div
        onClick={onClick}
        className="custom-arrow prev"
        style={arrowStyle("left")}
      >
        <i className="fa fa-chevron-left" style={{ fontSize: 16 }} />
      </div>
    );
  }
  const arrowStyle = (side) => ({
    position: "absolute",
    top: "50%",
    [side]: "-25px",
    transform: "translateY(-50%)",
    zIndex: 2,
    width: 40,
    height: 40,
    background: "#fff",
    borderRadius: "50%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "black",
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          //{" "}
          <div className="owl-carousel owl-theme owl-loaded owl-drag">
            {newItems.length ? (
              <Slider className="owl-theme" {...settings}>
                {newItems.map((item) => (
                  <div className="nft__item" key={item.id}>
                    <div className="author_list_pp">
                      <Link
                        to={`/author${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate && (
                      <CountDown expiryDate={item.expiryDate} />
                    )}

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <Slider className="owl-theme" {...settings}>
                {new Array(8).fill(0).map((_, index) => (
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp">
                      <Link
                        to={``}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a
                              href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a
                              href="https://twitter.com/intent/tweet?url=https://gigaland.io"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site https://gigaland.io">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={``}>
                        <Skeleton width="100%" height="350px" />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={``}>
                        <Skeleton width="180px" height="30px" />
                      </Link>
                      <Skeleton width="100px" height="20px" />
                    </div>
                    <div className="nft__item_like">
                      <Skeleton width="30px" height="15px" />
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
