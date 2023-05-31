import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import { userEvent, within } from '@storybook/testing-library';

import { PasswordSettingPresentation } from './PasswordSetting';

export default {
  title: 'Presentation/PasswordSetting',
  component: PasswordSettingPresentation,

  args: { ...actions('onSubmit') },
} as ComponentMeta<typeof PasswordSettingPresentation>;

const Template: ComponentStory<typeof PasswordSettingPresentation> = args => (
  <PasswordSettingPresentation {...args} />
);

export const Default = {
  ...Template,
  args: {
    isKCW: false,
  },
};

export const ValidInput = {
  ...Template,
  play: async ({
    canvasElement,
  }: {
    canvasElement: HTMLElement;
  }): Promise<void> => {
    const canvas = within(canvasElement);

    userEvent.type(canvas.getByLabelText('現在のパスワード'), 'test');
    userEvent.type(canvas.getByLabelText('新しいパスワード'), 'validpassword1');
    userEvent.type(
      canvas.getByLabelText('新しいパスワード（確認）'),
      'validpassword1',
    );
    userEvent.tab();
  },
};

// FixMe: 後でlabelのテキストとかは要修正
export const NewPasswordInvalidFormat = {
  ...Template,
  play: async ({
    canvasElement,
  }: {
    canvasElement: HTMLElement;
  }): Promise<void> => {
    const canvas = within(canvasElement);

    userEvent.type(canvas.getByLabelText('現在のパスワード'), 'test');
    userEvent.type(canvas.getByLabelText('新しいパスワード'), 'invalid');
    userEvent.tab();
  },
};

export const NewPasswordLessThen8Word = {
  ...Template,
  play: async ({
    canvasElement,
  }: {
    canvasElement: HTMLElement;
  }): Promise<void> => {
    const canvas = within(canvasElement);

    userEvent.type(canvas.getByLabelText('現在のパスワード'), 'test');
    userEvent.type(canvas.getByLabelText('新しいパスワード'), 'error1');
    userEvent.tab();
  },
};

export const SameWithOldAndNewPassword = {
  ...Template,
  play: async ({
    canvasElement,
  }: {
    canvasElement: HTMLElement;
  }): Promise<void> => {
    const canvas = within(canvasElement);

    userEvent.type(canvas.getByLabelText('現在のパスワード'), 'samepassword1');
    userEvent.type(canvas.getByLabelText('新しいパスワード'), 'samepassword1');

    userEvent.tab();
  },
};

export const NewPasswordUnmatch = {
  ...Template,
  play: async ({
    canvasElement,
  }: {
    canvasElement: HTMLElement;
  }): Promise<void> => {
    const canvas = within(canvasElement);

    userEvent.type(
      canvas.getByLabelText('新しいパスワード'),
      'Samplepassword1',
    );
    userEvent.type(
      canvas.getByLabelText('新しいパスワード（確認）'),
      'Samplepassword12',
    );
    userEvent.tab();
  },
};
