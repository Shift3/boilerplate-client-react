import { Link } from 'react-router-dom';

export const CancelSub = () => {
  return (
    <>
      <div>Current Plan</div>
      <div className=''>Your Plan</div>
      <div className=''>Amount</div>
      <div className=''>Renews On:</div>
      <div>
        <Link to='/cancel-auto'>Cancel Auto Renew</Link> | <Link to='/change-plan'>Change Plan</Link>
      </div>
      <div>
        PAYMENT METHOD
        <div>Email</div>
        <div>Address</div>
        <Link to='/change-payment'>Change</Link>
      </div>
    </>
  );
};
