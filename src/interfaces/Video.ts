interface IVideoDuration {
    accessibility_label: string;
    seconds: number;
    simple_text: string;
}

interface IVideoViewCount {
    accessibility_label: string;
    simple_text: string;
}

interface IVideoThumbnails {
    height: number;
    url: string;
    width: number;
}

interface IVideoMetadata {
    badges: string[] | string;
    duration: IVideoDuration;
    owner_badges: string[] | string;
    published: string;
    short_view_count_text: IVideoViewCount;
    thumbnails: IVideoThumbnails[];
    view_count: string;
}

export interface IVideo {
    author: string;
    channel_url?: string;
    description?: string;
    id: string;
    title: string;
    url: string;
    metadata: IVideoMetadata;
}