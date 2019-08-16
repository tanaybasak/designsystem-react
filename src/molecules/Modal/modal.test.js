import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import prefix from '../../settings';
import Modal from './Modal';
import Paragraph from '../../atoms/Paragraph';

describe('<Modal> component', () => {
    it('snapshots/renders Modal correctly', () => {
        const tree = renderer.create(<Modal><Paragraph>Danger Modal with save and close buttons</Paragraph></Modal>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('heading & label given in Modal is rendered', () => {
        const modal = mount(<Modal heading="Heading comes here." label="optional label"><Paragraph>Danger Modal with save and close buttons</Paragraph></Modal>);
        expect(modal.exists(`.${prefix}-modal-header h5`)).toEqual(true);
        expect(modal.exists(`small.${prefix}-modal-label`)).toEqual(true);
    });

    it('actions gets called in modal', () => {
        const modalActions1 = [
            { label: "Save" },
            {
                label: "Close",
                handler: () => {
                    this.onModalClose();
                },
                danger: true
            }
        ];
        const modal = mount(<Modal actions={modalActions1}><Paragraph>Danger Modal with save and close buttons</Paragraph></Modal>);
        expect(modal.find(`footer.${prefix}-modal-footer`)).toBeTruthy();
    });
});