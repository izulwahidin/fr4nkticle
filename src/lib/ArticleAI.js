const TextCompletion = require("./gpt4all");

class ArticleAI{
    constructor(keyword){
        this.keyword = keyword
    }

    async create(){

        this.message = [
            { role: 'user', content: `you are expert in creating seo article that will rank on google. your task is to create article from this main keyword "${this.keyword}" with following specifications:
            Article Length: 1000 word (mendatory)
            Tone and Language: The tone should be friendly and the language should be English. 
            POV and Geographic Target: The article should be written from a neutral point of view and targeted at a US audience. 
            basic seo:
            - Focus Keyword should appear in the title.
            - Focus Keyword should in your SEO Meta Description.
            - Focus Keyword should appear at the beginning of your content.
            - Focus Keyword found in the content.
            additiona seo:
            - Focus Keyword should be found in subheadings this mendatory
            - Add placeholder keyword image with Focus Keyword as alt text.
            - Keyword Density at least 1%. this mendatory
            - Link out to external resources.
            - Add DoFollow links pointing to external resources.
            title readability:
            - Focus Keyword should appear at the beginning of SEO title.
            - title has a positive or a negative sentiment.
            - title should contain a power word. Add at least one.
            - use number in SEO title.
            content readability:
            - key takeaway
            - Brief, concise, and clear paragraphs.
            - tables on headings if possible, but make sure you add atleast 2
            - quotes on headings if possible, but make sure you add atleast 3
            - images from unsplash
            - videos from youtube
            - Tips on headings if possible , but make sure you add atleast 3
            - Q&A
            formatting elements: italic, quotes, lists, & bold
            Output: Provide the following outputs:
            - SEO Title
            - SEO Description
            - Tags
            - Categories
            - Article Content: in Markdown Format
            - The article should end with the author's name: "Article By Fr4nk"
             
            NOTE: Please ensure that i dont want an outline. i want fully generated article that meets all the requirements of "content readability" and provides high-quality content.` }
        ]
        
        const stream = true

        let articleOutput = ''

        while(true){
            const response = await new TextCompletion(this.message, stream).run()

            if(response.includes('Article By Fr4nk')) break;
            if(response.trim.length < 1) console.info(`\nBLANK\n`)


            articleOutput += response

            this.message.push(
                { role: "system", content: response },
                { role: "user", content: "write more" }
            )
        }


        return;
    }


}

module.exports = ArticleAI