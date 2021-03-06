export default () => {
    return process.env.NODE_ENV !== "production" ? {
        env: 'dev',
        baseUrl: 'http://localhost:3000'
    } : {
        env: 'prod',
        baseUrl: 'www.footprint-finder.com'
    }
}