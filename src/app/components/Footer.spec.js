import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Footer } from './Footer';
import { SHOW_ALL } from '../store/visibilityFilter/constants';

function setup(propOverrides) {
  const props = Object.assign({
    todos: [],
    filter: SHOW_ALL,
    dispatch: a => a,
  }, propOverrides);

  const renderer = TestUtils.createRenderer();
  renderer.render(<Footer {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props,
    output
  };
}

function getTextContent(elem) {
  const children = Array.isArray(elem.props.children) ?
    elem.props.children : [elem.props.children];

  return children.reduce((out, child) => {
    // Children are either elements or text strings
    return out + (child.props ? getTextContent(child) : child);
  }, '');
}

describe('components', () => {
  describe('Footer', () => {
    it('should render container', () => {
      const { output } = setup();
      expect(output.type).toBe('footer');
      expect(output.props.className).toBe('footer');
    });

    it('should display active count when 0', () => {
      const { output } = setup({ todos: [] });
      const [count] = output.props.children;
      expect(getTextContent(count)).toBe('No items left');
    });

    it('should display active count when above 0', () => {
      const { output } = setup({
        todos: [
          { id: 1 }
        ]
      });
      const [count] = output.props.children;
      expect(getTextContent(count)).toBe('1 item left');
    });

    it('should render filters', () => {
      const {output} = setup();
      const [, filters] = output.props.children;
      expect(filters.type).toBe('ul');
      expect(filters.props.className).toBe('filters');
      expect(filters.props.children.length).toBe(3);
      filters.props.children.forEach((filter, i) => {
        expect(filter.type).toBe('li');
        const a = filter.props.children;
        expect(a.props.className).toBe(i === 0 ? 'selected' : '');
        expect(a.props.children).toBe({
          0: 'All',
          1: 'Active',
          2: 'Completed'
        }[i]);
      });
    });

    it('shouldnt show clear button when no completed todos', () => {
      const {output} = setup({
        todos: []
      });
      const [, , clear] = output.props.children;
      expect(clear).toBe(undefined);
    });

    it('should render clear button when completed todos', () => {
      const {output} = setup({
        todos: [
          { id: 1, completed: true }
        ]
      });
      const [, , clear] = output.props.children;
      expect(clear.type).toBe('button');
      expect(clear.props.children).toBe('Clear completed');
    });

  });
});
