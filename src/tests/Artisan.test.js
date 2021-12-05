import Artisan from '../components/Artisan';;
import React from 'react';
import renderer from 'react-test-renderer'
import { BrowserRouter as Router } from 'react-router-dom';



test('Artisan component renders correctly',()=>{
    const tree = renderer.create(
        <Router>
        <Artisan name="Danijel"  company="Elektrotim" rated="7" profession="Serviser" location="Beska" id="1" getId={1} />
        </Router>
    ).toJSON();
    console.log(tree);
    expect(tree).toMatchSnapshot();
});


