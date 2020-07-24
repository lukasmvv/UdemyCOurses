import React from 'react';

import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<BurgerBuilder/>', () => {
    
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngreidents={() => {}}/>);
    });

    it('it should render build controls when receving ingredients', () => {
        wrapper.setProps({ings: {salad: 1}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});