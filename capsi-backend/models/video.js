const database = require("./database.js");


module.exports = {

    async createVideo(good) {
        const dbo = await database.getDbo();

        const existingVideo = await dbo.collection("video").findOne({ videoId: good.videoId });
        const currentUnixTimestamp = Math.floor(Date.now() / 1000);


        if (existingVideo) {

        } else {

            await dbo.collection("video").insertOne({
                videoId: good.videoId,
                userId: good.userId,
                status: "processing",
                timestamp: currentUnixTimestamp,
            });
        }
    },

    async updateVideoStatus(videoId, newStatus) {
        const dbo = await database.getDbo();
        const currentUnixTimestamp = Math.floor(Date.now() / 1000);
        const result = await dbo.collection("video").updateOne(
            { videoId: videoId },
            { $set: { status: newStatus, timestamp: currentUnixTimestamp } }
        );

        if (result.modifiedCount === 0) {
            throw new Error("Video not found or status not updated");
        }
    },

    async getNoOfVideosByUserId(good) {
        const dbo = await database.getDbo();
        const pipeline = [{
            $match: {
                userId: good.userId,
                timestamp: { $gte: good.startDate, $lte: good.endDate },
            },
        },];

        if (good.startDate && good.endDate) {
            const videos = await dbo.collection('video').aggregate(pipeline).toArray();
            return videos.length;

        } else {

            const videos = await dbo.collection('video').find({ userId: good.userId }).toArray();
            return videos.length;
        }
    },

    async getVideoStatus(videoId) {
        const dbo = await database.getDbo();

        const video = await dbo.collection("video").findOne({ videoId: videoId });

        if (!video) {
            throw new Error("Video not found");
        }

        console.log({ videoId: video.videoId, status: video.status, timestamp: video.timestamp });
    },

    async getLatestVideoStatus() {
        const dbo = await database.getDbo();

        const latestVideo = await dbo.collection("video").findOne({}, { sort: { timestamp: -1 } });

        if (!latestVideo) {
            throw new Error("No videos found");
        }

        return { videoId: latestVideo.videoId, status: latestVideo.status, timestamp: latestVideo.timestamp };
    }

}