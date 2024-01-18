const { OpenAIApi } = require("openai");
const openai = new OpenAIApi({
  api_key: "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",
});

// const { Configuration, openAIApi } = require(`openai`);
// const configuration = new Configuration({
//   apikey: "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",
// });
// const openai = new openAIApi(configuration);

export async function sendMsgToOpenAI(message) {
  const res = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: message,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return res.data.choices[0].text;
}
