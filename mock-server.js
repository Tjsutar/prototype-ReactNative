const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    const { url, method } = req;

    // Helper to read body
    const getBody = () => new Promise((resolve) => {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            resolve(JSON.parse(body || '{}'));
        });
    });

    console.log(`[REQUEST] ${method} ${url}`);

    if (url === '/auth/login' && method === 'POST') {
        getBody().then(data => {
            console.log('Login Data:', data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                token: "mock-jwt-token-access",
                refreshToken: "mock-jwt-token-refresh",
                user: {
                    id: "1",
                    username: data.username || "testuser",
                    email: "test@example.com"
                }
            }));
        });
    } else if (url === '/auth/signup' && method === 'POST') {
        getBody().then(data => {
            console.log('SignUp Data:', data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                token: "mock-jwt-token-access",
                refreshToken: "mock-jwt-token-refresh",
                user: {
                    id: "2",
                    username: data.username,
                    email: data.email
                }
            }));
        });
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Not Found" }));
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Mock Backend Server running at http://localhost:${PORT}`);
    console.log(`For Android Emulator: http://10.0.2.2:${PORT}`);
});
