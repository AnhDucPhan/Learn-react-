import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = (props) => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login')
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                {/* <Navbar.Brand href="/">AnhDuc Learn React</Navbar.Brand> */}
                <NavLink to='/' className='navbar-brand'>AnhDuc Learn React</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className='nav-link'>Home</NavLink>
                        <NavLink to='/admins' className='nav-link'>Admin</NavLink>
                        <NavLink to='/users' className='nav-link'>User</NavLink>

                        {/* <Nav.Link to="/admins">Admin</Nav.Link>
                        <Nav.Link to="/users">User</Nav.Link> */}
                    </Nav>
                    <button className='btn-login' onClick={() => handleLogin()}>Log In</button>
                    <button className='btn-signup' onClick={()=>{navigate('/register')}}>Sign Up</button>
                    {/* <Nav>
                        <NavDropdown title="Setting" id="basic-nav-dropdown">
                            <NavDropdown.Item >Log In</NavDropdown.Item>
                            <NavDropdown.Item >
                                Log Out
                            </NavDropdown.Item>
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                        </NavDropdown>
                    </Nav> */}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;