import Title from '../components/Title';
import renderer from 'react-test-renderer';

it('renders correctly', ()=>{
    const tree = renderer.create(<Title title="Dabenda"/>)
    .toJSON();
    expect(tree).toMatchSnapshot()
})