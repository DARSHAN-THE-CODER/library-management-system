import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import { ToastContainer } from 'react-toastify';

const Layout = ({ children, loggedIn , setIsloggedIn }) => {
    return (
        <div>
            <Navbar loggedIn = {loggedIn} setIsloggedIn={setIsloggedIn} />
                <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;