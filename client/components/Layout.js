import Navbar from "./common/Navbar";
import Footer from "./common/Footer";

const Layout = ({ children }) => {
    return (
        <div className="">
            <Navbar />
                <main>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;