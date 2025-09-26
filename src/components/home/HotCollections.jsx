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
    slidesToShow: 1,
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
          <HotCollections {...settings}>
            {hotCollections.map((collect) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
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
          </HotCollections>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
