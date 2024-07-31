import { useAuth } from '@/hooks';
import { useGetUserDetailQuery } from '@/store/features/user';
import { useNavigate } from 'react-router-dom';
import { ProfileIcon, LogoutIcon, EditIcon, OrderIcon, UserIcon } from '@/assets/icons';
import { Typography } from '@/components/atoms';
import { DropDown } from '@/components/atoms/Dropdown';

const UserDropDown = () => {
  const { data: userDetail } = useGetUserDetailQuery();
  const { logoutHandler } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {userDetail && (
        <DropDown
          title={userDetail.name}
          items={[
            { value: 'Edit Profile', icon: <EditIcon /> },
            { value: 'My Orders', onClick: () => navigate('/orders'), icon: <OrderIcon /> },
            {
              value: 'Log Out',
              onClick: logoutHandler,
              className: 'logout',
              icon: <LogoutIcon />,
              variant: 'red',
            },
          ]}
          profile={{
            image: userDetail.image,
            email: userDetail.email,
            username: userDetail.name,
            fallBackImage: <ProfileIcon />,
          }}
        />
      )}

      {!userDetail && (
        <div className="d-flex align-items-center gap-2 cursor-pointer" onClick={() => navigate('/login')}>
          <UserIcon />
          <Typography>Login</Typography>
        </div>
      )}
    </>
  );
};

export default UserDropDown;
