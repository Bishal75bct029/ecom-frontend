import { Stack } from 'react-bootstrap';
import style from './style.module.scss';
import { Typography } from '@/components/atoms';
import YoutubeImage from '@/assets/icons/youtube.svg';
import FacebookImage from '@/assets/icons/facebook.svg';
import InstagramImage from '@/assets/icons/instagram.svg';
import { PaypalIcon } from '@/assets/icons';

const Footer = () => {
  return (
    <div className={style.footerContainer}>
      <div className={style.footerBody}>
        <Stack direction="horizontal" className="align-items-start justify-content-between">
          <div>
            <Typography fontsStyle="base-semi-bold">Ecommerce</Typography>
            <Typography>About Ecommerce</Typography>
            <Typography>Terms & Conditions</Typography>
            <Typography>Privacy Policy</Typography>
            <Typography>Careers</Typography>
          </div>
          <div>
            <Typography fontsStyle="base-semi-bold">Customer Care</Typography>
            <Typography>How to Buy</Typography>
            <Typography>Contact Us</Typography>
            <Typography>Help Center</Typography>
          </div>
          <div className={style.paymentMethodContainer}>
            <Typography fontsStyle="base-semi-bold" className="mb-2">
              Payment Methods
            </Typography>
            <PaypalIcon />
          </div>
          <div>
            <Typography fontsStyle="base-semi-bold">Follow us</Typography>
            <div className="d-flex align-items-center">
              <img src={FacebookImage} />
              <img src={InstagramImage} />
              <img src={YoutubeImage} />
            </div>
          </div>
        </Stack>

        <div className="d-flex justify-content-center">
          <p>Copyright @ 2024. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
