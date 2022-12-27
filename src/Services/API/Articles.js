import API from "../API";

export default class Articles {
    static articles = [];
    static feeds = [];

    static hasCached(slug) {
        return !!Articles.getCached(slug);
    };

    static getCached(slug) {
        return Articles.articles.find((article) => article.slug === slug);
    };

    static async getAsync(slug) {
        let article = Articles.getCached(slug);

        if(article)
            return article;

        article = await API.getAsync(`/api/v1/article?slug=${slug}`);

        if(!article)
            return null;

        Articles.articles.push(article);

        return article;
    };

    static hasCachedFeed(start, tags) {
        return !!Articles.getCachedFeed(start, tags);
    };

    static getCachedFeed(start, tags) {
        return Articles.feeds.find((feed) => feed.start === start && feed.tags === tags);
    };

    static async getFeedAsync(start, tags) {
        let feed = Articles.getCachedFeed(start, tags);

        if(feed)
            return feed.result;

        feed = await API.getAsync(`/api/v1/articles?start=${start}${(tags)?(`&tags=${tags}`):("")}`);

        if(!feed)
            return null;

        Articles.feeds.push({ start, tags, result: feed });

        return feed;
    };
};
