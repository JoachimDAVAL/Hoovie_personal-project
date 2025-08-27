import express from 'express';
import cors from 'cors';
import router from './router.js'; 


const app = express();

app.use(express.static('public'));


app.use(express.json());
app.use(express.urlencoded({ extend: true }));


app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});