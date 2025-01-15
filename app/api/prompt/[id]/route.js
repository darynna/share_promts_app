import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { request } from "http";

// GET
export const GET = async (request, context) => {
    try {
        await connectToDB();

        const id = (await context.params).id;
        const prompt = await Prompt.findById(id).populate('creator')
        if(!prompt) return new Response("Prompt not found", {status: 404})

        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 

// PATCH
export const PATCH = async (request, context) => {
    const { prompt, tag } = await request.json();
    const id = (await context.params).id;
    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(id);

        if (!existingPrompt) return new Response("Prompt not found", { status: 404 })
        
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200})
    } catch (error) {
        return new Response("Failed to update prompt", {status: 500})
    }
}

//DELETE
export const DELETE = async (request, context) => {
    const id = (await context.params).id;

    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndDelete(id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
};