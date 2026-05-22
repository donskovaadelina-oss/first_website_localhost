const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 6767;

const server = http.createServer((req, res) => {
    // 1. Определяем, какой файл запросил пользователь, в зависимости от URL
    let filePath = '';

    if (req.url === '/' || req.url === '/index.html') {
        filePath = path.join(__dirname, 'index.html');
    } else if (req.url === '/about') {
        filePath = path.join(__dirname, 'about.html');
    } else if (req.url === '/contact-me') {
        filePath = path.join(__dirname, 'contact-me.html');
    } else {
        // Если адрес не совпал ни с одним из списка, отдаем 404.html
        filePath = path.join(__dirname, '404.html');
    }

    // 2. Читаем выбранный файл и отправляем его пользователю
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // На случай, если даже файл 404.html отсутствует на диске
            res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Внутренняя ошибка сервера');
        } else {
            // Если всё хорошо, определяем статус ответа
            // Для правильных страниц — 200 (ОК), для несуществующих — 404 (Not Found)
            const statusCode = filePath.endsWith('404.html') ? 404 : 200;
            
            res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content);
        }
    });
});

// 3. Запускаем сервер на порту 6767
server.listen(PORT, () => {
    console.log(`Сервер запущен! Перейдите по адресу: http://localhost:${PORT}`);
});