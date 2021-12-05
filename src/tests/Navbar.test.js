import Navbar from '../components/Navbar';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders Navbar component correctly', () => {

    const tree = renderer.create(
        <Router>
            <Navbar />
        </Router>)
        .toJSON();
    expect(tree).toMatchSnapshot()
})