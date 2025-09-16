import { Router } from 'express';

// helpers
import { verifyAccessToken } from '../helpers/jwt.js';

// routes
import auth from './auth.js';
import product from './product.js';
import order from './order.js';

const router = Router();

router.get('/', (req, res) => {
  res.end('hey');
});

router.use('/auth', auth);
router.use('/product', product);
router.use('/order', verifyAccessToken, order);

export default router;
