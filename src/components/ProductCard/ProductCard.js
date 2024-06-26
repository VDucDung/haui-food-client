import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import style from './ProductCard.module.scss';

import { openQuantityDrawer } from '~/features/productSlice';
import formatCurrency from '~/utils/formatCurrency';

const cx = classNames.bind(style);

function ProductCard({ data, className }) {
  const dispatch = useDispatch();

  return (
    <div
      className={cx('product__wrapper', className)}
      onClick={() => {
        //show QuantityDrawer
        dispatch(openQuantityDrawer(data));
      }}
    >
      <div className={cx('product__img-container')}>
        <img className={cx('product__img')} src={data?.image} alt={data?.name} />
      </div>

      <div className={cx('product__info')}>
        <div className={cx('product__name')}>{data?.name}</div>
        <div className={cx('product__desc')}>{data?.description}</div>
        <div className={cx('product__last-row')}>
          <div className={cx('product__price')}>{formatCurrency(data?.price)}</div>
          <div className={cx('product__add-cart-btn')}></div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
