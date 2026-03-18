import Link from "next/link";
import "./product.card.scss";
import { memo } from "react";
const nullImage = "/null-product.png";

interface IProps {
  image: string;
  name: string;
  price: number;
  slug: string;

}



const ProductCard = ({ image, name, price, slug }: IProps) => {
  // console.log('>>>>> check render')
  return (
    <Link href={`/product/${slug}`} style={{ textDecoration: "none" }}>
      <div className="product-card">
        <div className="product-card__image-wrapper">
          <img
            src={image ?? nullImage}
            alt={name}
            className="product-card__image"
          />
        </div>
        <div className="product-card__content">
          <h3 className="product-card__title">{name}</h3>
          <p className="product-card__price">{price.toLocaleString("vi-VN")} ₫</p>
        </div>
      </div>
    </Link>
  );
};

// export default ProductCard;
export default memo(ProductCard);
