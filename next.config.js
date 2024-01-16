const nextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })
        return config
    },
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        turbo: {
            rules: {
                // Option format
                '*.md': [
                    {
                        loader: '@mdx-js/loader',
                        options: {
                            format: 'md',
                        },
                    },
                ],
                // Option-less format
                '*.mdx': ['@mdx-js/loader'],
            },
        },
    },
}

module.exports = nextConfig
