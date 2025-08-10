const request = require('supertest');
const app = require('../server');

describe('BBC News App', () => {
    describe('GET /', () => {
        it('should return the main page', async () => {
            const res = await request(app)
                .get('/')
                .expect(200);
            expect(res.text).toContain('BBC News');
        });
    });

    describe('GET /api/health', () => {
        it('should return health status', async () => {
            const res = await request(app)
                .get('/api/health')
                .expect(200);
            
            expect(res.body).toHaveProperty('status', 'healthy');
            expect(res.body).toHaveProperty('timestamp');
            expect(res.body).toHaveProperty('uptime');
            expect(res.body).toHaveProperty('version');
        });
    });

    describe('GET /api/news', () => {
        it('should return news data', async () => {
            const res = await request(app)
                .get('/api/news')
                .expect(200);
            
            expect(res.body).toHaveProperty('status', 'success');
            expect(res.body).toHaveProperty('data');
            expect(res.body.data).toBeInstanceOf(Array);
            expect(res.body.data.length).toBeGreaterThan(0);
        });

        it('should return news items with required fields', async () => {
            const res = await request(app)
                .get('/api/news')
                .expect(200);
            
            const newsItem = res.body.data[0];
            expect(newsItem).toHaveProperty('id');
            expect(newsItem).toHaveProperty('headline');
            expect(newsItem).toHaveProperty('summary');
            expect(newsItem).toHaveProperty('category');
            expect(newsItem).toHaveProperty('timestamp');
            expect(newsItem).toHaveProperty('image');
        });
    });

    describe('GET /api/news/:id', () => {
        it('should return specific news article', async () => {
            const res = await request(app)
                .get('/api/news/1')
                .expect(200);
            
            expect(res.body).toHaveProperty('status', 'success');
            expect(res.body.data).toHaveProperty('id', 1);
        });

        it('should return 404 for non-existent article', async () => {
            const res = await request(app)
                .get('/api/news/999')
                .expect(404);
            
            expect(res.body).toHaveProperty('status', 'error');
            expect(res.body).toHaveProperty('message', 'Article not found');
        });
    });

    describe('GET /non-existent-route', () => {
        it('should return 404 for non-existent routes', async () => {
            const res = await request(app)
                .get('/non-existent-route')
                .expect(404);
            
            expect(res.body).toHaveProperty('status', 'error');
            expect(res.body).toHaveProperty('message', 'Route not found');
        });
    });
});