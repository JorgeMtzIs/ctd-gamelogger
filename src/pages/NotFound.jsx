import { Link } from 'react-router';

function NotFound() {
  return (
    <>
      <p>Page not Found</p>
      <Link to={'/'}>Go Back Home</Link>
    </>
  );
}

export default NotFound;
