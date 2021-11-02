import express from 'express'
import { GetClass ,CreateClass} from '../controllers/classes.js'
const router = express.Router()

router.get('/',GetClass)
router.post('/',CreateClass)


export default router