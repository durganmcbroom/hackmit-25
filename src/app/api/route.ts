import Cerebras from '@cerebras/cerebras_cloud_sdk';

const cerebras = new Cerebras({
    apiKey: "csk-xh85djhrj2jd5c4p9c969htnx9rx8tf4pedfj6hr4mwxwtn9"
    // This is the default and can be omitted
});

export async function GET(
) {

    const stream = await cerebras.chat.completions.create({
        messages: [
            {
                "role": "system",
                "content": "Hey how are you?"
            }
        ],
        model: 'qwen-3-235b-a22b-instruct-2507',
        stream: true,
        max_completion_tokens: 20000,
        temperature: 0.7,
        top_p: 0.8
    });

    for await (const chunk of stream) {
        // @ts-ignore
        process.stdout.write(chunk.choices[0]?.delta?.content || '');
    }

    return Response.json({
        statusCode: 200,
        content: "Hey, how are you?"
    })
}