import ArtisanDetails from '../components/ArtisanDetails';
import renderer from 'react-test-renderer';

it('renders ArtisanDetails component correctly', () => {

    let artisan = {
        company: "Eskobarova radionica",
        contact: 634424242,
        fullName: "Danijel Dabic",
        id: 1,
        image: "image_adress",
        location: "Beska",
        profession: "Web Developer",
        rated: 7,
    }

    const tree = renderer.create(<ArtisanDetails selectedArtisan={artisan}/>)
        .toJSON();
    expect(tree).toMatchSnapshot()
})