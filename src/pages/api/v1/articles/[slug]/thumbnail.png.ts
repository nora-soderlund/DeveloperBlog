import type { NextApiRequest, NextApiResponse } from "next";

import Canvas from "canvas";

import Articles from "Services/Database/Articles";
import { Article, ArticleTag, Tag } from "Types";

import Dates from "Services/Dates";
import Tags from "Services/Database/Tags";

import { Context2DTextUtils, TextBounds } from "@nora-soderlund/canvas-utils";

export default async function handler(request: NextApiRequest, response: NextApiResponse<string>) {
    const slug: string = request.query.slug as string;
    const article: Article | null = await Articles.getArticleBySlug(slug);

    if(article === null)
        return response.status(404).end();

    response.status(200).setHeader("Content-Type", "image/png");

    const canvas = Canvas.createCanvas(1200, 630);
    const context = canvas.getContext("2d");
    context.quality = "best";
    context.patternQuality = "best";
    context.textDrawingMode = "path";

    const fontSize = 36;

    let left = fontSize * 1, top = fontSize * 1;

    context.font = `${fontSize}px Roboto`;
    context.textBaseline = "top";

    {
        context.save();

        context.fillStyle = "#1A202C";
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.restore();
    }
    
    {
        context.save();

        const date = new Date(article.timestamp);

        context.fillStyle = "#DBE0EA";
        context.fillText((`${Dates.months[date.getMonth()]} ${Dates.getOrdinalNumber(date.getDate())}, ${date.getFullYear()}`).toUpperCase(), left, top);
    
        context.restore();

        top += fontSize + (fontSize );
    }
    
    {
        context.save();

        context.font = `${fontSize * 1.5}px Roboto`;

        context.fillStyle = "#FFF";
        context.fillText(article.title, left, top);
    
        context.restore();

        top += (fontSize * 1.5) + fontSize;
    }
    
    {
        context.save();

        const content = article.short.replace(/<[^>]*>?/gm, '');

        const contextTextUtils = new Context2DTextUtils(context);

        context.fillStyle = "#8B9BBA";

        const textBounds: TextBounds = contextTextUtils.fillTextBounds(content, left, top, canvas.width - left, canvas.height - top);
        top += textBounds.actualHeight + fontSize + (fontSize * .5);
   
        context.restore();
    }

    {
        const articleTags: ArticleTag[] | null = await Articles.getArticleTags(article);

        if(articleTags === null)
            return;

        const tags: Tag[] | null = await Tags.getTagsByArticleTags(articleTags);

        if(tags === null)
            return;

        const height = fontSize * 0.84;
        context.font = `${height}px Roboto`;

        const padding = height * 0.4;
        const margin = height * 0.5;

        tags.forEach((tag) => {
            context.beginPath();

            const measurements = context.measureText(tag.text);

            context.textBaseline = "middle";
            context.fillStyle = tag.color ?? "#6B7FA7";
            context.fillText(tag.text, left + padding, top);

            context.lineWidth = 1;
            context.strokeStyle = tag.color ?? "#6B7FA7";
            context.roundRect(left, top - (height / 2) - padding, measurements.width + (padding * 2), height + (padding * 2), 4);
            context.stroke();

            context.closePath();

            left += measurements.width + (padding * 2) + margin;
        });

        top += height + (padding * 2);
    }

    {
        context.save();

        context.fillStyle = "#1A202C";
        top = Math.floor((canvas.height - top) / 1.5) - fontSize;

        context.drawImage(canvas, 0, top);

        context.fillRect(0, 0, canvas.width, top);

        context.restore();
    }

    const buffer = canvas.toBuffer("image/png");

    response.write(buffer);
    response.end();
};
