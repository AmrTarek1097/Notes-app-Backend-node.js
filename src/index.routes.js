import userRouter from './modules/user/user.router.js' 
import taskRouter from './modules/task/task.router.js' 
import dotenv from 'dotenv'
import connectDB from '../DB/connection.js';


const bootstarp = (app , express) => {

dotenv.config()
connectDB();

app.use (express.json());
app.use ('/user',userRouter);
app.use ('/task',taskRouter);

app.get('/*', (req, res) => { 

return res.send({message: 'In-valid routing'})

});

}

export default bootstarp; 