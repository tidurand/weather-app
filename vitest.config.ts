import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';


export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    env: {
      IS_REACT_ACT_ENVIRONMENT: 'true',
    },
    include: ['src/__tests__/*.[jt]s?(x)'],
    setupFiles: './vitest.setup.ts',
  },
});