module.exports = {
    title: "Simon's Blog",
    base: "/blog-src/dist/",
    themeConfig: {
        nav: [
            {
                text: '前端',
                items: [
                    {
                        text: 'js',
                        link: '/js/'
                    }
                ]
            },
            {
                text: '后端',
                items: [
                    // {
                    //     text: 'mysql',
                    //     link: '/mysql/'
                    // },
                    {
                        text: 'elasticsearch',
                        link: '/elasticsearch/'
                    },
                    // {
                    //     text: 'redis',
                    //     link: '/redis/'
                    // },
                    {
                        text: 'nginx',
                        link: '/nginx/'
                    },
                    {
                        text: 'swoole',
                        link: '/swoole/'
                    },
                    {
                        text: '直播入门',
                        link: '/live/'
                    }
                ]
            }
        ],
        sidebar: {
            '/js/': [
                '',
                'let',
                'syntaxSugar',
                'object',
                'arrowFunction',
                'vituralDom',
                'promise',
                'class',
            ],
            '/live/': [''],
            '/redis/': [''],
            '/mysql/': [
                '',
                'logSystem'
            ],
            '/elasticsearch/': [''],
            '/swoole/': [
                '',
                'server',
                'phpLife',
            ],
            '/nginx/': [
                '',
                'architecture',
                'http',
            ], 
            '/': ['']
        }
    }
}
