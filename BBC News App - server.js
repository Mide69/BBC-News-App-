const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ['http://localhost:3000'],
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'Public')));

// Mock BBC-like news data
const newsData = [
    {
        id: 1,
        headline: "Breaking: Technology Advances Reshape Global Economy",
        summary: "Latest developments in artificial intelligence and automation are transforming industries worldwide, creating new opportunities and challenges.",
        category: "Technology",
        timestamp: new Date().toISOString(),
        image: "https://via.placeholder.com/400x250/FF5722/FFFFFF?text=Tech+News"
    },
    {
        id: 2,
        headline: "Climate Summit Reaches Historic Agreement",
        summary: "World leaders unite on ambitious climate targets, promising significant reduction in carbon emissions over the next decade.",
        category: "Environment",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        image: "https://via.placeholder.com/400x250/4CAF50/FFFFFF?text=Climate+News"
    },
    {
        id: 3,
        headline: "Sports: Championship Finals Draw Record Viewership",
        summary: "This year's championship games have attracted the largest television audience in sporting history.",
        category: "Sports",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        image: "https://via.placeholder.com/400x250/2196F3/FFFFFF?text=Sports+News"
    },
    {
        id: 4,
        headline: "Health: New Medical Breakthrough Offers Hope",
        summary: "Researchers announce significant progress in treating chronic diseases, with clinical trials showing promising results.",
        category: "Health",
        timestamp: new Date(Date.now() - 10800000).toISOString(),
        image: "https://via.placeholder.com/400x250/9C27B0/FFFFFF?text=Health+News"
    },
    {
        id: 5,
        headline: "Business: Markets Show Strong Recovery Trends",
        summary: "Global financial markets demonstrate resilience with sustained growth across multiple sectors and regions.",
        category: "Business",
        timestamp: new Date(Date.now() - 14400000).toISOString(),
        image: "https://via.placeholder.com/400x250/FF9800/FFFFFF?text=Business+News"
    }
];

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'index.html'));
});

app.get('/api/news', (req, res) => {
    res.json({
        status: 'success',
        data: newsData,
        total: newsData.length
    });
});

app.get('/api/news/:id', (req, res) => {
    const newsId = parseInt(req.params.id);
    const article = newsData.find(item => item.id === newsId);
    
    if (!article) {
        return res.status(404).json({
            status: 'error',
            message: 'Article not found'
        });
    }
    
    res.json({
        status: 'success',
        data: article
    });
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: '1.0.0'
    });
});

// Error handling middleware
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});

app.use((err, req, res, next) => {
    // Sanitize error for logging
    const sanitizedError = err.message ? err.message.replace(/[\r\n]/g, '') : 'Unknown error';
    console.error('Server error:', sanitizedError);
    res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 BBC News App server running on http://0.0.0.0:${PORT}`);
    console.log(`📊 Health check available at http://0.0.0.0:${PORT}/api/health`);
    console.log(`📰 News API available at http://0.0.0.0:${PORT}/api/news`);
});

module.exports = app;