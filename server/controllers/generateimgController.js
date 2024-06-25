/*
    Modal1Controller,
    Modal2Controller,
    Modal3Controller,
*/

const mongoose = require('mongoose')
require('dotenv').config();
const Replicate = require("replicate");

const replicate = new Replicate();

// modal one => consistency
const Text2Image1Inializer = async (props = {}) => {
    const input = {};

    if (props.seed !== undefined) input.seed = props.seed;
    if (props.image !== undefined) input.image = props.image;
    if (props.width !== undefined) input.width = props.width;
    if (props.height !== undefined) input.height = props.height;
    if (props.prompt) input.prompt = props.prompt;
    if (props.num_images !== undefined) input.num_images = props.num_images;
    if (props.control_image) input.control_image = props.control_image;
    if (props.guidance_scale !== undefined) input.guidance_scale = props.guidance_scale;
    if (props.archive_outputs !== undefined) input.archive_outputs = props.archive_outputs;
    if (props.prompt_strength !== undefined) input.prompt_strength = props.prompt_strength;
    if (props.sizing_strategy) input.sizing_strategy = props.sizing_strategy;
    if (props.lcm_origin_steps !== undefined) input.lcm_origin_steps = props.lcm_origin_steps;
    if (props.canny_low_threshold !== undefined) input.canny_low_threshold = props.canny_low_threshold;
    if (props.num_inference_steps !== undefined) input.num_inference_steps = props.num_inference_steps;
    if (props.canny_high_threshold !== undefined) input.canny_high_threshold = props.canny_high_threshold;
    if (props.control_guidance_end !== undefined) input.control_guidance_end = props.control_guidance_end;
    if (props.control_guidance_start !== undefined) input.control_guidance_start = props.control_guidance_start;
    if (props.disable_safety_checker !== undefined) input.disable_safety_checker = props.disable_safety_checker;
    if (props.controlnet_conditioning_scale !== undefined) input.controlnet_conditioning_scale = props.controlnet_conditioning_scale;

    try {
        const output = await replicate.run("fofr/latent-consistency-model:683d19dc312f7a9f0428b04429a9ccefd28dbf7785fef083ad5cf991b65f406f", { input });
        return output;
    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
}
const Modal1Controller = async (req, res) => {
    try {
        // get the inputs
        const { width, height, image, prompt, num_images, guidance_scale, archive_outputs, prompt_strength, sizing_strategy, num_inference_steps } = req.body;
        // validate the prompt and width & height
        if (!width || !height || !prompt) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }
        // call the image generation function
        const output = await Text2Image1Inializer({
            width,
            height,
            image,
            prompt,
            num_images,
            guidance_scale,
            archive_outputs,
            prompt_strength,
            sizing_strategy,
            num_inference_steps,
        })
        res.status(200).json(output)

    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json(error)
    }
}
// modal 2 => stable-diffusion
const Text2Image2Inializer = async (props = {}) => {
    const input = {}
    input.prompt = props.prompt;
    if (props.scheduler !== undefined) input.scheduler = props.scheduler;
    if (props.integer !== undefined) input.integer = props.integer;
    if (props.guidance_scale !== undefined) input.guidance_scale = props.guidance_scale;
    if (props.negative_prompt !== undefined) input.negative_prompt = props.negative_prompt;
    if (props.num_inference_steps !== undefined) input.num_inference_steps = props.num_inference_steps;

    try {
        const output = await replicate.run("stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4", { input });
        return output;

    } catch (error) {
        console.error('Error generating image with model 2:', error);
        throw error;
    }

}

const Modal2Controller = async (req, res) => {
    try {
        // inialize inputs
        const { prompt, scheduler, integer, guidance_scale, negative_prompt, num_inference_steps } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }
        // if not create image
        const output = await Text2Image2Inializer({
            prompt,
            scheduler,
            integer,
            guidance_scale,
            negative_prompt,
            num_inference_steps
        })
        res.status(200).json(output)
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json(error)
    }
}
// modal 3 => sdxl
const Text2Image3Inializer = async (props = {}) => {
    const input = {}
    input.prompt = props.prompt;
    if (props.width !== undefined) input.width = props.width;
    if (props.height !== undefined) input.height = props.height;
    if (props.num_inference_steps !== undefined) input.num_inference_steps = props.num_inference_steps;
    if (props.seed !== undefined) input.seed = props.seed;
    if (props.scheduler !== undefined) input.scheduler = props.scheduler;
    if (props.num_outputs !== undefined) input.num_outputs = props.num_outputs;
    if (props.guidance_scale !== undefined) input.guidance_scale = props.guidance_scale;
    if (props.negative_prompt !== undefined) input.negative_prompt = props.negative_prompt;
    if (props.disable_safety_checker !== undefined) input.disable_safety_checker = props.disable_safety_checker;
 
    try {
        const output = await replicate.run("bytedance/sdxl-lightning-4step:5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f", { input });
        console.log('Output from Replicate:', output); // Log the output for debugging
        return output;

    } catch (error) {
        console.error('Error generating image with model 3:', error);
        throw error;
    }
}

const Modal3Controller = async (req, res) => {
    try {
        // inizile body inputs
        const {
            seed,
            prompt,
            width,
            height,
            scheduler,
            num_outputs,
            guidance_scale,
            negative_prompt,
            disable_safety_checker,
            num_inference_steps,
 
        } = req.body;
        // validate:
        if (!prompt || !width || !height) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const output = await Text2Image3Inializer({
            seed,
            prompt,
            width,
            height,
            scheduler,
            num_outputs,
            guidance_scale,
            negative_prompt,
            disable_safety_checker,
            num_inference_steps,
        })
        res.status(200).json(output)
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json(error)
    }
}

module.exports = {
    Modal1Controller,
    Modal2Controller,
    Modal3Controller
}