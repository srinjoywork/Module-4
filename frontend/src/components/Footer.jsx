import * as React from 'react';
import { Text } from '@fluentui/react-components';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-center py-4 fixed bottom-0 left-0 z-50">
      <Text
        size={300}
        weight="semibold"
        className="text-gray-400 hover:text-white transition-colors duration-300"
      >
        © {new Date().getFullYear()} Capsitech Module 4 Task by @srinjoy_das
      </Text>
    </footer>
  );
};

export default Footer;
