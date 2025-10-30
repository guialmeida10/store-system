import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/store-system/',
});

//Esta configuração define o caminho base do aplicativo como '/store-system/'.