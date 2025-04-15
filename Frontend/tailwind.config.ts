import { create } from 'tailwind-rn';
import styles from './tailwind.config.js';
const { tailwind, getColor } = create(styles);
export { tailwind, getColor };
