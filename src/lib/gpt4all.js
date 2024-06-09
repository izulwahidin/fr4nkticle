const OpenAI = require('openai')
require('dotenv').config()

class TextCompletion{
    constructor(messages = [], is_steam = true){
        try {
            if(messages.length < 1) throw new Error('Wrong messages value');

            this.messages = messages
            
            this.gpt4all = new OpenAI({
                apiKey: process.env.OPENAI_API,
                baseURL: process.env.OPENAI_BASE_URL,
                max_tokens: process.env.OPENAI_MAX_TOKEN
            });

            this.is_steam = is_steam
              
        } catch (error) {
            console.error(error)
        }
    }

    async run(){
        let config = {
            messages: this.messages,
            model: process.env.OPENAI_MODEL,
            type: "json_object"
        }
        
        let completion
        let result = ''

        if(this.is_steam){
            config.stream = true
            completion = await this.gpt4all.chat.completions.create(config)

            let text
            for await (const chunk of completion) {
                text = chunk.choices[0]?.delta?.content || ''
                process.stdout.write(text);
                result += text
            }

            console.log(completion)
        }else {
            completion = await this.gpt4all.chat.completions.create(config)
            result = completion.choices[0].message
        }
        return result
    }
}


module.exports = TextCompletion