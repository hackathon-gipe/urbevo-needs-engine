export type TwitterRelevanceData = {
    retweet_counts: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
}

export const getTwitterRelevance = (relevanceData: TwitterRelevanceData, estimatedPopulation: number) => {
    return (relevanceData.like_count*10000/estimatedPopulation) + 
            (relevanceData.retweet_counts*20000/estimatedPopulation) +
            (relevanceData.quote_count*100000/estimatedPopulation);
}