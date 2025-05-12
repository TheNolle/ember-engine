import { defineConfig } from 'vite'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsconfigPaths()],
	build: {
		lib: {
			entry: 'src/index.ts',
			name: 'EmberEngine',
			fileName: 'ember-engine',
			formats: ['es', 'umd']
		},
		outDir: 'dist'
	},
	server: {
		open: path.join('playground', 'index.html'),
	}
})
