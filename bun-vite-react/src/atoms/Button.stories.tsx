import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  args: {
    title: 'button',
    onClick: () => {},
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Default ボタン！！',
};

export const DifferentText = Template.bind({});
DifferentText.args = {
  title: '違うテキスト',
};
