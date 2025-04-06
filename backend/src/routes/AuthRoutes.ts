import user from "../controllers/UserController";
import router from "./UserRoutes";

router.post('/signup', user.create);
router.post('/login', user.login);

export default router;