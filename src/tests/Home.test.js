import Home from '../components/Home';
import renderer from 'react-test-renderer';


it('renders Home component correctly', () => {

    let category = [
        { companyName: 'MetalIn', description: 'neki opis', location: 'Belgrade', contact: '9588390204', category_name: 'Moleraj' },
        { companyName: 'Malisa', description: 'neki opis', location: 'Novi Sad', contact: '9588390204', category_name: 'Bravar' },
        { companyName: 'SZR KAMACO', description: 'neki opis', location: 'Indjija', contact: '9588390204', category_name: 'Gradjevina\r\n' },
        { companyName: 'Firma1', description: 'neki opis', location: 'Zrenjanin', contact: '534234234232', category_name: 'Menadzer' }
    ]
    const tree = renderer.create(<Home categoriesList={category} />)
        .toJSON();
    expect(tree).toMatchSnapshot()
})