import React from "react";
import "./WomanCard.css";

const Card = ({ title, description, image }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
};

function womanCard() {
  const cards = [
    {
      title: "Women Webinars",
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical.",
      image: "./Wc1.png", // Replace with your image
    },
    {
      title: "Women Teach",
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical.",
      image: "./wc2.png", // Replace with your image
    },
    {
      title: "Women Networking",
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical.",
      image: "./wc3.png", // Replace with your image
    },
    {
      title: "Women Podcast",
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical.",
      image: "./wc4.png", // Replace with your image
    },
  ];

  return (
    <>
    <h4 className="wcTitle">What we Offer</h4>
    <div className="womanApp">
      <div className="card-container">
        {cards.map((card, index) => (
            <Card
            key={index}
            title={card.title}
            description={card.description}
            image={card.image}
            />
        ))}
      </div>
    </div>
</>
  );
}

export default womanCard;