import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);

  async function fetchHotCollections() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );
    console.log(data);
    setHotCollections(data);
  }

  useEffect(() => {
    fetchHotCollections();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="owl-carousel owl-theme owl-loaded owl-drag">
            <Slider {...settings}>
              {hotCollections.map((collect) => (
                <div
                  className="slick-slide slick-cloned slick-active"
                  key={collect.id}
                >
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collect.nftId}`}>
                        <img
                          src={collect.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collect.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collect.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collect.title}</h4>
                      </Link>
                      <span>ERC-{collect.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            <div className="owl-nav">
              <button role="presentation" className="owl-prev">
                <span aria-label="Previous">-</span>
              </button>
              <button role="presentation" className="owl-next">
                <span aria-label="Next">+</span>
              </button>
            </div>
            <div className="owl-dots"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
