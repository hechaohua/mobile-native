import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import { useRoute } from '../../__mocks__/@react-navigation/native';

import LoginScreen from '../../src/auth/LoginScreen';

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);
jest.mock('../../src/auth/AuthService');
jest.mock('react-native-safe-area-context');

describe('LoginScreen component', () => {
  beforeEach(() => {});

  it('should renders correctly', () => {
    useRoute.mockReturnValue({ params: {} });
    const loginScreen = renderer.create(<LoginScreen />).toJSON();
    expect(loginScreen).toMatchSnapshot();
  });
});
