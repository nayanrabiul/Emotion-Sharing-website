import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../logo.png'
import { FcBusinessman } from 'react-icons/fc'
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => { toast.success("Logged out successfully") })
            .catch(err => console.log(err));
    }
    const menuItems = <>
        <li><Link to='/' className='rounded'>Home</Link></li>
        <li><Link to='/laptops' className='rounded'>All Laptops</Link></li>
        <li><Link to='/blog' className='rounded'>Blog</Link></li>
        {
            user?.email && <>
                <li><Link to='/dashboard' className='rounded'>Dashboard</Link></li>
            </>
        }

    </>
    return (
        <div className="border-2 border-b-neutral shadow-xl">
            <div className='navbar w-4/5 mx-auto'>
                <div className="navbar-start">

                    <label htmlFor='dashboard-drawer' tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>


                    <Link to="/" className='flex items-center'>
                        <img src={logo} alt="lappy-logo" className='w-16' />
                        <p className="btn btn-ghost normal-case text-xl">lappy</p>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menuItems}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        <div className='flex items-center'>
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-50 border-neutral border-2 rounded-full">
                                    {
                                        user?.email
                                            ?
                                            <div>
                                                <img alt='' src={user.photoURL} />

                                            </div>
                                            :
                                            <FcBusinessman size={40}></FcBusinessman>
                                    }



                                </div>

                            </label>
                            {
                                user?.email && <p className='text-black ml-2'>Hey {user?.displayName || user?.name}!</p>


                            }

                        </div>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                user?.email
                                    ?
                                    <li><button onClick={handleLogOut}>Logout</button></li>
                                    :
                                    <>
                                        <li><Link to='/register'>Register</Link></li>
                                        <li><Link to='/login'>Login</Link></li>
                                    </>
                            }


                        </ul>

                    </div>
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {menuItems}
                        </ul>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Navbar;