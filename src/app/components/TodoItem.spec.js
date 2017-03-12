import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { TodoItem } from './TodoItem';
import TodoTextInput from './TodoTextInput';

function setup(editing = false) {
  const props = {
    todo: {
      id: 0,
      text: 'Use Redux',
      completed: false
    },
    dispatch: a => a,
  };

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <TodoItem {...props}/>
  );

  let output = renderer.getRenderOutput();

  if (editing) {
    const label = output.props.children.props.children[1];
    label.props.onDoubleClick({});
    output = renderer.getRenderOutput();
  }

  return {
    props,
    output,
    renderer
  };
}

describe('components', () => {
  describe('TodoItem', () => {
    it('initial render', () => {
      const {output} = setup();

      expect(output.type).toBe('li');
      expect(output.props.className).toBe('');

      const div = output.props.children;

      expect(div.type).toBe('div');
      expect(div.props.className).toBe('view');

      const [input, label, button] = div.props.children;

      expect(input.type).toBe('input');
      expect(input.props.checked).toBe(false);

      expect(label.type).toBe('label');
      expect(label.props.children).toBe('Use Redux');

      expect(button.type).toBe('button');
      expect(button.props.className).toBe('destroy');
    });

    it('label onDoubleClick should put component in edit state', () => {
      const {output, renderer} = setup();
      const label = output.props.children.props.children[1];
      label.props.onDoubleClick({});
      const updated = renderer.getRenderOutput();
      expect(updated.type).toBe('li');
      expect(updated.props.className).toBe('editing');
    });

    it('edit state render', () => {
      const {output} = setup(true);

      expect(output.type).toBe('li');
      expect(output.props.className).toBe('editing');

      const input = output.props.children;
      expect(input.type).toBe(TodoTextInput);
      expect(input.props.text).toBe('Use Redux');
      expect(input.props.editing).toBe(true);
    });

    it('TodoTextInput onSave should exit component from edit state', () => {
      const {output, renderer} = setup(true);
      output.props.children.props.onSave('Use Redux');
      const updated = renderer.getRenderOutput();
      expect(updated.type).toBe('li');
      expect(updated.props.className).toBe('');
    });
  });
});
