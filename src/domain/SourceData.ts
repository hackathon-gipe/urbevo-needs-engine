export type TwitterRelevanceData = {
    retweet_counts: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
}

export const getTwitterRelevance = (relevanceData: TwitterRelevanceData) => {
    //MAX 3, MIN 0
    return Math.min(Math.max(Math.floor(Math.log10(relevanceData.like_count+relevanceData.retweet_counts+relevanceData.quote_count+relevanceData.reply_count)-1), 0), 3)
}