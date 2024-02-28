import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    
    let count = 0;
    const intervalId = setInterval(() => {
        if(count <= 5){
            res.write(`data: Message ${count}\n\n`);
            count++;
        }else{
            clearInterval(intervalId);
            res.write('data: Connnection is closed\n\n');
            res.end();
        }
        
    }, 1000);


    req.on('close', () => {
        clearInterval(intervalId);
    });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});
